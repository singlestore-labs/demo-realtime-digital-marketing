delete from locations;
insert into locations values
    (0, 0, now(), 'POINT(-74.000 40.7128)'),
    (0, 0, now() + INTERVAL 1 MINUTE, 'POINT(-74.001 40.7128)'),
    (0, 0, now() + INTERVAL 2 MINUTE, 'POINT(-74.002 40.7128)'),
    (0, 0, now() + INTERVAL 3 MINUTE, 'POINT(-74.003 40.7128)'),
    (0, 0, now() + INTERVAL 4 MINUTE, 'POINT(-74.004 40.7128)'),
    (0, 0, now() + INTERVAL 5 MINUTE, 'POINT(-74.005 40.7128)'),
    (0, 0, now() + INTERVAL 6 MINUTE, 'POINT(-74.006 40.7128)'),

    (0, 1, now(), 'POINT(-74.006 40.7110)'),
    (0, 1, now() + INTERVAL 1 MINUTE, 'POINT(-74.006 40.7111)'),
    (0, 1, now() + INTERVAL 2 MINUTE, 'POINT(-74.006 40.7112)'),
    (0, 1, now() + INTERVAL 3 MINUTE, 'POINT(-74.006 40.7113)'),
    (0, 1, now() + INTERVAL 4 MINUTE, 'POINT(-74.006 40.7114)'),
    (0, 1, now() + INTERVAL 5 MINUTE, 'POINT(-74.006 40.7115)'),
    (0, 1, now() + INTERVAL 6 MINUTE, 'POINT(-74.006 40.7116)');

delete from requests;
insert into requests values
    (0, 0, now() - INTERVAL 1 MINUTE, 'google.com'),
    (0, 0, now() - INTERVAL 1.5 DAY, 'facebook.com'),
    (0, 0, now() - INTERVAL 1.5 WEEK, 'yahoo.com'),

    (0, 1, now() - INTERVAL 5 MINUTE, 'aol.com'),
    (0, 1, now() - INTERVAL 2 DAY, 'facebook.com');

delete from purchases;
insert into purchases values
    (0, 0, now() - INTERVAL 5 MINUTE, 'facebook.com'),
    (0, 0, now() - INTERVAL 5 DAY, 'yahoo.com'),

    (0, 1, now() - INTERVAL 3 HOUR, 'google.com'),
    (0, 1, now() - INTERVAL 5 HOUR, 'yahoo.com'),
    (0, 1, now() - INTERVAL 2 DAY, 'amazon.com');

replace into cities values
    (0, "new york", 'POINT(-74.006 40.7128)', 0.5);

replace into customers values
    (0, 'customer 1'), (1, 'customer 2'), (2, 'customer 3');

replace into offers set
    offer_id = 0,
    customer_id = 0,
    enabled = true,

    notification_zone = 'POLYGON((-73.95445298275654 40.871866946418095,-74.14946030697529 40.647182343199475,-73.91874741635029 40.52933655076082,-73.69490098080341 40.704465763751266,-73.95445298275654 40.871866946418095))',
    notification_criteria = '[
        {
            "filter": "location",
            "value": "POLYGON((-73.95445298275654 40.871866946418095,-74.14946030697529 40.647182343199475,-73.91874741635029 40.52933655076082,-73.69490098080341 40.704465763751266,-73.95445298275654 40.871866946418095))",
            "interval": "day"
        },
        {
            "filter": "request",
            "value": "facebook.com",
            "interval": "day"
        },
        {
            "filter": "purchase",
            "value": "yahoo.com",
            "interval": "day"
        }
    ]',

    notification_content = 'beer, now 50% off',
    notification_target = 'example.com?offer=1234',

    maximum_bid_cents = 10;
    
replace into offers set
    offer_id = 1,
    customer_id = 1,
    enabled = true,

    notification_zone = 'POLYGON((-73.95445298275654 40.871866946418095,-74.14946030697529 40.647182343199475,-73.91874741635029 40.52933655076082,-73.69490098080341 40.704465763751266,-73.95445298275654 40.871866946418095))',
    notification_criteria = '[]',

    notification_content = 'drink more coffee',
    notification_target = 'example.com?offer=2345',

    maximum_bid_cents = 8;

replace into notifications set
    offer_id = 0,
    city_id = 0,
    subscriber_id = 0,
    cost_cents = 10,
    ts = NOW() - INTERVAL 30 minute;

replace into offers set
    offer_id = 2,
    customer_id = 0,
    enabled = true,

    notification_zone = 'POLYGON((-74.0085465553596 40.73811655378369,-73.99275370867991 40.73811655378369,-73.99275370867991 40.72627932318957,-74.0085465553596 40.72627932318957,-74.0085465553596 40.73811655378369))',
    notification_criteria = '[
        {
            "filter": "location",
            "value": "POLYGON((-73.95445298275654 40.871866946418095,-74.14946030697529 40.647182343199475,-73.91874741635029 40.52933655076082,-73.69490098080341 40.704465763751266,-73.95445298275654 40.871866946418095))",
            "interval": "day"
        },
        {
            "filter": "request",
            "value": "youspan.biz",
            "interval": "day"
        },
        {
            "filter": "purchase",
            "value": "Photobug",
            "interval": "day"
        }
    ]',

    notification_content = 'beer, now 50% off',
    notification_target = 'example.com?offer=1234',

    maximum_bid_cents = 10;

replace into offers set
    offer_id = 3,
    customer_id = 0,
    enabled = true,

    notification_zone = 'POLYGON((-74.0005465553596 40.73211655378369,-73.99075370867991 40.73811655378369,-73.99275370867991 40.72627932318957,-74.0085465553596 40.72627932318957,-74.0005465553596 40.73211655378369))',
    notification_criteria = '[ ]',

    notification_content = 'beer, now 50% off',
    notification_target = 'example.com?offer=1234',

    maximum_bid_cents = 10;