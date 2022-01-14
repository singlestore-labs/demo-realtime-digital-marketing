CREATE OR REPLACE PIPELINE locations
AS LOAD DATA LINK aws_s3 's2cellular/large/locations.*'
INTO PROCEDURE process_locations FORMAT PARQUET (
    subscriber_id <- subscriberid,
    offset_x <- offsetX,
    offset_y <- offsetY
);

CREATE OR REPLACE PIPELINE requests
AS LOAD DATA LINK aws_s3 's2cellular/large/requests.*'
INTO TABLE requests FORMAT PARQUET (
    subscriber_id <- subscriberid,
    domain <- domain
)
SET ts = NOW(),
    city_id = 1;

CREATE OR REPLACE PIPELINE purchases
AS LOAD DATA LINK aws_s3 's2cellular/large/purchases.*'
INTO TABLE purchases FORMAT PARQUET (
    subscriber_id <- subscriberid,
    vendor <- vendor
)
SET ts = NOW(),
    city_id = 1;