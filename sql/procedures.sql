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
    SELECT city_id, subscriber_id, lonlat, NULL
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

    INSERT INTO subscriber_segments
    SELECT * FROM (
        SELECT DISTINCT city_id, subscriber_id, segment_id
        FROM segments, locations
        WHERE
            segments.filter_kind = "olc_8"
            AND segments.filter_value = locations.olc_8
            AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
            AND ts >= (
                SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
                FROM segments
                WHERE segments.filter_kind = "olc_8"
            )
        UNION ALL
        SELECT DISTINCT city_id, subscriber_id, segment_id
        FROM segments, locations
        WHERE
            segments.filter_kind = "olc_6"
            AND segments.filter_value = locations.olc_6
            AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
            AND ts >= (
                SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
                FROM segments
                WHERE segments.filter_kind = "olc_6"
            )
        UNION ALL
        SELECT DISTINCT city_id, subscriber_id, segment_id
        FROM segments, requests
        WHERE
            segments.filter_kind = "request"
            AND segments.filter_value = requests.domain
            AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
            AND ts >= (
                SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
                FROM segments
                WHERE segments.filter_kind = "request"
            )
        UNION ALL
        SELECT DISTINCT city_id, subscriber_id, segment_id
        FROM segments, purchases
        WHERE
            segments.filter_kind = "purchase"
            AND segments.filter_value = purchases.vendor
            AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
            AND ts >= (
                SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
                FROM segments
                WHERE segments.filter_kind = "purchase"
            )
    );

    _count = row_count();

    COMMIT;

    RETURN _count;
END //

DELIMITER ;