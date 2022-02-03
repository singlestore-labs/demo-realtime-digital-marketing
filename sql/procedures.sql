DELIMITER //

CREATE OR REPLACE PROCEDURE process_locations (
    _batch QUERY(
        city_id BIGINT NOT NULL,
        subscriber_id BIGINT NOT NULL,
        lonlat GEOGRAPHYPOINT
    )
)
AS
BEGIN
    INSERT INTO subscribers
    SELECT city_id, subscriber_id, lonlat, NULL
    FROM _batch
    ON DUPLICATE KEY UPDATE current_location = VALUES(current_location);

    INSERT INTO locations
    SELECT city_id, subscriber_id, now(6), lonlat
    FROM _batch;
END //

CREATE OR REPLACE PROCEDURE run_matching_process () RETURNS BIGINT
AS
DECLARE
    _ts DATETIME = NOW(6);
    _count BIGINT;
BEGIN
    INSERT INTO notifications SELECT _ts, * FROM match_offers_to_subscribers;

    _count = row_count();

    INSERT INTO subscribers
    SELECT city_id, subscriber_id, lonlat, ts
    FROM notifications
    WHERE ts = _ts
    ON DUPLICATE KEY UPDATE last_notification = _ts;

    RETURN _count;
END //

CREATE OR REPLACE PROCEDURE update_segments() RETURNS BIGINT
AS
DECLARE
    _count BIGINT;
BEGIN
    START TRANSACTION;

    DELETE FROM subscriber_segments;

    -- TODO: do locations + purchases + requests
    INSERT INTO subscriber_segments
    SELECT DISTINCT city_id, subscriber_id, segment_id
    FROM segments, purchases
    WHERE
        segments.purchase_criteria IS NOT NULL
        AND purchases.vendor = segments.purchase_criteria
        AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
        AND ts >= (
            SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
            FROM segments
            WHERE segments.purchase_criteria IS NOT NULL
        );

    _count = row_count();

    COMMIT;

    RETURN _count;
END //

DELIMITER ;