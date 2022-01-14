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
                or subscribers.last_notification < NOW() - INTERVAL 1 HOUR
            )
    ),
    -- only match (offer, subscriber) pairs such that
    -- there is no matching notification
    -- or the matching notification is < 1 day ago
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
            or n.ts < NOW() - INTERVAL 1 DAY
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
            phase_2,
            TABLE(JSON_TO_ARRAY(notification_criteria)) criteria
        where
            IF(criteria::$filter = "location", exists (
                select * from locations
                where
                    phase_2.city_id = locations.city_id
                    and phase_2.subscriber_id = locations.subscriber_id
                    and geography_contains(criteria.table_col::$value, locations.lonlat)
            ), false)
            OR IF(criteria::$filter = "request", exists (
                select * from requests
                where
                    phase_2.city_id = requests.city_id
                    and phase_2.subscriber_id = requests.subscriber_id
                    and requests.domain = criteria.table_col::$value
            ), false)
            OR IF(criteria::$filter = "purchase", exists (
                select * from purchases
                where
                    phase_2.city_id = purchases.city_id
                    and phase_2.subscriber_id = purchases.subscriber_id
                    and purchases.vendor = criteria.table_col::$value
            ), false)
    ),
    -- window to find one offer with highest bid per subscriber
    phase_4 as (
        select
            phase_3.*,
            last_value(offer_id) over (partition by city_id, subscriber_id order by maximum_bid_cents asc) as best_offer
        from phase_3
        where
            -- only consider rows from phase_3 that match all their criteria
            rownum = num_criteria
    )
select * from phase_4;