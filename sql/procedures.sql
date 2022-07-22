DELIMITER //

CREATE OR REPLACE PROCEDURE process_locations (
  _batch QUERY(
    subscriber_id BIGINT NOT NULL,
    offset_x DOUBLE NOT NULL,
    offset_y DOUBLE NOT NULL
  )
)
AS
DECLARE
  _expanded QUERY(city_id BIGINT, subscriber_id BIGINT, lonlat GEOGRAPHYPOINT) = SELECT
    city_id, subscriber_id,
    GEOGRAPHY_POINT(
      GEOGRAPHY_LONGITUDE(center) + (offset_x * diameter),
      GEOGRAPHY_LATITUDE(center) + (offset_y * diameter)
    ) AS lonlat
  FROM _batch, cities;
BEGIN
  INSERT INTO subscribers (city_id, subscriber_id, current_location)
  SELECT city_id, subscriber_id, lonlat
  FROM _expanded
  ON DUPLICATE KEY UPDATE current_location = VALUES(current_location);

  INSERT INTO locations (city_id, subscriber_id, ts, lonlat, olc_8)
  SELECT
    city_id,
    subscriber_id,
    now(6) AS ts,
    lonlat,
    encode_open_location_code(lonlat, 8) AS olc_8
  FROM _expanded;
END //

CREATE OR REPLACE PROCEDURE process_requests (
  _batch QUERY(subscriber_id BIGINT NOT NULL, domain TEXT NOT NULL)
)
AS
BEGIN
  INSERT INTO requests (city_id, subscriber_id, ts, domain)
  SELECT city_id, subscriber_id, now(6) AS ts, domain
  FROM _batch, cities;
END //

CREATE OR REPLACE PROCEDURE process_purchases (
  _batch QUERY(subscriber_id BIGINT NOT NULL, vendor TEXT NOT NULL)
)
AS
BEGIN
  INSERT INTO purchases (city_id, subscriber_id, ts, vendor)
  SELECT city_id, subscriber_id, now(6) AS ts, vendor
  FROM _batch, cities;
END //

CREATE OR REPLACE PROCEDURE run_matching_process (
  _interval ENUM("second", "minute", "hour", "day", "week", "month")
) RETURNS BIGINT
AS
DECLARE
  _ts DATETIME = NOW(6);
  _count BIGINT;
BEGIN
  INSERT INTO notifications SELECT _ts, * FROM match_offers_to_subscribers(_interval);

  _count = row_count();

  INSERT INTO subscribers_last_notification
  SELECT city_id, subscriber_id, ts
  FROM notifications
  WHERE ts = _ts
  ON DUPLICATE KEY UPDATE last_notification = _ts;

  RETURN _count;
END //

CREATE OR REPLACE PROCEDURE update_segments(_since DATETIME(6), _until DATETIME(6))
AS
BEGIN
  INSERT INTO subscriber_segments
  SELECT * FROM dynamic_subscriber_segments(_since, _until)
  ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);
END //

CREATE OR REPLACE PROCEDURE prune_segments(_until DATETIME(6))
AS
BEGIN
  DELETE FROM subscriber_segments WHERE expires_at <= _until;
END //

CREATE OR REPLACE PROCEDURE update_sessions(_session_id TEXT, _lease_duration_sections INT)
AS
DECLARE
  _num_alive_controllers QUERY(c INT) =
    SELECT COUNT(*) FROM sessions
    WHERE is_controller AND expires_at > NOW(6);

  _num_transactions QUERY(i INT) = SELECT @@trancount;
BEGIN
  -- make sure this session exists
  INSERT INTO sessions
  SET
    session_id = _session_id,
    expires_at = NOW() + INTERVAL _lease_duration_sections SECOND
  ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);

  START TRANSACTION;

  -- ensure this session is the only controller if no other alive controllers are present
  IF SCALAR(_num_alive_controllers) = 0 THEN
    UPDATE sessions
    SET is_controller = (session_id = _session_id);
  END IF;

  -- echo the session details to the caller
  ECHO SELECT
    session_id, is_controller, expires_at
  FROM sessions
  WHERE session_id = _session_id;

  COMMIT;

  -- delete any expired sessions (with a bit of lag)
  DELETE FROM sessions
  WHERE NOW(6) > (expires_at + INTERVAL (_lease_duration_sections * 2) SECOND);

  EXCEPTION
    WHEN OTHERS THEN
      IF SCALAR(_num_transactions) > 0 THEN
        ROLLBACK;
      END IF;
END //

DELIMITER ;