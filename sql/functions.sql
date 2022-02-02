DELIMITER //

CREATE OR REPLACE FUNCTION date_sub_dynamic (
    _dt DATETIME(6),
    _interval ENUM("minute", "hour", "day", "week", "month")
) RETURNS DATETIME(6) AS
BEGIN
    RETURN CASE _interval
        WHEN "minute" THEN _dt - INTERVAL 1 MINUTE
        WHEN "hour" THEN _dt - INTERVAL 1 HOUR
        WHEN "day" THEN _dt - INTERVAL 1 DAY
        WHEN "week" THEN _dt - INTERVAL 1 WEEK
        WHEN "month" THEN _dt - INTERVAL 1 MONTH
    END;
END //

DELIMITER ;