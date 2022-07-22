CREATE OR REPLACE PIPELINE locations
AS LOAD DATA S3 'singlestore-realtime-digital-marketing/${SCALE_FACTOR}/locations.*'
CREDENTIALS '{}'
CONFIG '{ "region": "us-east-1" }'
MAX_PARTITIONS_PER_BATCH ${PARTITIONS}
INTO PROCEDURE process_locations FORMAT PARQUET (
  subscriber_id <- subscriberid,
  offset_x <- offsetX,
  offset_y <- offsetY
);

CREATE OR REPLACE PIPELINE requests
AS LOAD DATA S3 'singlestore-realtime-digital-marketing/${SCALE_FACTOR}/requests.*'
CREDENTIALS '{}'
CONFIG '{ "region": "us-east-1" }'
MAX_PARTITIONS_PER_BATCH ${PARTITIONS}
INTO PROCEDURE process_requests FORMAT PARQUET (
  subscriber_id <- subscriberid,
  domain <- domain
);

CREATE OR REPLACE PIPELINE purchases
AS LOAD DATA S3 'singlestore-realtime-digital-marketing/${SCALE_FACTOR}/purchases.*'
CREDENTIALS '{}'
CONFIG '{ "region": "us-east-1" }'
MAX_PARTITIONS_PER_BATCH ${PARTITIONS}
INTO PROCEDURE process_purchases FORMAT PARQUET (
  subscriber_id <- subscriberid,
  vendor <- vendor
);

START ALL PIPELINES;