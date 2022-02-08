var Ve=Object.defineProperty,Ye=Object.defineProperties;var ze=Object.getOwnPropertyDescriptors;var me=Object.getOwnPropertySymbols;var Ke=Object.prototype.hasOwnProperty,Xe=Object.prototype.propertyIsEnumerable;var ne=(e,n,t)=>n in e?Ve(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,I=(e,n)=>{for(var t in n||(n={}))Ke.call(n,t)&&ne(e,t,n[t]);if(me)for(var t of me(n))Xe.call(n,t)&&ne(e,t,n[t]);return e},v=(e,n)=>Ye(e,ze(n));var W=(e,n,t)=>(ne(e,typeof n!="symbol"?n+"":n,t),t);import{R as A,a as Ne,b as je,r as m,c as Te,j as i,B as $,M as qe,u as te,d as M,A as Je,e as l,F as U,L as V,s as Qe,f as R,g as Ze,h as g,i as he,C as pe,k as en,G as be,l as nn,m as tn,n as sn,q as an,o as Y,S as H,H as O,p as se,t as on,v as C,w as rn,x as fe,y as cn,z as Ie,D as Re,E as Oe,I as ln,J as dn,K as un,N as _n,O as En,P as mn,Q as Se,T as Ae,U as Nn,V as ie,W as ae,X as oe,Y as Tn,Z as hn,_ as pn,$ as bn,a0 as fn,a1 as In,a2 as Rn,a3 as re,a4 as On,a5 as Le,a6 as Sn,a7 as An,a8 as Ln,a9 as gn,aa as Cn,ab as Dn,ac as ge,ad as wn,ae as p,af as ce,ag as yn,ah as Ce,ai as Pn,aj as vn,ak as Un,al as xn,am as Gn,an as Mn,ao as Hn,ap as kn,aq as Bn}from"./vendor.d91c8d4c.js";const Fn=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};Fn();const x=()=>({setSelf:e,onSet:n,node:t})=>{const a=`recoil.localstorage.${t.key}`,s=localStorage.getItem(a);s!=null&&e(JSON.parse(s)),n((o,r,c)=>{c?localStorage.removeItem(a):localStorage.setItem(a,JSON.stringify(o))})},De=A({key:"connectionHost",default:"http://127.0.0.1",effects_UNSTABLE:[x()]}),we=A({key:"connectionUser",default:"root",effects_UNSTABLE:[x()]}),ye=A({key:"connectionPassword",default:"",effects_UNSTABLE:[x()]}),le=A({key:"connectionDatabase",default:"s2cellular",effects_UNSTABLE:[x()]}),z=Ne({key:"connectionConfig",get:({get:e})=>{const n=e(De),t=e(we),a=e(ye),s=e(le);return{host:n,user:t,password:a,database:s}},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),Pe=A({key:"configScaleFactor",default:"small",effects_UNSTABLE:[x()]}),k=A({key:"simulatorEnabled",default:!0,effects_UNSTABLE:[x()]}),de=100,K=A({key:"notificationsBuffer",default:[]}),Wn=Ne({key:"notifications",get:({get:e})=>e(K),set:({set:e,get:n},t)=>{if(t instanceof je)return e(K,[]);const s=[...n(K),...t];s.length>de&&s.splice(0,s.length-de),e(K,s)},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),ve=A({key:"mapBounds",default:void 0}),$n=e=>(n,t,a,s=1)=>`https://a.basemaps.cartocdn.com/${e}/${a}/${n}/${t}${s>=2?"@2x":""}.png`,Vn=[40.756480069543976,-73.95583135057566],Yn=({mapState:e,latLngToPixel:n,renderer:t})=>{const a=M.useRef(null),{width:s,height:o}=e||{width:0,height:0};return m.exports.useLayoutEffect(()=>{if(!a.current)throw new Error("No canvas ref");if(s<=0||o<=0||!n)return;console.log("PixiMapLayer: Setup");const r=new Je({view:a.current,width:s,height:o,backgroundAlpha:0,antialias:!0}),{scene:c,draw:d,destroy:u}=t({width:s,height:o,latLngToPixel:n});return r.stage.addChild(c),r.ticker.add(_=>{d(_)}),()=>{console.log("PixiMapLayer: Destroy"),u(),r.destroy(!1,{children:!0,texture:!0,baseTexture:!0})}},[s,o,n,t]),i("canvas",{ref:a})},zn=({renderer:e})=>{const[n,t]=m.exports.useState(Vn),[a,s]=m.exports.useState(12),o=Te(ve),r=l(U,{children:["\xA9 ",i(V,{href:"https://osm.org",children:"OpenStreetMap"})," contributors, \xA9"," ",i(V,{href:"https://carto.com/about-carto/",children:"CARTO"})]});return i($,{borderRadius:"lg",overflow:"hidden",height:"100%",children:i(qe,{dprs:[1,2],provider:$n(te("light_all","dark_all")),maxZoom:20,center:n,zoom:a,onBoundsChanged:({center:c,zoom:d,bounds:u})=>{t(c),s(d),o(u)},attribution:r,children:i(Yn,{renderer:e})})})},Kn=/^Error (?<code>\d+):/;class b extends Error{constructor(n,t,a){super(n);W(this,"code");W(this,"sql");var s;if(Object.setPrototypeOf(this,b.prototype),this.sql=t,a)this.code=a;else{const o=n.match(Kn);this.code=o?parseInt(((s=o.groups)==null?void 0:s.code)||"-1",10):-1}}isUnknownDatabase(){return this.code===1049}isDatabaseRecovering(){return this.code===2269}}const Xn=async(e,n,...t)=>{const a=await X(e,n,...t);if(a.length!==1)throw new b("Expected exactly one row",n);return a[0]},X=async(e,n,...t)=>{const a=await j("query/rows",e,n,...t);if(a.results.length!==1)throw new b("Expected exactly one result set",n);return a.results[0].rows},B=async(e,n,...t)=>{const a=await j("query/tuples",e,n,...t);if(a.results.length!==1)throw new b("Expected exactly one result set",n);return a.results[0].rows},Ue=(e,n,...t)=>j("exec",v(I({},e),{database:void 0}),n,...t),N=(e,n,...t)=>j("exec",e,n,...t),j=async(e,n,t,...a)=>{var r;const s=await fetch(`${n.host}/api/v1/${e}`,{method:"POST",signal:(r=n.ctx)==null?void 0:r.signal,headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${n.user}:${n.password}`)}`},body:JSON.stringify({sql:t,args:a,database:n.database})});if(!s.ok)throw new b(await s.text(),t);const o=await s.json();if(o.error)throw new b(o.error.message,t,o.error.code);return o},ue=e=>`POLYGON((${e.map(t=>`${t[0]} ${t[1]}`).join(",")}))`;var xe=[{name:"date_sub_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_sub_dynamic (
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
END`},{name:"encode_open_location_code",createStmt:`CREATE OR REPLACE FUNCTION encode_open_location_code (
    _lonlat GEOGRAPHYPOINT,
    codeLength INT DEFAULT 12
) RETURNS TEXT AS
DECLARE
    SEPARATOR_ text = '+';
    SEPARATOR_POSITION_ int = 8;
    PADDING_CHARACTER_ text = '0';
    CODE_ALPHABET_ text = '23456789CFGHJMPQRVWX';
    ENCODING_BASE_ int = CHARACTER_LENGTH(CODE_ALPHABET_);
    LATITUDE_MAX_ int = 90;
    LONGITUDE_MAX_ int = 180;
    MAX_DIGIT_COUNT_ int = 15;
    PAIR_CODE_LENGTH_ int = 10;
    PAIR_PRECISION_ decimal = POWER(ENCODING_BASE_, 3);
    GRID_CODE_LENGTH_ int = MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_;
    GRID_COLUMNS_ int = 4;
    GRID_ROWS_ int = 5;
    FINAL_LAT_PRECISION_ decimal = PAIR_PRECISION_ * POWER(GRID_ROWS_, MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_);
    FINAL_LNG_PRECISION_ decimal = PAIR_PRECISION_ * POWER(GRID_COLUMNS_, MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_);
    latitude double = geography_latitude(_lonlat);
    longitude double = geography_longitude(_lonlat);
    code text = '';
    latVal decimal = 0;
    lngVal decimal = 0;
    latDigit smallint;
    lngDigit smallint;
    ndx smallint;
    i_ smallint;
BEGIN
    -- This function has been ported from:
    -- http://github.com/google/open-location-code/blob/cafb35c0d74dd0c06b6a75c05f89e32a972b7b23/plpgsql/pluscode_functions.sql#L313
    -- Licensed under the Apache License, Version 2.0 (the 'License')

    IF ((codeLength < 2) OR ((codeLength < PAIR_CODE_LENGTH_) AND (codeLength % 2 = 1)) OR (codeLength > MAX_DIGIT_COUNT_)) THEN
        RAISE USER_EXCEPTION(CONCAT('Invalid Open Location Code length - ', codeLength));
    END IF;

    latVal = floor(round((latitude + LATITUDE_MAX_) * FINAL_LAT_PRECISION_, 6));
    lngVal = floor(round((longitude + LONGITUDE_MAX_) * FINAL_LNG_PRECISION_, 6));

    IF (codeLength > PAIR_CODE_LENGTH_) THEN
        i_ = 0;
        WHILE (i_ < (MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_)) LOOP
            latDigit = latVal % GRID_ROWS_;
            lngDigit = lngVal % GRID_COLUMNS_;
            ndx = (latDigit * GRID_COLUMNS_) + lngDigit;
            code = concat(substr(CODE_ALPHABET_, ndx + 1, 1), code);
            latVal = latVal DIV GRID_ROWS_;
            lngVal = lngVal DIV GRID_COLUMNS_;
            i_ = i_ + 1;
        END LOOP;
    ELSE
        latVal = latVal DIV power(GRID_ROWS_, GRID_CODE_LENGTH_);
        lngVal = lngVal DIV power(GRID_COLUMNS_, GRID_CODE_LENGTH_);
    END IF;

    i_ = 0;
    WHILE (i_ < (PAIR_CODE_LENGTH_ / 2)) LOOP
        code = concat(substr(CODE_ALPHABET_, (lngVal % ENCODING_BASE_) + 1, 1), code);
        code = concat(substr(CODE_ALPHABET_, (latVal % ENCODING_BASE_) + 1, 1), code);
        latVal = latVal DIV ENCODING_BASE_;
        lngVal = lngVal DIV ENCODING_BASE_;
        i_ = i_ + 1;
    END LOOP;

    code = concat(
        substr(code, 1, SEPARATOR_POSITION_),
        SEPARATOR_,
        substr(code, SEPARATOR_POSITION_ + 1)
    );

    IF (codeLength > SEPARATOR_POSITION_) THEN
        RETURN substr(code, 1, codeLength+1);
    ELSE
        RETURN substr(code, 1, codeLength);
    END IF;
END`}],Ge=[{name:"process_locations",createStmt:`CREATE OR REPLACE PROCEDURE process_locations (
    _batch QUERY(
        city_id BIGINT NOT NULL,
        subscriber_id BIGINT NOT NULL,
        lonlat GEOGRAPHYPOINT NOT NULL
    )
)
AS
BEGIN
    INSERT INTO subscribers
    SELECT city_id, subscriber_id, lonlat
    FROM _batch
    ON DUPLICATE KEY UPDATE current_location = VALUES(current_location);

    INSERT INTO locations
    SELECT
        city_id,
        subscriber_id,
        now(6) AS ts,
        lonlat,
        encode_open_location_code(lonlat, 8) AS olc_8
    FROM _batch;
END`},{name:"run_matching_process",createStmt:`CREATE OR REPLACE PROCEDURE run_matching_process () RETURNS BIGINT
AS
DECLARE
    _ts DATETIME = NOW(6);
    _count BIGINT;
BEGIN
    INSERT INTO notifications SELECT _ts, * FROM match_offers_to_subscribers;

    _count = row_count();

    INSERT INTO subscribers_last_notification
    SELECT city_id, subscriber_id, ts
    FROM notifications
    WHERE ts = _ts
    ON DUPLICATE KEY UPDATE last_notification = _ts;

    RETURN _count;
END`},{name:"update_segments",createStmt:`CREATE OR REPLACE PROCEDURE update_segments() RETURNS BIGINT
AS
DECLARE
    _count BIGINT;
BEGIN
    START TRANSACTION;

    DELETE FROM subscriber_segments;

    INSERT INTO subscriber_segments
    SELECT * FROM dynamic_subscriber_segments;

    _count = row_count();

    COMMIT;

    RETURN _count;
END`}],_e=[{name:"cities",createStmt:`create rowstore reference table if not exists cities (
  city_id BIGINT NOT NULL,
  city_name TEXT NOT NULL,
  centroid GEOGRAPHYPOINT NOT NULL,
  diameter DOUBLE,

  PRIMARY KEY (city_id)
);`},{name:"subscribers",createStmt:`create rowstore table if not exists subscribers (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  current_location GEOGRAPHYPOINT NOT NULL,

  PRIMARY KEY (city_id, subscriber_id),
  INDEX (current_location)
);`},{name:"subscribers_last_notification",createStmt:`create rowstore table if not exists subscribers_last_notification (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  last_notification DATETIME(6),

  PRIMARY KEY (city_id, subscriber_id),
  INDEX (last_notification)
);`},{name:"locations",createStmt:`create table if not exists locations (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
  lonlat GEOGRAPHYPOINT NOT NULL,

  -- open location code length 8 (275m resolution)
  olc_8 TEXT NOT NULL,
  -- open location code length 6 (5.5km resolution)
  olc_6 AS SUBSTR(olc_8, 1, 6) PERSISTED TEXT,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts),

  KEY (city_id, subscriber_id) USING HASH,
  KEY (olc_8) USING HASH,
  KEY (olc_6) USING HASH
);`},{name:"requests",createStmt:`create table if not exists requests (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
  domain TEXT NOT NULL,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts),
  KEY (domain) USING HASH
);`},{name:"purchases",createStmt:`create table if not exists purchases (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  ts DATETIME(6) NOT NULL SERIES TIMESTAMP,
  vendor TEXT NOT NULL,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts),
  KEY (vendor) USING HASH
);`},{name:"customers",createStmt:`create table if not exists customers (
  customer_id BIGINT NOT NULL,
  company_name TEXT NOT NULL,

  PRIMARY KEY (customer_id)
);`},{name:"offers",createStmt:`create rowstore reference table if not exists offers (
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
);`},{name:"notifications",createStmt:`create table if not exists notifications (
  ts DATETIME(6) NOT NULL SERIES TIMESTAMP,

  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,

  offer_id BIGINT NOT NULL,
  cost_cents BIGINT NOT NULL,
  lonlat GEOGRAPHYPOINT NOT NULL,

  SHARD KEY (city_id, subscriber_id),
  SORT KEY (ts)
);`},{name:"segments",createStmt:`create rowstore reference table segments (
  segment_id BIGINT NOT NULL,

  valid_interval ENUM ("minute", "hour", "day", "week", "month") NOT NULL,
  filter_kind ENUM ("olc_8", "olc_6", "request", "purchase") NOT NULL,
  filter_value TEXT NOT NULL,

  PRIMARY KEY (segment_id),
  UNIQUE KEY (valid_interval, filter_kind, filter_value),
  KEY (filter_kind, filter_value)
);`},{name:"subscriber_segments",createStmt:`create table subscriber_segments (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  segment_id BIGINT NOT NULL,

  SORT KEY (city_id, subscriber_id, segment_id),
  SHARD KEY (city_id, subscriber_id)
);`},{name:"match_offers_to_subscribers",createStmt:`CREATE VIEW match_offers_to_subscribers AS (
  WITH
    phase_1 as (
      SELECT offers.*, subscribers.*
      FROM
        offers,
        subscribers
      -- grab last notification time for each subscriber
      LEFT JOIN subscribers_last_notification ON (
        subscribers.city_id = subscribers_last_notification.city_id
        AND subscribers.subscriber_id = subscribers_last_notification.subscriber_id
      )
      WHERE
        offers.enabled = TRUE

        -- match offers to subscribers based on current location
        AND geography_contains(offers.notification_zone, subscribers.current_location)

        -- ensure we don't spam subscribers
        AND (
          subscribers_last_notification.last_notification IS NULL
          OR subscribers_last_notification.last_notification < NOW() - INTERVAL 1 MINUTE
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
    ),
    phase_2 as (
      select
        phase_1.*,
        row_number() over (
          partition by phase_1.offer_id, phase_1.city_id, phase_1.subscriber_id
        ) as num_matching_segments
      from phase_1
      JOIN TABLE(JSON_TO_ARRAY(phase_1.segment_ids)) AS segment_ids
      LEFT JOIN subscriber_segments segment ON (
        phase_1.city_id = segment.city_id
        AND phase_1.subscriber_id = segment.subscriber_id
        AND segment_ids.table_col :> BIGINT = segment.segment_id
      )
    )
  select
    city_id,
    subscriber_id,
    -- window to find one offer with highest bid per subscriber
    last_value(offer_id) over window_best_offer as best_offer_id,
    last_value(maximum_bid_cents) over window_best_offer as cost_cents,
    current_location
  from phase_2
  where json_length(segment_ids) = num_matching_segments
  group by city_id, subscriber_id
  WINDOW window_best_offer as (
    partition by city_id, subscriber_id
    order by maximum_bid_cents asc
  )
);`},{name:"dynamic_subscriber_segments",createStmt:`create view dynamic_subscriber_segments as (
  SELECT city_id, subscriber_id, segment_id
  FROM segments, locations
  WHERE
    segments.filter_kind = "olc_8"
    AND segments.filter_value = locations.olc_8
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
    AND ts >= (
      SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
      FROM segments
      WHERE segments.filter_kind = "olc_8"
    )
  UNION
  SELECT city_id, subscriber_id, segment_id
  FROM segments, locations
  WHERE
    segments.filter_kind = "olc_6"
    AND segments.filter_value = locations.olc_6
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
    AND ts >= (
      SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
      FROM segments
      WHERE segments.filter_kind = "olc_6"
    )
  UNION
  SELECT city_id, subscriber_id, segment_id
  FROM segments, requests
  WHERE
    segments.filter_kind = "request"
    AND segments.filter_value = requests.domain
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
    AND ts >= (
      SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
      FROM segments
      WHERE segments.filter_kind = "request"
    )
  UNION
  SELECT city_id, subscriber_id, segment_id
  FROM segments, purchases
  WHERE
    segments.filter_kind = "purchase"
    AND segments.filter_value = purchases.vendor
    AND ts >= date_sub_dynamic(NOW(6), segments.valid_interval)
    AND ts >= (
      SELECT MIN(date_sub_dynamic(NOW(6), valid_interval))
      FROM segments
      WHERE segments.filter_kind = "purchase"
    )
);`}];const jn=`CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,qn=({interval:e,kind:n,value:t})=>{const a=Qe(`${e}-${n}-${t}`);return{id:a,sql:`
      REPLACE INTO segments VALUES
        ('${a}', '${e}', '${n}', '${t}')
    `}};let Jn=0;const D=(e,n,t,a)=>{const s=Jn++,o=a.map(qn);return[o.map(({sql:r})=>r),`
    REPLACE INTO offers SET
      offer_id = ${s},
      customer_id = 0,
      enabled = true,

      notification_zone = '${t}',
      segment_ids = '${JSON.stringify(o.map(r=>r.id))}',

      notification_content = '${n}',
      notification_target = 'example.com?offerId=${s}',

      maximum_bid_cents = ${e}
    `]},q=ue([[-73.9582079,40.8019855],[-73.9827617,40.7683217],[-73.972116,40.7636412],[-73.9470472,40.7978272],[-73.9582079,40.8019855]]),Qn=ue([[-73.9997423,40.7337629],[-74.0031335,40.7281694],[-73.9966516,40.7252749],[-73.991801,40.7308361],[-73.9997423,40.7337629]]),Me=ue([[-74.4468984,40.4781127],[-74.4497744,40.472612],[-74.4413824,40.4664579],[-74.4346859,40.469233],[-74.4468984,40.4781127]]),Zn=["REPLACE INTO cities VALUES (0, 'new york', 'POINT(-74.006 40.7128)', 0.5)","REPLACE INTO customers VALUES (0, 's2cellular')",D(10,"10% off",q,[{interval:"hour",kind:"olc_8",value:"87G7JXR8"}]),D(5,"Skyvu 10% off",q,[{interval:"week",kind:"purchase",value:"Skyvu"},{interval:"hour",kind:"request",value:"skyvu.org"}]),D(5,"Topicshots 10% off",q,[{interval:"hour",kind:"olc_8",value:"87G7JXR8"},{interval:"hour",kind:"request",value:"topicshots.biz"}]),D(5,"Feedmix 10% off",Qn,[{interval:"minute",kind:"olc_6",value:"87G8P2"},{interval:"week",kind:"purchase",value:"Feedmix"}]),D(3,"10% off everything!",q,[{interval:"week",kind:"olc_6",value:"87G8Q2"}]),"REPLACE INTO cities VALUES (1, 'new brunswick', 'POINT(-74.451813 40.485687)', 0.5)",D(10,"10% off",Me,[{interval:"hour",kind:"olc_6",value:"87G7FG"},{interval:"week",kind:"purchase",value:"Skyvu"}]),D(3,"sales bonanza!!!",Me,[{interval:"week",kind:"olc_6",value:"87G7FH"}])].flat(5),J={small:{maxRows:5e7,prefix:"v1/100k-16"},medium:{maxRows:1e8,prefix:"v1/1m-32"},large:{maxRows:1e9,prefix:"v1/10m-80"}},et=e=>Object.keys(J).includes(e),nt=async e=>{try{return{connected:!0,initialized:await tt(e)}}catch{return{connected:!1}}},tt=async e=>{try{const n=(await B(e,"SHOW TABLES")).map(s=>s[0]).sort(),t=(await B(e,"SHOW PROCEDURES")).map(s=>s[0]).sort(),a=(await B(e,"SHOW FUNCTIONS")).map(s=>s[0]).sort();return _e.every(({name:s})=>n.includes(s))&&Ge.every(({name:s})=>t.includes(s))&&xe.every(({name:s})=>a.includes(s))}catch(n){if(n instanceof b&&(n.isUnknownDatabase()||n.isDatabaseRecovering()))return!1;throw n}},st=async(e,n)=>{n("Dropping existing schema","info"),await Ue(e,"DROP DATABASE IF EXISTS `"+e.database+"`"),n("Creating database","info"),await Ue(e,"CREATE DATABASE `"+e.database+"`");for(const t of xe)n(`Creating function: ${t.name}`,"info"),await N(e,t.createStmt);for(const t of _e)n(`Creating table: ${t.name}`,"info"),await N(e,t.createStmt);for(const t of Ge)n(`Creating procedure: ${t.name}`,"info"),await N(e,t.createStmt);await N(e,jn),await it(e),n("Schema initialized","success")},it=async e=>{for(const n of Zn)await N(e,n)},at=async(e,n)=>{const t=J[n].prefix,a=await X(e,`
      SELECT
        expected.city_id AS cityId,
        expected.city_name AS cityName,
        pipelineName,
        GEOGRAPHY_LONGITUDE(expected.centroid) AS lon,
        GEOGRAPHY_LATITUDE(expected.centroid) AS lat,
        expected.diameter
      FROM (
        SELECT cities.*, CONCAT(prefix.table_col, cities.city_id) AS pipelineName
        FROM s2cellular.cities
        JOIN TABLE(["locations_", "requests_", "purchases_"]) AS prefix
      ) AS expected
      LEFT JOIN information_schema.pipelines
        ON pipelines.database_name = ?
        AND pipelines.pipeline_name = expected.pipelineName
      WHERE
        pipelines.pipeline_name IS NULL
        OR config_json::$connection_string NOT LIKE "%${t}%"
    `,e.database||"s2cellular");await Promise.all(a.map(async s=>{console.log(`recreating pipeline ${s.pipelineName} for city ${s.cityName}`),s.pipelineName.startsWith("locations_")?await N(e,`
            CREATE OR REPLACE PIPELINE ${s.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${t}/locations.*'
            INTO PROCEDURE process_locations FORMAT PARQUET (
              subscriber_id <- subscriberid,
              @offset_x <- offsetX,
              @offset_y <- offsetY
            )
            SET
              city_id = ?,
              lonlat = GEOGRAPHY_POINT(
                ? + (@offset_x * ?),
                ? + (@offset_y * ?)
              )
          `,s.cityId,s.lon,s.diameter,s.lat,s.diameter):s.pipelineName.startsWith("requests_")?await N(e,`
            CREATE OR REPLACE PIPELINE ${s.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${t}/requests.*'
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,s.cityId):s.pipelineName.startsWith("purchases_")&&await N(e,`
            CREATE OR REPLACE PIPELINE ${s.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${t}/purchases.*'
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,s.cityId),await N(e,`ALTER PIPELINE ${s.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await N(e,`START PIPELINE IF NOT RUNNING ${s.pipelineName}`)}))},ot=async e=>{const n=await B(e,`
      SELECT
        pipelines.pipeline_name,
        state,
        SUM(file_state = "Loaded"):>int AS num_loaded,
        COUNT(*) AS num_total
      FROM
        information_schema.pipelines_files,
        information_schema.pipelines
      WHERE
        pipelines_files.pipeline_name = pipelines.pipeline_name
        AND pipelines_files.database_name = pipelines.database_name
        AND pipelines.database_name = ?
      GROUP BY pipelines.pipeline_name
      HAVING num_loaded = num_total OR state != "Running"
    `,e.database||"s2cellular");await Promise.all(n.map(async([t])=>{console.log("restarting pipeline",t),await N(e,`ALTER PIPELINE ${t} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await N(e,`START PIPELINE IF NOT RUNNING ${t}`)}))},rt=async e=>{const n=await X(e,`
      SELECT plan_id AS planId
      FROM information_schema.plancache
      WHERE plan_warnings LIKE "%empty tables%";
    `);await Promise.all(n.map(({planId:t})=>N(e,`DROP ${t} FROM PLANCACHE`)))},ct=(e,n)=>X(e,`
      SELECT
        table_name AS tableName,
        SUM(rows) AS count
      FROM information_schema.table_statistics
      WHERE
        database_name = ?
        AND partition_type = "Master"
        AND table_name IN (${n.map(t=>`"${t}"`).join(",")})
      GROUP BY table_name
    `,e.database||"s2cellular"),lt=async(e,n)=>{const{maxRows:t}=J[n],s=(await ct(e,["locations","requests","purchases","notifications"])).filter(o=>o.count>t);await Promise.all(s.map(async({tableName:o,count:r})=>{const c=r-t,{ts:d,cumulative_count:u}=await Xn(e,`
          SELECT
            LAST(ts, ts) :> DATETIME(6) AS ts,
            LAST(cumulative_count, ts) :> BIGINT AS cumulative_count
          FROM (
            SELECT
              MAX(max_value) OVER w AS ts,
              SUM(rows_count - deleted_rows_count) OVER w AS cumulative_count
            FROM
              information_schema.columnar_segments s,
              information_schema.distributed_partitions p
            WHERE
              s.node_id = p.node_id
              AND s.partition = p.ordinal
              AND p.role = "Master"
              AND s.database_name = ?
              AND s.table_name = ?
              AND s.column_name = "ts"
            WINDOW w AS (
              PARTITION BY s.database_name, s.table_name, s.column_name
              ORDER BY min_value ASC
              RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
          )
          WHERE cumulative_count <= ${c}
        `,e.database||"s2cellular",o);d!==null&&(console.log(`removing ${u} rows from ${o} older than ${d}`),await N(e,`DELETE FROM ${o} WHERE ts <= ?`,d))}))},dt=e=>N(e,"CALL run_matching_process()"),ut=e=>N(e,"CALL update_segments()"),_t=(e,n,t)=>B(e,`
      SELECT
        ts,
        offer_id,
        GEOGRAPHY_LONGITUDE(lonlat) AS lon,
        GEOGRAPHY_LATITUDE(lonlat) AS lat
      FROM notifications
      WHERE ts > ?
      ORDER BY ts ASC
      LIMIT ${t}
    `,n),w=()=>{const e=R(z),{data:n,mutate:t}=Ze(["connectionState",e],()=>nt(e));return I({connected:!1,initialized:!1,reset:t},n)},Et=(()=>{let e={};return n=>(n in e||(e[n]=1),`${n}(${e[n]++})`)})(),Q=(e,{name:n,enabled:t,intervalMS:a})=>{m.exports.useEffect(()=>{if(!t)return;const s=new AbortController,o=Et(n);console.log(`Starting ${o}: tick interval: ${a}ms`);const r=async()=>{try{if(console.time(o),s.signal.aborted)return;const c=+Date.now();await e(s);const d=+Date.now()-c;setTimeout(r,Math.max(0,a-d))}catch(c){if(s.signal.aborted||c instanceof b&&c.isUnknownDatabase()||c instanceof DOMException&&c.name==="AbortError")return;throw c}finally{console.timeEnd(o)}};return r(),()=>{console.log(`Stopping ${o}`),s.abort()}},[t,e,a,n])},mt=({before:e,after:n})=>{const t=R(z),{reset:a}=w(),[s,o]=g(k),r=he();return m.exports.useCallback(async()=>{const c=s;o(!1),e(),await st(t,(d,u)=>{const _="reset-schema";r.isActive(_)?r.update(_,{title:d,status:u,duration:3e3,isClosable:u==="success"}):r({id:_,title:d,status:u})}),n(),a(),o(c)},[s,o,e,t,n,a,r])},Nt=1*1e3,Tt=()=>{const e=m.exports.useRef();return{subscribe:m.exports.useCallback(n=>{if(e.current)throw new Error("NotificationEmitter already subscribed");e.current=n},[]),unsubscribe:m.exports.useCallback(n=>{e.current===n&&(e.current=void 0)},[]),emit:m.exports.useCallback(n=>{e.current&&e.current(n)},[])}},ht=()=>{const e=R(z),n=R(k),{initialized:t}=w(),a=m.exports.useRef(new Date().toISOString()),s=Te(Wn),{subscribe:o,unsubscribe:r,emit:c}=Tt(),d=m.exports.useCallback(async u=>{const _=v(I({},e),{ctx:u}),E=await _t(_,a.current,de);E.length>0&&(a.current=E[E.length-1][0],s(E),c(E))},[e,s,c]);return Q(d,{name:"Notifications",enabled:t&&n,intervalMS:Nt}),{subscribe:o,unsubscribe:r}},pt=({subscribe:e,unsubscribe:n})=>{const t=en(({snapshot:a})=>()=>a.getPromise(ve));return m.exports.useCallback(({latLngToPixel:a})=>{console.log("NotificationsRenderer: Setup");const s=new pe,o=[],r=(u,_)=>{let E=0;const S=1.5,h=new pe,ee=306687,G=306687,f=new be;f.beginFill(ee).drawCircle(0,0,5).endFill(),h.addChild(f);const T=new be;T.beginFill(G),T.drawTorus&&T.drawTorus(0,0,4,6),T.endFill(),h.addChild(T),s.addChild(h);const y=Be=>{if(E+=Be/60,E>S){s.removeChild(h),o.splice(o.indexOf(y),1);return}const P=E%S/S,Fe=an(P);T.scale.set(1+Fe);const L=.4,Ee=P<L?nn(P/L):1-tn((P-L)/(1-L));T.alpha=Ee,P<L?f.alpha=Ee:f.alpha=1-sn((P-L)/(1-L));const[We,$e]=a([_,u]);h.x=We,h.y=$e};y(0),o.push(y)},c=(u,_,E)=>_<=u.ne[0]&&E<=u.ne[1]&&_>=u.sw[0]&&E>=u.sw[1],d=async u=>{const _=await t();for(const[,,E,S]of u)(!_||c(_,S,E))&&r(E,S)};return e(d),{scene:s,draw(u){for(const _ of o)_(u)},destroy(){console.log("NotificationsRenderer: Destroy"),n(d)}}},[t,e,n])},bt=()=>{const e=ht(),n=pt(e);return l(Y,{gap:4,justifyContent:"space-between",direction:["column","column","row"],height:"100%",children:[l(H,{spacing:4,flex:"2 2 0",minHeight:"200px",maxHeight:"100%",children:[i(O,{size:"md",children:"Map"}),i(zn,{renderer:n})]}),i(H,{spacing:4,flex:"1 1 0",minWidth:"0",children:i(O,{size:"md",children:"Stats"})})]})},He=e=>{const{connected:n,initialized:t}=w(),a=se(),[s,o]=on(),r=R(le),c=M.useRef(null),d=mt({before:m.exports.useCallback(()=>o.on(),[o]),after:m.exports.useCallback(()=>{o.off(),a.onClose()},[a,o])});return l(U,{children:[i(C,I({disabled:!n,onClick:a.onOpen},e)),i(rn,{isOpen:a.isOpen,onClose:a.onClose,closeOnEsc:!1,closeOnOverlayClick:!1,leastDestructiveRef:c,children:i(fe,{children:l(cn,{children:[l(Ie,{fontSize:"lg",fontWeight:"bold",children:[t?"Reset":"Setup"," database ",r]}),l(Re,{children:["This will ",t?"recreate":"create"," database"," ",r,". Are you sure?"]}),l(Oe,{children:[i(C,{ref:c,onClick:a.onClose,disabled:s,children:"Cancel"}),i(C,{disabled:s,colorScheme:"red",onClick:d,ml:3,children:s?i(ln,{}):"Reset Schema"})]})]})})})]})},Z=({id:e,label:n,placeholder:t,value:a,setValue:s,helpText:o,type:r="text"})=>l(Se,{id:e,children:[i(Ae,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:n}),i(hn,{size:"sm",placeholder:t,value:a,onChange:c=>s(c.target.value),type:r}),o?i(pn,{fontSize:"xs",children:o}):null]}),ft=({isOpen:e,onClose:n,finalFocusRef:t})=>{const[a,s]=g(De),[o,r]=g(we),[c,d]=g(ye),[u,_]=g(le),[E,S]=g(Pe),[h,ee]=g(k),{connected:G,initialized:f}=w();return l(dn,{isOpen:e,placement:"right",onClose:n,finalFocusRef:t,children:[i(fe,{}),l(un,{children:[i(_n,{}),i(Ie,{children:"Config"}),i(Re,{children:l(H,{spacing:4,children:[i(Z,{id:"host",label:"Host & Port",placeholder:"http://127.0.0.1:8808",value:a,setValue:s,helpText:l(U,{children:["The protocol (http, https), host, and port for the SingleStore"," ",l(V,{isExternal:!0,color:"teal.500",href:"https://docs.singlestore.com/docs/http-api/",children:["HTTP API"," ",i(En,{bottom:"2px",boxSize:"0.9em",position:"relative"})]}),"."]})}),l(mn,{columns:2,gap:2,children:[i(Z,{id:"user",label:"Username",placeholder:"admin",value:o,setValue:r}),i(Z,{id:"password",label:"Password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:c,setValue:d,type:"password"}),i(Z,{id:"database",label:"Database",placeholder:"s2cellular",value:u,setValue:_}),l(Se,{id:"scaleFactor",children:[i(Ae,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Scale Factor"}),i(Nn,{size:"sm",required:!0,value:E,onChange:T=>{const y=T.target.value;et(y)&&S(y)},children:Object.keys(J).sort().map(T=>i("option",{value:T,children:T},T))})]})]}),l(ie,{status:G?"success":"error",borderRadius:"md",children:[i(ae,{}),i(oe,{children:G?"connected":"disconnected"})]}),l(ie,{status:f?"success":"warning",borderRadius:"md",children:[i(ae,{}),i(oe,{children:"schema"}),i(He,{position:"absolute",right:4,top:3,size:"xs",colorScheme:f?"green":"red",children:f?"Reset":"Setup"})]}),l(ie,{status:h?"success":"warning",borderRadius:"md",children:[i(ae,{}),i(oe,{children:"simulator"}),i(Tn,{position:"absolute",right:4,top:3.5,size:"md",colorScheme:h?"green":"red",isChecked:h,disabled:!G||!f,onChange:()=>ee(!h)})]})]})}),i(Oe,{})]})]})},ke=({to:e,children:n})=>{const t=Ln(e),a=gn({path:t.pathname,end:!0});return i(V,{as:Cn,to:e,px:2,py:1,rounded:"md",_hover:{textDecoration:"none",bg:te("gray.200","gray.700")},fontWeight:a?"bold":"normal",href:"#",children:n})},It=()=>{const{colorMode:e,toggleColorMode:n}=bn(),t=se(),a=se(),s=M.useRef(null),{connected:o,initialized:r}=w(),c=R(k),d=l(U,{children:[i(ke,{to:"/",children:"Overview"}),i(ke,{to:"/map",children:"Map"})]});return i(U,{children:l($,{bg:te("gray.200","gray.700"),px:4,children:[l(Y,{h:16,alignItems:"center",justifyContent:"space-between",children:[i(fn,{size:"md",icon:t.isOpen?i(In,{}):i(Rn,{}),"aria-label":"Open Menu",display:{md:"none"},onClick:t.isOpen?t.onClose:t.onOpen}),l(re,{spacing:8,alignItems:"center",children:[i(O,{size:"lg",children:"S2 Cellular"}),i(re,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:d})]}),l(Y,{alignItems:"center",gap:2,children:[i(C,{size:"sm",ref:s,onClick:a.onOpen,leftIcon:r?i(On,{}):i(Le,{}),colorScheme:o?r&&c?"green":"yellow":"red",children:o?r?c?"connected":"simulator disabled":"needs schema":"disconnected"}),i(C,{size:"sm",onClick:n,children:e==="light"?i(Sn,{}):i(An,{})})]})]}),t.isOpen?i($,{pb:4,display:{md:"none"},children:i(H,{as:"nav",spacing:4,children:d})}):null,i(ft,{isOpen:a.isOpen,onClose:a.onClose,finalFocusRef:s})]})})},F=e=>i(Dn,I({as:"pre",borderRadius:"md",display:"block",overflow:"auto",whiteSpace:"pre",px:6,py:4},e)),Rt=()=>{const{connected:e,initialized:n}=w();return i(ge,{maxW:"container.lg",children:l(wn,{columnGap:2,rowGap:6,templateColumns:["inherit","inherit","repeat(2, minmax(0, 1fr))"],children:[l(p,{children:[i(O,{as:"h1",size:"xl",children:"Welcome to the S2 Cellular demo!"}),i(ce,{children:"S2 Cellular is a hypothetical telecom company which provides free cell-phone plans in exchange for delivering targeted ads to subscribers. To do this, S2 Cellular collects location, browser, and purchase history from devices and stores it in SingleStore. Before we can deliver ads, we need to place subscribers in segments via comparing their history against segments our advertisers care about. Finally, we use geospatial indexes along with segments to deliver ads to devices as they move around the world."})]}),i(p,{}),l(p,{children:[i(O,{size:"lg",children:"Schema"}),i(ce,{children:"Before we can start loading data, we need a schema."}),i(He,{mt:2,colorScheme:"green",children:n?"Reset schema":"Setup schema"})]}),i(p,{children:i(F,{maxH:"400px",children:_e.map(t=>t.createStmt).join(`

`)})}),i(p,{children:i(O,{size:"lg",children:"Pipelines"})}),i(p,{children:i(F,{children:"pipelines"})}),i(p,{children:i(O,{size:"lg",children:"Segmentation"})}),i(p,{children:i(F,{children:"segmentation"})}),i(p,{children:i(O,{size:"lg",children:"Matching"})}),i(p,{children:i(F,{children:"matching"})})]})})},Ot=10*1e3,St=1*1e3,At=10*1e3,Lt=()=>{const e=R(z),n=R(Pe),t=R(k),{initialized:a}=w(),s=m.exports.useCallback(c=>{const d=v(I({},e),{ctx:c});return Promise.all([at(d,n),ot(d),lt(d,n),rt(d)])},[e,n]);Q(s,{name:"SimulatorMonitor",enabled:a&&t,intervalMS:Ot});const o=m.exports.useCallback(c=>dt(v(I({},e),{ctx:c})),[e]);Q(o,{name:"SimulatorMatcher",enabled:a&&t,intervalMS:St});const r=m.exports.useCallback(c=>ut(v(I({},e),{ctx:c})),[e]);Q(r,{name:"SimulatorUpdateSegments",enabled:a&&t,intervalMS:At})};function gt(){return Lt(),l(Y,{height:"100vh",direction:"column",children:[i(It,{}),i($,{m:4,flex:"1",children:l(yn,{children:[i(Ce,{path:"/",element:i(Rt,{})}),i(Ce,{path:"/map",element:i(bt,{})})]})})]})}class Ct extends M.Component{constructor(){super(void 0);W(this,"state",{});this.handlePromiseRejection=this.handlePromiseRejection.bind(this)}componentDidMount(){window.addEventListener("unhandledrejection",this.handlePromiseRejection)}componentWillUnmount(){window.removeEventListener("unhandledrejection",this.handlePromiseRejection)}handlePromiseRejection(n){this.setState({error:n.reason})}static getDerivedStateFromError(n){return{error:n}}render(){const{error:n}=this.state;if(n){let t;return n instanceof b&&(t=l(U,{children:[i(ce,{textAlign:"center",children:"An error occurred while running the following query:"}),i(F,{children:Pn(n.sql)})]})),i(ge,{maxW:"container.md",my:10,children:l(H,{gap:4,children:[i(vn,{children:i(Le,{boxSize:20,color:"red"})}),i(O,{size:"xl",textAlign:"center",children:n.message}),t,l(re,{justify:"center",gap:4,children:[i(C,{onClick:()=>this.setState({error:void 0}),size:"sm",children:"Dismiss Error"}),i(C,{onClick:()=>window.location.reload(),size:"sm",colorScheme:"blue",leftIcon:i(Un,{}),children:"Reload"})]})]})})}return this.props.children}}const Dt=xn({fonts:{heading:"InterVariable, sans-serif",body:"InterVariable, sans-serif",mono:'"Source Code ProVariable", monospace'}}),wt=({children:e})=>{const n=he();return i(Bn,{value:{onError:a=>{n({title:"An error occurred",description:a.message,status:"error",duration:5e3,isClosable:!0})}},children:e})};Gn.render(i(M.StrictMode,{children:i(Mn,{theme:Dt,children:i(Ct,{children:i(wt,{children:i(Hn,{children:i(kn,{basename:"/demo-s2cellular/",children:i(gt,{})})})})})})}),document.getElementById("root"));
