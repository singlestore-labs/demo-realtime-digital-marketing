create rowstore table if not exists subscribers (
    subscriber_id BIGINT NOT NULL,
    current_lonlat GEOGRAPHYPOINT,
    last_notification DATETIME(6),

    PRIMARY KEY (subscriber_id),
    INDEX (current_lonlat),
    INDEX (last_notification)
);

create table if not exists locations (
    subscriber_id BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL,
    lonlat GEOGRAPHYPOINT NOT NULL,

    SHARD KEY (subscriber_id),
    SORT KEY (ts, subscriber_id)
);

create table if not exists requests (
    subscriber_id BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL,
    domain TEXT NOT NULL,

    SHARD KEY (subscriber_id),
    SORT KEY (ts, subscriber_id)
);

create table if not exists purchases (
    subscriber_id BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL,
    vendor TEXT NOT NULL,

    SHARD KEY (subscriber_id),
    SORT KEY (ts, subscriber_id)
);

create table if not exists customers (
    customer_id BIGINT NOT NULL,
    company_name TEXT NOT NULL,

    PRIMARY KEY (customer_id)
);

create rowstore table if not exists offers (
    offer_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    enabled BOOLEAN NOT NULL,

    notification_zone GEOGRAPHY NOT NULL,
    notification_criteria JSON NOT NULL,

    notification_content TEXT NOT NULL,
    notification_target TEXT NOT NULL,

    maximum_bid_cents BIGINT NOT NULL,

    PRIMARY KEY (offer_id)
);

create table if not exists notifications (
    offer_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    cost_cents BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL,

    SHARD KEY (offer_id),
    SORT KEY (ts)
);