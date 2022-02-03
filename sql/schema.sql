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

    PRIMARY KEY (city_id, subscriber_id),
    INDEX (current_location),
    INDEX (last_notification)
);

create table if not exists locations (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
    lonlat GEOGRAPHYPOINT NOT NULL,

    -- TODO: write encode_open_location_code UDF
    -- olc_8 AS encode_open_location_code(lonlat, 8) PERSISTED TEXT,
    -- KEY (olc_8) USING HASH,
    -- olc_6 AS encode_open_location_code(lonlat, 6) PERSISTED TEXT,
    -- KEY (olc_6) USING HASH,

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
    segment_ids JSON NOT NULL,

    notification_content TEXT NOT NULL,
    notification_target TEXT NOT NULL,

    maximum_bid_cents BIGINT NOT NULL,

    PRIMARY KEY (offer_id),
    INDEX (notification_zone)
);

create table if not exists notifications (
    ts DATETIME(6) NOT NULL SERIES TIMESTAMP,

    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,

    offer_id BIGINT NOT NULL,
    cost_cents BIGINT NOT NULL,
    lonlat GEOGRAPHYPOINT NOT NULL,

    SHARD KEY (city_id, subscriber_id),
    SORT KEY (ts)
);

create rowstore reference table segments (
    segment_id BIGINT NOT NULL,
    valid_interval ENUM ("minute", "hour", "day", "week", "month") NOT NULL,

    location_criteria GEOGRAPHY,
    request_criteria TEXT,
    purchase_criteria TEXT,

    PRIMARY KEY (segment_id),
    KEY (location_criteria),
    KEY (request_criteria),
    KEY (purchase_criteria)
);

create rowstore table subscriber_segments (
    city_id BIGINT NOT NULL,
    subscriber_id BIGINT NOT NULL,
    segment_id BIGINT NOT NULL,

    PRIMARY KEY (city_id, subscriber_id, segment_id)
);

create view match_offers_to_subscribers as (
    with
        phase_1 as (
            SELECT *
            FROM
                offers,
                subscribers
            where
                offers.enabled = TRUE

                -- match offers to subscribers based on current location
                AND geography_contains(offers.notification_zone, subscribers.current_location)

                -- ensure we don't spam subscribers
                AND (
                    subscribers.last_notification IS NULL
                    OR subscribers.last_notification < NOW() - INTERVAL 1 MINUTE
                )

                -- only match (offer, subscriber) pairs such that
                -- there is no matching notification in the last minute
                AND NOT EXISTS (
                    SELECT * FROM notifications n
                    WHERE
                        ts > NOW() - INTERVAL 1 MINUTE
                        AND offers.offer_id = n.offer_id
                        AND subscribers.city_id = n.city_id
                        AND subscribers.subscriber_id = n.subscriber_id
                )
        )
    select
        city_id,
        subscriber_id,
        -- window to find one offer with highest bid per subscriber
        last_value(offer_id) over window_best_offer as best_offer_id,
        last_value(maximum_bid_cents) over window_best_offer as cost_cents,
        current_location
    from phase_1
    group by city_id, subscriber_id
    WINDOW window_best_offer as (
        partition by city_id, subscriber_id
        order by maximum_bid_cents asc
    )
);