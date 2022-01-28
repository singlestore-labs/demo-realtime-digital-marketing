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

create view match_offers_to_subscribers as (
    with
        -- match offers to subscribers based on current location
        -- and ensure we don't spam subscribers
        phase_1 as (
            select *
            from
                offers,
                subscribers
            where
                offers.enabled = true
                and geography_contains(offers.notification_zone, subscribers.current_location)
                and (
                    subscribers.last_notification is NULL
                    or subscribers.last_notification < NOW() - INTERVAL 1 MINUTE
                )
        ),
        -- only match (offer, subscriber) pairs such that
        -- there is no matching notification
        -- or the matching notification is < 1 minute ago
        phase_2 as (
            select phase_1.*
            from phase_1
            left join (
                select offer_id, city_id, subscriber_id, last(ts) as ts
                from notifications
                group by offer_id, city_id, subscriber_id
            ) n on
                phase_1.offer_id = n.offer_id
                and phase_1.city_id = n.city_id
                and phase_1.subscriber_id = n.subscriber_id
            where
                n.offer_id is null
                or n.ts < NOW() - INTERVAL 1 MINUTE
        ),
        -- join against locations, purchases, and requests to
        -- filter based on offer criteria
        phase_3 as (
            select
                phase_2.*,
                criteria.table_col AS criteria,
                json_length(notification_criteria) AS num_criteria,
                row_number() over (partition by offer_id, city_id, subscriber_id) as rownum
            from
                phase_2
                LEFT JOIN TABLE(JSON_TO_ARRAY(notification_criteria)) criteria
            on
                IF(criteria.table_col::$filter = "location", exists (
                    select * from locations
                    where
                        phase_2.city_id = locations.city_id
                        and phase_2.subscriber_id = locations.subscriber_id
                        and ts >= case criteria.table_col::$`interval`
                            when "day" then NOW() - INTERVAL 1 DAY
                            when "week" then NOW() - INTERVAL 1 WEEK
                            when "month" then NOW() - INTERVAL 1 MONTH
                        end
                        and geography_contains(criteria.table_col::$value, locations.lonlat)
                ), false)
                OR IF(criteria.table_col::$filter = "request", exists (
                    select * from requests
                    where
                        phase_2.city_id = requests.city_id
                        and phase_2.subscriber_id = requests.subscriber_id
                        and ts >= case criteria.table_col::$`interval`
                            when "day" then NOW() - INTERVAL 1 DAY
                            when "week" then NOW() - INTERVAL 1 WEEK
                            when "month" then NOW() - INTERVAL 1 MONTH
                        end
                        and requests.domain = criteria.table_col::$value
                ), false)
                OR IF(criteria.table_col::$filter = "purchase", exists (
                    select * from purchases
                    where
                        phase_2.city_id = purchases.city_id
                        and phase_2.subscriber_id = purchases.subscriber_id
                        and ts >= case criteria.table_col::$`interval`
                            when "day" then NOW() - INTERVAL 1 DAY
                            when "week" then NOW() - INTERVAL 1 WEEK
                            when "month" then NOW() - INTERVAL 1 MONTH
                        end
                        and purchases.vendor = criteria.table_col::$value
                ), false)
        ),
        -- window to find one offer with highest bid per subscriber
        phase_4 as (
            select
                city_id,
                subscriber_id,
                now() as ts,
                last_value(offer_id) over window_best_offer as best_offer_id,
                last_value(maximum_bid_cents) over window_best_offer as cost_cents,
                current_location,
                notification_content,
                notification_target
            from phase_3
            where
                -- only consider rows from phase_3 that match all their criteria
                num_criteria = 0 or rownum = num_criteria
            group by city_id, subscriber_id
            WINDOW window_best_offer as (
                partition by city_id, subscriber_id
                order by maximum_bid_cents asc
            )
        )
    select * from phase_4
);