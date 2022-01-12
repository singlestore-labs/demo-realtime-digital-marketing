DELIMITER //

CREATE OR REPLACE PROCEDURE process_locations (
    _batch QUERY(
        subscriber_id BIGINT NOT NULL,
        seq BIGINT NOT NULL,
        offset_x DOUBLE NOT NULL,
        offset_y DOUBLE NOT NULL
    )
)
AS
BEGIN
    INSERT INTO subscribers
        SELECT
            subscriber_id,
            GEOGRAPHY_POINT(offset_x, offset_y) as current_lonlat,
            NULL
        FROM _batch
    ON DUPLICATE KEY UPDATE current_lonlat = VALUES(current_lonlat);

    INSERT INTO locations
        SELECT
            subscriber_id,
            now(),
            GEOGRAPHY_POINT(offset_x, offset_y)
        FROM _batch;
END //

DELIMITER ;

CREATE OR REPLACE pipeline locations
AS LOAD DATA LINK aws_s3 's2cellular/small/locations.*'
INTO PROCEDURE process_locations FORMAT PARQUET (
    subscriber_id <- subscriberid,
    seq <- seq,
    offset_x <- offsetX,
    offset_y <- offsetY
);

CREATE OR REPLACE pipeline requests
AS LOAD DATA LINK aws_s3 's2cellular/small/requests.*'
INTO TABLE requests FORMAT PARQUET (
    subscriber_id <- subscriberid,
    domain <- domain
)
SET ts = NOW();

CREATE OR REPLACE pipeline purchases
AS LOAD DATA LINK aws_s3 's2cellular/small/purchases.*'
INTO TABLE purchases FORMAT PARQUET (
    subscriber_id <- subscriberid,
    vendor <- vendor
)
SET ts = NOW();

START ALL PIPELINES;