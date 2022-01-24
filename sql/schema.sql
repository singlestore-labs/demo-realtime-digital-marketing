create rowstore reference table if not exists cities (
    city_id BIGINT NOT NULL,
    city_name TEXT NOT NULL,
    centroid GEOGRAPHYPOINT NOT NULL,
    diameter DOUBLE,

    PRIMARY KEY (city_id)
);

create rowstore table if not exists subscribers (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    current_location GEOGRAPHYPOINT NOT NULL,
    last_notification DATETIME(6),

    PRIMARY KEY (city_id, subscriber_id)
);

create table if not exists locations (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
    lonlat GEOGRAPHYPOINT NOT NULL,

    SHARD KEY (city_id, subscriber_id),
    SORT KEY (ts),
    KEY (city_id, subscriber_id) USING HASH
);

create table if not exists requests (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
    domain TEXT NOT NULL,

    SHARD KEY (city_id, subscriber_id),
    SORT KEY (ts),
    KEY (domain) USING HASH
);

create table if not exists purchases (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
    vendor TEXT NOT NULL,

    SHARD KEY (city_id, subscriber_id),
    SORT KEY (ts),
    KEY (vendor) USING HASH
);

create table if not exists customers (
    customer_id BIGINT NOT NULL,
    company_name TEXT NOT NULL,

    PRIMARY KEY (customer_id)
);

create rowstore reference table if not exists offers (
    offer_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    enabled BOOLEAN NOT NULL,

    notification_zone GEOGRAPHY NOT NULL,
    notification_criteria JSON NOT NULL,

    notification_content TEXT NOT NULL,
    notification_target TEXT NOT NULL,

    maximum_bid_cents BIGINT NOT NULL,

    PRIMARY KEY (offer_id),
    INDEX (notification_zone)
);

create table if not exists notifications (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,

    ts DATETIME(6) NOT NULL SERIES TIMESTAMP,

    offer_id BIGINT NOT NULL,
    cost_cents BIGINT NOT NULL,
    lonlat GEOGRAPHYPOINT NOT NULL,
    notification_content TEXT NOT NULL,
    notification_target TEXT NOT NULL,

    SHARD KEY (city_id, subscriber_id),
    SORT KEY (ts)
);

create rowstore reference table segments (
    segment_id BIGINT NOT NULL,
    criteria JSON NOT NULL,

    PRIMARY KEY (segment_id)
);

create rowstore table subscriber_segments (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    segment_ids JSON NOT NULL,

    PRIMARY KEY (city_id, subscriber_id)
);