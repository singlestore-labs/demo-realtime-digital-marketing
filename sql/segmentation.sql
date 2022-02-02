select
    subscriber.city_id,
    subscriber.subscriber_id,
    criteria.num_filters,
    row_number() over (partition by segment_id, city_id, subscriber_id) as rownum
from
    subscribers as subscriber,
    (
        select
            segment_id,
            json_length(criteria) as num_filters,
            table_col::$filter as filter,
            table_col::$`interval` as filter_interval,
            table_col::$value as filter_value
        from segments, TABLE(JSON_TO_ARRAY(criteria))
    ) as criteria
WHERE
    IF(criteria.filter = "location", exists (
        select * from locations
        where
            subscriber.city_id = locations.city_id
            and subscriber.subscriber_id = locations.subscriber_id
            and ts >= case criteria.filter_interval
                when "minute" then NOW() - INTERVAL 1 MINUTE
                when "hour" then NOW() - INTERVAL 1 HOUR
                when "day" then NOW() - INTERVAL 1 DAY
                when "week" then NOW() - INTERVAL 1 WEEK
                when "month" then NOW() - INTERVAL 1 MONTH
            end
            and geography_contains(criteria.filter_value, locations.lonlat)
    ), false)