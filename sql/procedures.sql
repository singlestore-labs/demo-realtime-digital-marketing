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
        SELECT city_id, subscriber_id, now(), lonlat
        FROM _batch;
END //

DELIMITER ;