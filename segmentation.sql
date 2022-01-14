with
    subscribers as (
        select distinct city_id, subscriber_id
        from locations
    )
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