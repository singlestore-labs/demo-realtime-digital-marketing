DELIMITER //

CREATE OR REPLACE PROCEDURE process_locations (
    _batch QUERY(
        subscriber_id BIGINT NOT NULL,
        offset_x DOUBLE NOT NULL,
        offset_y DOUBLE NOT NULL
    )
)
AS DECLARE
    _city_id BIGINT = 1;
    _centroid_lon DOUBLE = -74.0060;
    _centroid_lat DOUBLE = 40.7128;
    _diameter DOUBLE = 0.5;
BEGIN
    INSERT INTO locations
        SELECT
            _city_id,
            subscriber_id,
            now(),
            GEOGRAPHY_POINT(_centroid_lon + (offset_x * _diameter), _centroid_lat + (offset_y * _diameter))
        FROM _batch;
END //

DELIMITER ;