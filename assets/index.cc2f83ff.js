var ct=Object.defineProperty,lt=Object.defineProperties;var dt=Object.getOwnPropertyDescriptors;var $=Object.getOwnPropertySymbols;var Re=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable;var se=(e,t,n)=>t in e?ct(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,N=(e,t)=>{for(var n in t||(t={}))Re.call(t,n)&&se(e,n,t[n]);if($)for(var n of $(t))ge.call(t,n)&&se(e,n,t[n]);return e},p=(e,t)=>lt(e,dt(t));var M=(e,t)=>{var n={};for(var i in e)Re.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(e!=null&&$)for(var i of $(e))t.indexOf(i)<0&&ge.call(e,i)&&(n[i]=e[i]);return n};var V=(e,t,n)=>(se(e,typeof t!="symbol"?t+"":t,n),n);import{R as T,a as Ae,b as ut,r as m,c as Le,j as s,B as S,M as _t,u as Y,d as G,A as mt,e as l,F as I,L as z,s as Et,f as b,g as ae,h as O,i as Ce,C as ye,k as ht,G as De,l as Nt,m as bt,n as ft,q as pt,o as K,S as v,H as k,p as Tt,E as St,t as It,v as we,w as ie,x as oe,y as Ot,z as Pe,I as ve,D as Rt,J as xe,K as Ue,N as A,O as gt,P as Me,Q as At,T as Ge,U as ke,V as He,W as Be,X as Lt,Y as Ct,Z as yt,_ as re,$ as ce,a0 as le,a1 as Dt,a2 as de,a3 as wt,a4 as ue,a5 as _e,a6 as Pt,a7 as vt,a8 as j,a9 as me,aa as Fe,ab as We,ac as xt,ad as Ut,ae as Mt,af as Gt,ag as kt,ah as Ht,ai as Bt,aj as Ft,ak as Wt,al as Ee,am as $t,an as $e,ao as Vt,ap as Yt,aq as zt,ar as Kt,as as jt,at as Xt,au as qt,av as Qt,aw as Jt}from"./vendor.7dcdfbd9.js";const Zt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerpolicy&&(o.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?o.credentials="include":a.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}};Zt();const x=()=>({setSelf:e,onSet:t,node:n})=>{const i=`recoil.localstorage.${n.key}`,a=localStorage.getItem(i);a!=null&&e(JSON.parse(a)),t((o,r,c)=>{c?localStorage.removeItem(i):localStorage.setItem(i,JSON.stringify(o))})},Ve=T({key:"connectionHost",default:"http://127.0.0.1",effects_UNSTABLE:[x()]}),Ye=T({key:"connectionUser",default:"root",effects_UNSTABLE:[x()]}),ze=T({key:"connectionPassword",default:"",effects_UNSTABLE:[x()]}),X=T({key:"connectionDatabase",default:"s2cellular",effects_UNSTABLE:[x()]}),U=Ae({key:"connectionConfig",get:({get:e})=>{const t=e(Ve),n=e(Ye),i=e(ze),a=e(X);return{host:t,user:n,password:i,database:a}},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),he=T({key:"configScaleFactor",default:"small",effects_UNSTABLE:[x()]}),H=T({key:"simulatorEnabled",default:!0,effects_UNSTABLE:[x()]}),Ne=100,q=T({key:"notificationsBuffer",default:[]}),en=Ae({key:"notifications",get:({get:e})=>e(q),set:({set:e,get:t},n)=>{if(n instanceof ut)return e(q,[]);const a=[...t(q),...n];a.length>Ne&&a.splice(0,a.length-Ne),e(q,a)},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),Ke=T({key:"mapBounds",default:void 0}),tn=T({key:"databaseDrawerIsOpen",default:!1}),nn=e=>(t,n,i,a=1)=>`https://a.basemaps.cartocdn.com/${e}/${i}/${t}/${n}${a>=2?"@2x":""}.png`,sn=[40.756480069543976,-73.95583135057566],an=({mapState:e,latLngToPixel:t,renderer:n})=>{const i=G.useRef(null),{width:a,height:o}=e||{width:0,height:0};return m.exports.useLayoutEffect(()=>{if(!i.current)throw new Error("No canvas ref");if(a<=0||o<=0||!t)return;console.log("PixiMapLayer: Setup");const r=new mt({view:i.current,width:a,height:o,backgroundAlpha:0,antialias:!0}),{scene:c,draw:d,destroy:u}=n({width:a,height:o,latLngToPixel:t});return r.stage.addChild(c),r.ticker.add(_=>{d(_)}),()=>{console.log("PixiMapLayer: Destroy"),u(),r.destroy(!1,{children:!0,texture:!0,baseTexture:!0})}},[a,o,t,n]),s("canvas",{ref:i})},on=({renderer:e})=>{const[t,n]=m.exports.useState(sn),[i,a]=m.exports.useState(12),o=Le(Ke),r=l(I,{children:["\xA9 ",s(z,{href:"https://osm.org",children:"OpenStreetMap"})," contributors, \xA9"," ",s(z,{href:"https://carto.com/about-carto/",children:"CARTO"})]});return s(S,{borderRadius:"lg",overflow:"hidden",height:"100%",children:s(_t,{dprs:[1,2],provider:nn(Y("light_all","dark_all")),maxZoom:20,center:t,zoom:i,onBoundsChanged:({center:c,zoom:d,bounds:u})=>{n(c),a(d),o(u)},attribution:r,children:s(an,{renderer:e})})})},rn=/^Error (?<code>\d+):/;class f extends Error{constructor(t,n,i){super(t);V(this,"code");V(this,"sql");var a;if(Object.setPrototypeOf(this,f.prototype),this.sql=n,i)this.code=i;else{const o=t.match(rn);this.code=o?parseInt(((a=o.groups)==null?void 0:a.code)||"-1",10):-1}}isUnknownDatabase(){return this.code===1049}isDatabaseRecovering(){return this.code===2269}}const cn=async(e,t,...n)=>{const i=await Q(e,t,...n);if(i.length!==1)throw new f("Expected exactly one row",t);return i[0]},Q=async(e,t,...n)=>{const i=await J("query/rows",e,t,...n);if(i.results.length!==1)throw new f("Expected exactly one result set",t);return i.results[0].rows},be=async(e,t,...n)=>{const i=await J("query/tuples",e,t,...n);if(i.results.length!==1)throw new f("Expected exactly one result set",t);return i.results[0].rows},fe=(e,t,...n)=>J("exec",p(N({},e),{database:void 0}),t,...n),h=(e,t,...n)=>J("exec",e,t,...n),J=async(e,t,n,...i)=>{var r;const a=await fetch(`${t.host}/api/v1/${e}`,{method:"POST",signal:(r=t.ctx)==null?void 0:r.signal,headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${t.user}:${t.password}`)}`},body:JSON.stringify({sql:n,args:i,database:t.database})});if(!a.ok)throw new f(await a.text(),n);const o=await a.json();if(o.error)throw new f(o.error.message,n,o.error.code);return o},pe=e=>`POLYGON((${e.map(n=>`${n[0]} ${n[1]}`).join(",")}))`;var Te=[{name:"date_sub_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_sub_dynamic (
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
END`}],Se=[{name:"process_locations",createStmt:`CREATE OR REPLACE PROCEDURE process_locations (
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
END`}],Ie=[{name:"cities",createStmt:`create rowstore reference table if not exists cities (
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
);`}];const ln=`CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,dn=({interval:e,kind:t,value:n})=>{const i=Et(`${e}-${t}-${n}`);return{id:i,sql:`
      REPLACE INTO segments VALUES
        ('${i}', '${e}', '${t}', '${n}')
    `}};let un=0;const L=(e,t,n,i)=>{const a=un++,o=i.map(dn);return[o.map(({sql:r})=>r),`
    REPLACE INTO offers SET
      offer_id = ${a},
      customer_id = 0,
      enabled = true,

      notification_zone = '${n}',
      segment_ids = '${JSON.stringify(o.map(r=>r.id))}',

      notification_content = '${t}',
      notification_target = 'example.com?offerId=${a}',

      maximum_bid_cents = ${e}
    `]},Z=pe([[-73.9582079,40.8019855],[-73.9827617,40.7683217],[-73.972116,40.7636412],[-73.9470472,40.7978272],[-73.9582079,40.8019855]]),_n=pe([[-73.9997423,40.7337629],[-74.0031335,40.7281694],[-73.9966516,40.7252749],[-73.991801,40.7308361],[-73.9997423,40.7337629]]),je=pe([[-74.4468984,40.4781127],[-74.4497744,40.472612],[-74.4413824,40.4664579],[-74.4346859,40.469233],[-74.4468984,40.4781127]]),mn=["REPLACE INTO cities VALUES (0, 'new york', 'POINT(-74.006 40.7128)', 0.5)","REPLACE INTO customers VALUES (0, 's2cellular')",L(10,"10% off",Z,[{interval:"hour",kind:"olc_8",value:"87G7JXR8"}]),L(5,"Skyvu 10% off",Z,[{interval:"week",kind:"purchase",value:"Skyvu"},{interval:"hour",kind:"request",value:"skyvu.org"}]),L(5,"Topicshots 10% off",Z,[{interval:"hour",kind:"olc_8",value:"87G7JXR8"},{interval:"hour",kind:"request",value:"topicshots.biz"}]),L(5,"Feedmix 10% off",_n,[{interval:"minute",kind:"olc_6",value:"87G8P2"},{interval:"week",kind:"purchase",value:"Feedmix"}]),L(3,"10% off everything!",Z,[{interval:"week",kind:"olc_6",value:"87G8Q2"}]),"REPLACE INTO cities VALUES (1, 'new brunswick', 'POINT(-74.451813 40.485687)', 0.5)",L(10,"10% off",je,[{interval:"hour",kind:"olc_6",value:"87G7FG"},{interval:"week",kind:"purchase",value:"Skyvu"}]),L(3,"sales bonanza!!!",je,[{interval:"week",kind:"olc_6",value:"87G7FH"}])].flat(5),B={small:{maxRows:5e7,prefix:"v1/100k-16"},medium:{maxRows:1e8,prefix:"v1/1m-32"},large:{maxRows:1e9,prefix:"v1/10m-80"}},En=e=>Object.keys(B).includes(e),hn=async e=>{try{return await fe(e,"SELECT 1"),!0}catch{return!1}},Nn=async e=>{let t={tables:[],procedures:[],functions:[]};try{t=(await be(e,`
          SELECT "tables", table_name
          FROM information_schema.tables
          WHERE table_schema = ?
          UNION ALL
          SELECT (
            CASE routine_type
              WHEN 'PROCEDURE' THEN 'procedures'
              WHEN 'FUNCTION' THEN 'functions'
            END
          ), routine_name
          FROM information_schema.routines
          WHERE routine_schema = ?
        `,e.database||"s2cellular",e.database||"s2cellular")).reduce((o,[r,c])=>(o[r].push(c),o),t)}catch(o){if(!(o instanceof f&&(o.isUnknownDatabase()||o.isDatabaseRecovering())))throw o}const{tables:n,procedures:i,functions:a}=t;return Object.fromEntries([Ie.map(({name:o})=>[o,n.includes(o)]),Se.map(({name:o})=>[o,i.includes(o)]),Te.map(({name:o})=>[o,a.includes(o)])].flat())},bn=async(e,t)=>{t("Dropping existing schema","info"),await fe(e,"DROP DATABASE IF EXISTS `"+e.database+"`"),t("Creating database","info"),await fe(e,"CREATE DATABASE `"+e.database+"`");for(const n of Te)t(`Creating function: ${n.name}`,"info"),await h(e,n.createStmt);for(const n of Ie)t(`Creating table: ${n.name}`,"info"),await h(e,n.createStmt);for(const n of Se)t(`Creating procedure: ${n.name}`,"info"),await h(e,n.createStmt);await h(e,ln),await fn(e),t("Schema initialized","success")},fn=async e=>{for(const t of mn)await h(e,t)},Xe=async(e,t)=>{const n=B[t].prefix;return await Q(e,`
      SELECT
        expected.city_id AS cityId,
        expected.city_name AS cityName,
        GEOGRAPHY_LONGITUDE(expected.centroid) AS lon,
        GEOGRAPHY_LATITUDE(expected.centroid) AS lat,
        expected.diameter,
        pipelineName,
        (
          pipelines.pipeline_name IS NULL
          OR config_json::$connection_string NOT LIKE "%${n}%"
        ) AS needsUpdate
      FROM (
        SELECT cities.*, CONCAT(prefix.table_col, cities.city_id) AS pipelineName
        FROM s2cellular.cities
        JOIN TABLE(["locations_", "requests_", "purchases_"]) AS prefix
      ) AS expected
      LEFT JOIN information_schema.pipelines
        ON pipelines.database_name = ?
        AND pipelines.pipeline_name = expected.pipelineName
    `,e.database||"s2cellular")},qe=async(e,t)=>{const n=B[t].prefix,i=await Xe(e,t);await Promise.all(i.filter(a=>a.needsUpdate).map(async a=>{console.log(`recreating pipeline ${a.pipelineName} for city ${a.cityName}`),a.pipelineName.startsWith("locations_")?await h(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${n}/locations.*'
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
          `,a.cityId,a.lon,a.diameter,a.lat,a.diameter):a.pipelineName.startsWith("requests_")?await h(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${n}/requests.*'
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,a.cityId):a.pipelineName.startsWith("purchases_")&&await h(e,`
            CREATE OR REPLACE PIPELINE ${a.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${n}/purchases.*'
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,a.cityId),await h(e,`ALTER PIPELINE ${a.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await h(e,`START PIPELINE IF NOT RUNNING ${a.pipelineName}`),console.log(`finished creating pipeline ${a.pipelineName} for city ${a.cityName}`)}))},pn=async e=>{const t=await be(e,`
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
    `,e.database||"s2cellular");await Promise.all(t.map(async([n])=>{console.log("restarting pipeline",n),await h(e,`ALTER PIPELINE ${n} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await h(e,`START PIPELINE IF NOT RUNNING ${n}`)}))},Tn=async e=>{const t=await Q(e,`
      SELECT plan_id AS planId
      FROM information_schema.plancache
      WHERE plan_warnings LIKE "%empty tables%";
    `);await Promise.all(t.map(({planId:n})=>h(e,`DROP ${n} FROM PLANCACHE`)))},Sn=(e,t)=>Q(e,`
      SELECT
        table_name AS tableName,
        SUM(rows) AS count
      FROM information_schema.table_statistics
      WHERE
        database_name = ?
        AND partition_type = "Master"
        AND table_name IN (${t.map(n=>`"${n}"`).join(",")})
      GROUP BY table_name
    `,e.database||"s2cellular"),In=async(e,t)=>{const{maxRows:n}=B[t],a=(await Sn(e,["locations","requests","purchases","notifications"])).filter(o=>o.count>n);await Promise.all(a.map(async({tableName:o,count:r})=>{const c=r-n,{ts:d,cumulative_count:u}=await cn(e,`
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
        `,e.database||"s2cellular",o);d!==null&&(console.log(`removing ${u} rows from ${o} older than ${d}`),await h(e,`DELETE FROM ${o} WHERE ts <= ?`,d))}))},On=e=>h(e,"CALL run_matching_process()"),Rn=e=>h(e,"CALL update_segments()"),gn=(e,t,n)=>be(e,`
      SELECT
        ts,
        offer_id,
        GEOGRAPHY_LONGITUDE(lonlat) AS lon,
        GEOGRAPHY_LATITUDE(lonlat) AS lat
      FROM notifications
      WHERE ts > ?
      ORDER BY ts ASC
      LIMIT ${n}
    `,t),An=Object.fromEntries([Ie.map(({name:e})=>[e,!1]),Se.map(({name:e})=>[e,!1]),Te.map(({name:e})=>[e,!1])].flat()),Qe=(e=!1)=>{const t=b(U),n=m.exports.useCallback(()=>e,[e]);return ae(["schemaObjects",t],()=>Nn(t),{isPaused:n,fallbackData:An})},C=()=>{const a=b(U),{database:e}=a,t=M(a,["database"]),n=ae(["isConnected",t],()=>hn(t)),i=Qe(!n.data);return{connected:!!n.data,initialized:!!n.data&&Object.values(i.data||[]).every(Boolean),reset:()=>{n.mutate(),i.mutate()}}},Ln=(()=>{let e={};return t=>(t in e||(e[t]=1),`${t}(${e[t]++})`)})(),ee=(e,{name:t,enabled:n,intervalMS:i})=>{m.exports.useEffect(()=>{if(!n)return;const a=new AbortController,o=Ln(t);console.log(`Starting ${o}: tick interval: ${i}ms`);const r=async()=>{try{if(console.time(o),a.signal.aborted)return;const c=+Date.now();await e(a);const d=+Date.now()-c;setTimeout(r,Math.max(0,i-d))}catch(c){if(a.signal.aborted||c instanceof f&&c.isUnknownDatabase()||c instanceof DOMException&&c.name==="AbortError")return;throw c}finally{console.timeEnd(o)}};return r(),()=>{console.log(`Stopping ${o}`),a.abort()}},[n,e,i,t])},Cn=({before:e,after:t})=>{const n=b(U),{reset:i}=C(),[a,o]=O(H),r=Ce();return m.exports.useCallback(async()=>{const c=a;o(!1),e(),await bn(n,(d,u)=>{const _="reset-schema";r.isActive(_)?r.update(_,{title:d,status:u,duration:u==="success"?3e3:null,isClosable:u==="success"}):r({id:_,title:d,status:u,duration:null})}),t(),i(),o(c)},[a,o,e,n,t,i,r])},yn=1*1e3,Dn=()=>{const e=m.exports.useRef();return{subscribe:m.exports.useCallback(t=>{if(e.current)throw new Error("NotificationEmitter already subscribed");e.current=t},[]),unsubscribe:m.exports.useCallback(t=>{e.current===t&&(e.current=void 0)},[]),emit:m.exports.useCallback(t=>{e.current&&e.current(t)},[])}},wn=()=>{const e=b(U),t=b(H),{initialized:n}=C(),i=m.exports.useRef(new Date().toISOString()),a=Le(en),{subscribe:o,unsubscribe:r,emit:c}=Dn(),d=m.exports.useCallback(async u=>{const _=p(N({},e),{ctx:u}),E=await gn(_,i.current,Ne);E.length>0&&(i.current=E[E.length-1][0],a(E),c(E))},[e,a,c]);return ee(d,{name:"Notifications",enabled:n&&t,intervalMS:yn}),{subscribe:o,unsubscribe:r}},Pn=({subscribe:e,unsubscribe:t})=>{const n=ht(({snapshot:i})=>()=>i.getPromise(Ke));return m.exports.useCallback(({latLngToPixel:i})=>{console.log("NotificationsRenderer: Setup");const a=new ye,o=[],r=(u,_)=>{let E=0;const D=1.5,w=new ye,nt=306687,st=306687,W=new De;W.beginFill(nt).drawCircle(0,0,5).endFill(),w.addChild(W);const R=new De;R.beginFill(st),R.drawTorus&&R.drawTorus(0,0,4,6),R.endFill(),w.addChild(R),a.addChild(w);const ne=at=>{if(E+=at/60,E>D){a.removeChild(w),o.splice(o.indexOf(ne),1);return}const P=E%D/D,it=pt(P);R.scale.set(1+it);const g=.4,Oe=P<g?Nt(P/g):1-bt((P-g)/(1-g));R.alpha=Oe,P<g?W.alpha=Oe:W.alpha=1-ft((P-g)/(1-g));const[ot,rt]=i([_,u]);w.x=ot,w.y=rt};ne(0),o.push(ne)},c=(u,_,E)=>_<=u.ne[0]&&E<=u.ne[1]&&_>=u.sw[0]&&E>=u.sw[1],d=async u=>{const _=await n();for(const[,,E,D]of u)(!_||c(_,D,E))&&r(E,D)};return e(d),{scene:a,draw(u){for(const _ of o)_(u)},destroy(){console.log("NotificationsRenderer: Destroy"),t(d)}}},[n,e,t])},vn=()=>{const e=wn(),t=Pn(e);return l(K,{gap:4,justifyContent:"space-between",direction:["column","column","row"],height:"100%",children:[l(v,{spacing:4,flex:"2 2 0",minHeight:"200px",maxHeight:"100%",children:[s(k,{size:"md",children:"Map"}),s(on,{renderer:t})]}),s(v,{spacing:4,flex:"1 1 0",minWidth:"0",children:s(k,{size:"md",children:"Stats"})})]})},xn=Tt({a:n=>{var i=n,{children:e}=i,t=M(i,["children"]);var o;const a=!!((o=t.href)==null?void 0:o.startsWith("http"));return l(z,p(N({isExternal:a},t),{children:[e,a&&s(St,{bottom:"2px",boxSize:"0.9em",position:"relative",ml:1})]}))}}),y=n=>{var i=n,{children:e}=i,t=M(i,["children"]);return s(It,p(N({},t),{skipHtml:!0,components:xn,children:we(e)}))},Un=()=>{const[e,t]=O(he);return l(ie,{children:[s(oe,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Scale Factor"}),s(Ot,{size:"sm",required:!0,value:e,onChange:n=>{const i=n.target.value;En(i)&&t(i)},children:Object.keys(B).sort().map(n=>s("option",{value:n,children:n},n))})]})},te=({label:e,placeholder:t,value:n,setValue:i,helpText:a,type:o="text"})=>l(ie,{children:[s(oe,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:e}),s(ve,{size:"sm",placeholder:t,value:n,onChange:r=>i(r.target.value),type:o}),a?s(Rt,{fontSize:"xs",children:a}):null]}),Je=({showDatabase:e,showScaleFactor:t})=>{const[n,i]=O(Ve),[a,o]=O(Ye),[r,c]=O(ze),[d,u]=O(X);return l(v,{spacing:4,children:[s(te,{label:"Host & Port",placeholder:"http://127.0.0.1:8808",value:n,setValue:i,helpText:s(y,{children:`
              The protocol (http, https), host, and port for the SingleStore
              [HTTP API][1].

              [1]: https://docs.singlestore.com/docs/http-api/
            `})}),l(Pe,{columns:2,gap:2,children:[s(te,{label:"Username",placeholder:"admin",value:a,setValue:o}),s(te,{label:"Password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:r,setValue:c,type:"password"}),e&&s(te,{label:"Database",placeholder:"s2cellular",value:d,setValue:u}),t&&s(Un,{})]})]})},Ze=e=>{const{connected:t,initialized:n}=C(),i=xe(),[a,o]=Ue(),r=b(X),c=G.useRef(null),d=Cn({before:m.exports.useCallback(()=>o.on(),[o]),after:m.exports.useCallback(()=>{o.off(),i.onClose()},[i,o])});return l(I,{children:[s(A,N({disabled:!t||e.disabled,onClick:i.onOpen,colorScheme:n?"green":"red"},e)),s(gt,{isOpen:i.isOpen,onClose:i.onClose,closeOnEsc:!1,closeOnOverlayClick:!1,leastDestructiveRef:c,children:s(Me,{children:l(At,{children:[l(Ge,{fontSize:"lg",fontWeight:"bold",children:[n?"Reset":"Setup"," database ",r]}),l(ke,{children:["This will ",n?"recreate":"create"," database"," ",r,". Are you sure?"]}),l(He,{children:[s(A,{ref:c,onClick:i.onClose,disabled:a,children:"Cancel"}),s(A,{disabled:a,colorScheme:"red",onClick:d,ml:3,children:a?s(Be,{}):n?"Reset Schema":"Setup Schema"})]})]})})})]})},Mn=({isOpen:e,onClose:t,finalFocusRef:n})=>{const[i,a]=O(H),{connected:o,initialized:r}=C();return l(Lt,{isOpen:e,placement:"right",onClose:t,finalFocusRef:n,children:[s(Me,{}),l(Ct,{children:[s(yt,{}),s(Ge,{children:"Config"}),s(ke,{children:l(v,{spacing:4,children:[s(Je,{showScaleFactor:!0,showDatabase:!0}),l(re,{status:o?"success":"error",borderRadius:"md",children:[s(ce,{}),s(le,{children:o?"connected":"disconnected"})]}),l(re,{status:r?"success":"warning",borderRadius:"md",children:[s(ce,{}),s(le,{children:"schema"}),s(Ze,{position:"absolute",right:4,top:3,size:"xs",children:r?"Reset":"Setup"})]}),l(re,{status:i?"success":"warning",borderRadius:"md",children:[s(ce,{}),s(le,{children:"simulator"}),s(Dt,{position:"absolute",right:4,top:3.5,size:"md",colorScheme:i?"green":"red",isChecked:i,disabled:!o||!r,onChange:()=>a(!i)})]})]})}),s(He,{})]})]})},et=({to:e,children:t,onClick:n})=>{const i=kt(e),a=Ht({path:i.pathname,end:!0});return s(z,{as:Bt,to:e,px:2,py:1,onClick:n,rounded:"md",_hover:{textDecoration:"none",bg:Y("gray.300","gray.600")},fontWeight:a?"bold":"normal",href:"#",color:Y("gray.700","gray.200"),children:t})},Gn=()=>{const{colorMode:e,toggleColorMode:t}=de(),n=xe(),[i,a]=O(tn),o=G.useRef(null),{connected:r,initialized:c}=C(),d=b(H),[u]=wt("(max-width: 640px)"),_=l(I,{children:[s(et,{to:"/",onClick:n.onClose,children:"Overview"}),s(et,{to:"/map",onClick:n.onClose,children:"Map"})]});let E;return u||(E=r?c?d?"connected":"simulator disabled":"needs schema":"disconnected"),s(I,{children:s(S,{bg:Y("gray.200","gray.700"),children:l(ue,{maxW:"container.lg",children:[l(K,{h:16,alignItems:"center",justifyContent:"space-between",children:[s(_e,{size:"md",icon:n.isOpen?s(Pt,{}):s(vt,{}),"aria-label":"Open Menu",display:{md:"none"},onClick:n.isOpen?n.onClose:n.onOpen}),l(j,{spacing:8,alignItems:"center",children:[s(k,{as:"h1",size:"lg",children:u?"S2C":"S2 Cellular"}),s(j,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:_})]}),l(K,{alignItems:"center",gap:2,children:[l(A,{size:"sm",ref:o,onClick:()=>a(!0),colorScheme:r?c&&d?"green":"yellow":"red",children:[c?s(me,{}):s(Fe,{}),u||s(We,{pl:2,children:E})]}),s(_e,{"aria-label":"Github Repo",size:"sm",icon:e==="light"?s(xt,{size:"1.4em"}):s(Ut,{size:"1.4em"}),onClick:()=>window.open("https://github.com/singlestore-labs/demo-s2cellular","_blank")}),s(_e,{"aria-label":"Toggle Color Mode",size:"sm",onClick:t,icon:e==="light"?s(Mt,{boxSize:"1.2em"}):s(Gt,{boxSize:"1.2em"})})]})]}),n.isOpen?s(S,{pb:4,display:{md:"none"},children:s(v,{as:"nav",spacing:4,children:_})}):null,s(Mn,{isOpen:i,onClose:()=>a(!1),finalFocusRef:o})]})})})},F=e=>{const{completed:t,title:n,left:i,right:a}=e,{colorMode:o}=de(),r=t?.8:1,c={boxSize:6,position:"relative",bottom:.5,mr:2};return l(I,{children:[l(Ee,{opacity:r,children:[l(k,{as:"h2",size:"lg",mb:4,children:[t?s(me,N({color:o==="light"?"green.200":"green.600"},c)):s(me,N({color:o==="light"?"gray.200":"gray.600"},c)),n]}),i]}),s(Ee,{opacity:r,children:a})]})},kn=({connected:e})=>s(F,{completed:e,title:"Connect to SingleStore",left:s(y,{children:`
            This demo requires a connection to SingleStore's HTTP API. Please
            ensure the connection details on the right are correct.
            
            **Note**: The HTTP API may need to be enabled on your SingleStore
            cluster. To do so please see [our documentation][1] or contact
            support for assistance.
            
            [1]: https://docs.singlestore.com/docs/http-api/
          `}),right:s(Je,{})}),Hn=({initialized:e})=>{const[t,n]=O(X),i=Qe(),{colorMode:a}=de();return s(F,{completed:e,title:"Setup the schema",left:l(I,{children:[s(y,{children:`
              Our schema includes the database and a set of tables and views we
              need to store all of our data. Use the controls below to set the
              database name and create the schema.
            `}),s(Wt,{mt:4,mb:6}),l(j,{alignItems:"flex-end",children:[l(ie,{flex:1,children:[s(oe,{fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Database name"}),s(ve,{placeholder:"s2cellular",value:t,size:"sm",onChange:o=>n(o.target.value)})]}),s(S,{flex:1,textAlign:"center",children:s(Ze,{colorScheme:"blue",size:"sm",disabled:e,children:e?"Schema is setup":"Setup schema"})})]})]}),right:s(Pe,{columns:[1,2,2],gap:1,children:Object.keys(i.data||{}).sort().map(o=>{var r;return s(Ee,{bg:(((r=i.data)==null?void 0:r[o])?"green":"gray")+(a==="light"?".200":".600"),color:a==="light"?"gray.800":"gray.100",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",borderRadius:"md",px:2,py:1,textAlign:"center",children:o},o)})})})},Bn=()=>{var c;const e=b(U),t=b(he),n=ae(["pipelineStatus",e,t],()=>Xe(e,t)),i=!!((c=n.data)==null?void 0:c.every(d=>!d.needsUpdate)),[a,o]=Ue(),r=m.exports.useCallback(async()=>{o.on(),await qe(e,t),n.mutate(),o.off()},[o,e,t,n]);return s(F,{completed:i,title:"Ingest data",left:l(I,{children:[s(y,{children:`
            S2 Cellular needs location, request, and purchase history from each
            of it's subscribers in real time. We will simulate these streams by
            using [SingleStore Pipelines][1] to ingest data from [AWS S3][2].

            [1]: https://docs.singlestore.com/managed-service/en/load-data/about-loading-data-with-pipelines/pipeline-concepts/overview-of-pipelines.html
            [2]: https://aws.amazon.com/s3/
          `}),l(A,{colorScheme:"blue",size:"sm",onClick:r,disabled:i,children:[a&&s(Be,{mr:2}),a?"Creating Pipelines":i?"Pipelines are already setup":"Create pipelines"]})]}),right:s(S,{children:"TODO: show write workload graph"})})},Fn=()=>s(F,{completed:!1,title:"Segmentation",left:s(y,{children:`
          `}),right:s(S,{children:"Coming soon"})}),Wn=()=>s(F,{completed:!1,title:"Matching",left:s(y,{children:`
          `}),right:s(S,{children:"Coming soon"})}),tt=e=>e.r?s(I,{children:e.children}):null,$n=()=>{const{connected:e,initialized:t}=C();return l(ue,{maxW:"container.lg",mt:10,mb:20,children:[s(S,{maxW:"container.md",mb:10,px:0,children:s(y,{children:`
            ## Welcome to S2 Cellular!

            S2 Cellular is a hypothetical telecom company which provides free
            cell-phone plans in exchange for delivering targeted ads to
            subscribers. To do this, S2 Cellular collects location, browser, and
            purchase history from devices and stores it in SingleStore. Before we
            can deliver ads, we need to place subscribers in segments via
            comparing their history against segments our advertisers care about.
            Finally, we use geospatial indexes along with segments to deliver ads
            to devices as they move around the world.

            This page will take you through the process of setting up the demo,
            explaining everything as we go. If you have any questions or issues, please
            file an issue on the [GitHub repo][1] or our [forums][2].

            [1]: https://github.com/singlestore-labs/demo-s2cellular
            [2]: https://www.singlestore.com/forum/
          `})}),l(Ft,{columnGap:6,rowGap:10,templateColumns:["minmax(0, 1fr)",null,"repeat(2, minmax(0, 1fr))"],children:[s(kn,{connected:e}),s(tt,{r:e,children:s(Hn,{initialized:t})}),l(tt,{r:t,children:[s(Bn,{}),s(Fn,{}),s(Wn,{})]})]})]})},Vn=10*1e3,Yn=1*1e3,zn=10*1e3,Kn=()=>{const e=b(U),t=b(he),n=b(H),{initialized:i}=C(),a=m.exports.useCallback(c=>{const d=p(N({},e),{ctx:c});return Promise.all([qe(d,t),pn(d),In(d,t),Tn(d)])},[e,t]);ee(a,{name:"SimulatorMonitor",enabled:i&&n,intervalMS:Vn});const o=m.exports.useCallback(c=>On(p(N({},e),{ctx:c})),[e]);ee(o,{name:"SimulatorMatcher",enabled:i&&n,intervalMS:Yn});const r=m.exports.useCallback(c=>Rn(p(N({},e),{ctx:c})),[e]);ee(r,{name:"SimulatorUpdateSegments",enabled:i&&n,intervalMS:zn})};function jn(){return Kn(),l(K,{height:"100vh",direction:"column",children:[s(Gn,{}),s(S,{m:4,flex:"1",children:l($t,{children:[s($e,{path:"/",element:s($n,{})}),s($e,{path:"/map",element:s(vn,{})})]})})]})}const Xn=n=>{var i=n,{children:e}=i,t=M(i,["children"]);return s(Vt,p(N({as:"pre",borderRadius:"md",overflow:"auto",display:"block",px:6,py:4,minW:0},t),{children:e}))};class qn extends G.Component{constructor(){super(void 0);V(this,"state",{});this.handlePromiseRejection=this.handlePromiseRejection.bind(this)}componentDidMount(){window.addEventListener("unhandledrejection",this.handlePromiseRejection)}componentWillUnmount(){window.removeEventListener("unhandledrejection",this.handlePromiseRejection)}handlePromiseRejection(t){this.setState({error:t.reason})}static getDerivedStateFromError(t){return{error:t}}render(){const{error:t}=this.state;if(t){let n;return t instanceof f&&(n=l(I,{children:[s(We,{textAlign:"center",children:"An error occurred while running the following query:"}),s(Xn,{children:we(t.sql)})]})),s(ue,{maxW:"container.md",my:10,children:l(v,{gap:4,children:[s(Yt,{children:s(Fe,{boxSize:20,color:"red"})}),s(k,{size:"xl",textAlign:"center",children:t.message}),n,l(j,{justify:"center",gap:4,children:[s(A,{onClick:()=>this.setState({error:void 0}),size:"sm",children:"Dismiss Error"}),s(A,{onClick:()=>window.location.reload(),size:"sm",colorScheme:"blue",leftIcon:s(zt,{}),children:"Reload"})]})]})})}return this.props.children}}const Qn=Kt({fonts:{heading:"InterVariable, sans-serif",body:"InterVariable, sans-serif",mono:'"Source Code ProVariable", monospace'},components:{Link:{baseStyle:e=>({color:e.colorMode==="light"?"blue.600":"blue.300"})}}}),Jn=({children:e})=>{const t=Ce();return s(Jt,{value:{onError:i=>{t({title:"An error occurred",description:i.message,status:"error",duration:5e3,isClosable:!0})}},children:e})};jt.render(s(G.StrictMode,{children:s(Xt,{theme:Qn,children:s(qn,{children:s(Jn,{children:s(qt,{children:s(Qt,{basename:"/demo-s2cellular/",children:s(jn,{})})})})})})}),document.getElementById("root"));
