CREATE OR REPLACE PIPELINE offers AS
  LOAD DATA S3 'singlestore-realtime-digital-marketing/offers.ndjson'
  CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'
  SKIP DUPLICATE KEY ERRORS
  INTO TABLE offers
  FORMAT JSON (
    offer_id <- offer_id,
    customer <- customer,
    enabled <- enabled,
    notification_zone <- notification_zone,
    segment_ids <- segment_ids,
    notification_content <- notification_content,
    notification_target <- notification_target,
    maximum_bid_cents <- maximum_bid_cents
  );

START PIPELINE IF NOT RUNNING offers;

CREATE OR REPLACE PIPELINE segments AS
  LOAD DATA S3 'singlestore-realtime-digital-marketing/segments.ndjson'
  CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'
  SKIP DUPLICATE KEY ERRORS
  INTO TABLE segments
  FORMAT JSON (
    segment_id <- segment_id,
    valid_interval <- valid_interval,
    filter_kind <- filter_kind,
    filter_value <- filter_value
  );

START PIPELINE IF NOT RUNNING segments;

INSERT INTO cities (city_id, city_name, center, diameter)
VALUES (120658, "New York", "POINT(-73.993562 40.727063)", 0.04)
ON DUPLICATE KEY UPDATE
  city_name = VALUES(city_name),
  center = VALUES(center),
  diameter = VALUES(diameter);

CREATE OR REPLACE PIPELINE worldcities AS
  LOAD DATA S3 'singlestore-realtime-digital-marketing/cities.ndjson'
  CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'
  SKIP DUPLICATE KEY ERRORS
  INTO TABLE worldcities
  FORMAT JSON (
    city_id <- id,
    city_name <- name,
    @lat <- lat,
    @lng <- lng
  )
  SET center = GEOGRAPHY_POINT(@lng, @lat);

START PIPELINE IF NOT RUNNING worldcities;