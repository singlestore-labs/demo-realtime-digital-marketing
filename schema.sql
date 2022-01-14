create rowstore reference table if not exists cities (
    city_id BIGINT NOT NULL,
    city_name TEXT NOT NULL,
    centroid GEOGRAPHYPOINT NOT NULL,
    diameter DOUBLE,

    PRIMARY KEY (city_id)
);

create table if not exists locations (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
    lonlat GEOGRAPHYPOINT NOT NULL,

    SHARD KEY (city_id, subscriber_id),
    SORT KEY (ts)
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
    offer_id BIGINT NOT NULL,
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    cost_cents BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL SERIES TIMESTAMP,

    SHARD KEY (city_id, subscriber_id),
    SORT KEY (ts)
);

create view subscribers as
    select a.city_id, a.subscriber_id, current_location, last_notification
    from (
        select city_id, subscriber_id, last(lonlat) as current_location
        from locations
        group by city_id, subscriber_id
    ) a left join (
        select city_id, subscriber_id, last(ts) as last_notification
        from notifications
        group by city_id, subscriber_id
    ) b on a.city_id = b.city_id and a.subscriber_id = b.subscriber_id;