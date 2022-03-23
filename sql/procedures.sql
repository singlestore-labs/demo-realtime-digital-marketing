DELIMITER //

CREATE OR REPLACE PROCEDURE process_locations (
    _batch QUERY(
        city_id BIGINT NOT NULL,
        subscriber_id BIGINT NOT NULL,
        lonlat GEOGRAPHYPOINT NOT NULL
    )
)
AS
BEGIN
    INSERT INTO subscribers
    SELECT city_id, subscriber_id, lonlat
    FROM _batch
    ON DUPLICATE KEY UPDATE current_location = VALUES(current_location);

    INSERT INTO locations
    SELECT
        city_id,
        subscriber_id,
        now(6) AS ts,
        lonlat,
        encode_open_location_code(lonlat, 8) AS olc_8
    FROM _batch;
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

CREATE OR REPLACE PROCEDURE update_location_segments(_since DATETIME(6), _until DATETIME(6))
AS
BEGIN
    INSERT INTO subscriber_segments
    SELECT * FROM dynamic_subscriber_segments_locations(_since, _until)
    ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);
END //

CREATE OR REPLACE PROCEDURE update_request_segments(_since DATETIME(6), _until DATETIME(6))
AS
BEGIN
    INSERT INTO subscriber_segments
    SELECT * FROM dynamic_subscriber_segments_requests(_since, _until)
    ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);
END //

CREATE OR REPLACE PROCEDURE update_purchase_segments(_since DATETIME(6), _until DATETIME(6))
AS
BEGIN
    INSERT INTO subscriber_segments
    SELECT * FROM dynamic_subscriber_segments_purchases(_since, _until)
    ON DUPLICATE KEY UPDATE expires_at = VALUES(expires_at);
END //

CREATE OR REPLACE PROCEDURE prune_segments(_until DATETIME(6))
AS
BEGIN
    DELETE FROM subscriber_segments WHERE expires_at <= _until;
END //

DELIMITER ;