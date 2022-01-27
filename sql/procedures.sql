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

CREATE OR REPLACE PROCEDURE run_matching_process ()
AS
BEGIN
    CREATE ROWSTORE TEMPORARY TABLE matches AS
    SELECT * FROM match_offers_to_subscribers;

    INSERT INTO notifications SELECT * FROM matches;

    UPDATE subscribers
    INNER JOIN matches ON
        subscribers.city_id = matches.city_id
        AND subscribers.subscriber_id = matches.subscriber_id
    SET
        subscribers.last_notification = matches.ts;

    DROP TABLE matches;
END //

DELIMITER ;