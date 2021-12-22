create rowstore reference table if not exists sim_vendors (
    id int not null,
    vendor TEXT NOT NULL,
    primary key (id)
);

create rowstore reference table if not exists sim_domains (
    id int not null,
    domain TEXT NOT NULL,
    primary key (id)
);

create rowstore reference table if not exists sim_locations (
    id int not null,
    lonlat GEOGRAPHYPOINT NOT NULL,
    primary key (id),
    INDEX (lonlat)
);

create rowstore table if not exists sim_subscribers (
    subscriber_id BIGINT NOT NULL,

    -- to generate the locations timeseries, we move the subscriber to a random
    -- location every X-Y seconds this field is used to track when we simulated
    -- the last move
    last_move DATETIME(6),

    -- to generate the web requests timeseries, we simulate a web request every X-Y seconds
    -- this field is used to track when we simulated the last request
    last_request DATETIME(6),

    -- to generate the purchases timeseries, we simulate a purchase every X-Y hours
    -- this field is used to track when we simulated the last purchase
    last_purchase DATETIME(6),

    PRIMARY KEY (subscriber_id)
);

DELIMITER //

CREATE OR REPLACE PROCEDURE sim_init_subscribers(_count BIGINT) AS
DECLARE
    _max_sub_id_tbl QUERY(id BIGINT) = SELECT COALESCE(MAX(subscriber_id), 0) FROM sim_subscribers;
    _max_sub_id BIGINT = SCALAR(_max_sub_id_tbl);

    arr_subs ARRAY(RECORD(
        subscriber_id BIGINT,
        last_move DATETIME(6),
        last_request DATETIME(6),
        last_purchase DATETIME(6)
    )) = CREATE_ARRAY(_count);

    _x int;
BEGIN
    FOR i IN 0..(_count-1) LOOP
        arr_subs[i] = ROW(_max_sub_id+i+1, null, null, null);
    END LOOP;
    _x = INSERT_ALL("sim_subscribers", arr_subs);
END //

CREATE OR REPLACE PROCEDURE sim_run_locations() AS
DECLARE
    -- subscribers move every second
    _update_interval_seconds BIGINT = 1;
BEGIN
    INSERT INTO subscribers (subscriber_id, current_lonlat)
    SET
        current_lonlat = GEOGRAPHY_POINT(
            GEOGRAPHY_LONGITUDE(current_lonlat),
            GEOGRAPHY_LATITUDE(current_lonlat)
        )
    
END //

call sim_init_subscribers(10) //
call sim_run_locations() //

CREATE OR REPLACE PROCEDURE sim_run_requests() AS
BEGIN

END //

CREATE OR REPLACE PROCEDURE sim_run_purchases() AS
BEGIN

END //

CREATE OR REPLACE PROCEDURE sim_run_all() AS
BEGIN
    call sim_run_locations();
    call sim_run_requests();
    call sim_run_purchases();
END //

DELIMITER ;

DELIMITER //

CREATE or replace PROCEDURE test (_foo QUERY(
    registration_dttm datetime, id int, first_name text, last_name text,
    email text, gender text, ip_address text, cc text,
    country text, birthdate text, salary double, title text, comments text
))
AS
BEGIN
    insert into foo select * from _foo;
END //

create or replace pipeline foo
as load data fs '/tmp/userdata*'
batch_interval 100000
MAX_PARTITIONS_PER_BATCH 1
into procedure test format parquet (
    registration_dttm <- registration_dttm,
    id <- id,
    first_name <- first_name,
    last_name <- last_name,
    email <- email,
    gender <- gender,
    ip_address <- ip_address,
    cc     <- cc,
    country  <- country,
    birthdate <- birthdate,
    salary   <- salary,
    title   <- title,
    comments  <- comments
);

DELIMITER ;