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

DELIMITER ;