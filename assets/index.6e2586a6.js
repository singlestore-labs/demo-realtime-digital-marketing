var Fe=Object.defineProperty,We=Object.defineProperties;var $e=Object.getOwnPropertyDescriptors;var Te=Object.getOwnPropertySymbols;var Ve=Object.prototype.hasOwnProperty,Ye=Object.prototype.propertyIsEnumerable;var ae=(e,n,t)=>n in e?Fe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,C=(e,n)=>{for(var t in n||(n={}))Ve.call(n,t)&&ae(e,t,n[t]);if(Te)for(var t of Te(n))Ye.call(n,t)&&ae(e,t,n[t]);return e},U=(e,n)=>We(e,$e(n));var $=(e,n,t)=>(ae(e,typeof n!="symbol"?n+"":n,t),t);import{R as S,a as fe,b as Ke,r as m,c as pe,j as i,B as V,M as ze,u as oe,d as M,A as Xe,e as l,F as H,L as Y,s as je,f as L,g as qe,C as Ie,h as Qe,G as he,i as Je,l as Ze,k as en,q as nn,m as K,S as k,H as z,n as w,o as re,p as tn,t as be,D as sn,v as Re,w as an,x as on,y as Oe,z as Ae,E as rn,I as cn,J as Se,K as Le,N as ln,O as ce,P as le,Q as de,T as D,U as dn,V as ge,W as un,X as _n,Y as En,Z as mn,_ as Nn,$ as Tn,a0 as fn,a1 as pn,a2 as In,a3 as ue,a4 as hn,a5 as Ce,a6 as bn,a7 as Rn,a8 as On,a9 as An,aa as Sn,ab as Ln,ac as gn,ad as Cn,ae as Dn,af as yn,ag as De,ah as Pn,ai as Un,aj as wn,ak as vn,al as xn,am as Gn,an as Mn}from"./vendor.dff0e227.js";const Hn=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};Hn();const v=()=>({setSelf:e,onSet:n,node:t})=>{const a=`recoil.localstorage.${t.key}`,s=localStorage.getItem(a);s!=null&&e(JSON.parse(s)),n((o,r,c)=>{c?localStorage.removeItem(a):localStorage.setItem(a,JSON.stringify(o))})},ye=S({key:"connectionHost",default:"http://127.0.0.1",effects_UNSTABLE:[v()]}),Pe=S({key:"connectionUser",default:"root",effects_UNSTABLE:[v()]}),Ue=S({key:"connectionPassword",default:"",effects_UNSTABLE:[v()]}),we=S({key:"connectionDatabase",default:"s2cellular",effects_UNSTABLE:[v()]}),X=fe({key:"connectionConfig",get:({get:e})=>{const n=e(ye),t=e(Pe),a=e(Ue),s=e(we);return{host:n,user:t,password:a,database:s}},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),ve=S({key:"configScaleFactor",default:"small",effects_UNSTABLE:[v()]}),j=S({key:"simulatorEnabled",default:!0,effects_UNSTABLE:[v()]}),_e=100,q=S({key:"notificationsBuffer",default:[]}),kn=fe({key:"notifications",get:({get:e})=>e(q),set:({set:e,get:n},t)=>{if(t instanceof Ke)return e(q,[]);const s=[...n(q),...t];s.length>_e&&s.splice(0,s.length-_e),e(q,s)},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),xe=S({key:"mapBounds",default:void 0}),Bn=e=>(n,t,a,s=1)=>`https://a.basemaps.cartocdn.com/${e}/${a}/${n}/${t}${s>=2?"@2x":""}.png`,Fn=[40.756480069543976,-73.95583135057566],Wn=({mapState:e,latLngToPixel:n,renderer:t})=>{const a=M.useRef(null),{width:s,height:o}=e||{width:0,height:0};return m.exports.useLayoutEffect(()=>{if(!a.current)throw new Error("No canvas ref");if(s<=0||o<=0||!n)return;console.log("PixiMapLayer: Setup");const r=new Xe({view:a.current,width:s,height:o,backgroundAlpha:0,antialias:!0}),{scene:c,draw:u,destroy:d}=t({width:s,height:o,latLngToPixel:n});return r.stage.addChild(c),r.ticker.add(E=>{u(E)}),()=>{console.log("PixiMapLayer: Destroy"),d(),r.destroy(!1,{children:!0,texture:!0,baseTexture:!0})}},[s,o,n,t]),i("canvas",{ref:a})},$n=({renderer:e})=>{const[n,t]=m.exports.useState(Fn),[a,s]=m.exports.useState(12),o=pe(xe),r=l(H,{children:["\xA9 ",i(Y,{href:"https://osm.org",children:"OpenStreetMap"})," contributors, \xA9"," ",i(Y,{href:"https://carto.com/about-carto/",children:"CARTO"})]});return i(V,{borderRadius:"lg",overflow:"hidden",height:"100%",children:i(ze,{dprs:[1,2],provider:Bn(oe("light_all","dark_all")),maxZoom:20,center:n,zoom:a,onBoundsChanged:({center:c,zoom:u,bounds:d})=>{t(c),s(u),o(d)},attribution:r,children:i(Wn,{renderer:e})})})},Vn=/^Error (?<code>\d+):/;class h extends Error{constructor(n,t,a){super(n);$(this,"code");$(this,"sql");var s;if(Object.setPrototypeOf(this,h.prototype),this.sql=t,a)this.code=a;else{const o=n.match(Vn);this.code=o?parseInt(((s=o.groups)==null?void 0:s.code)||"-1",10):-1}}isUnknownDatabase(){return this.code===1049}isDatabaseRecovering(){return this.code===2269}}const Yn=async(e,n,...t)=>{const a=await Ee(e,n,...t);if(a.length!==1)throw new h("Expected exactly one row",n);return a[0]},Ee=async(e,n,...t)=>{const a=await Q("query/rows",e,n,...t);if(a.results.length!==1)throw new h("Expected exactly one result set",n);return a.results[0].rows},B=async(e,n,...t)=>{const a=await Q("query/tuples",e,n,...t);if(a.results.length!==1)throw new h("Expected exactly one result set",n);return a.results[0].rows},Ge=(e,n,...t)=>Q("exec",U(C({},e),{database:void 0}),n,...t),T=(e,n,...t)=>Q("exec",e,n,...t),Q=async(e,n,t,...a)=>{var r;const s=await fetch(`${n.host}/api/v1/${e}`,{method:"POST",signal:(r=n.ctx)==null?void 0:r.signal,headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${n.user}:${n.password}`)}`},body:JSON.stringify({sql:t,args:a,database:n.database})});if(!s.ok)throw new h(await s.text(),t);const o=await s.json();if(o.error)throw new h(o.error.message,t,o.error.code);return o},me=e=>`POLYGON((${e.map(t=>`${t[0]} ${t[1]}`).join(",")}))`;var Me=[{name:"date_sub_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_sub_dynamic (
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
END`}],He=[{name:"process_locations",createStmt:`CREATE OR REPLACE PROCEDURE process_locations (
    _batch QUERY(
        city_id BIGINT NOT NULL,
        subscriber_id BIGINT NOT NULL,
        lonlat GEOGRAPHYPOINT NOT NULL
    )
)
AS
BEGIN
    INSERT INTO subscribers
    SELECT city_id, subscriber_id, lonlat, NULL
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
    _num_subscriber_segments_q QUERY(c INT) = SELECT COUNT(*) FROM subscriber_segments;
    _num_subscriber_segments INT = SCALAR(_num_subscriber_segments_q);
BEGIN
    IF (_num_subscriber_segments = 0) THEN
        RETURN 0;
    END IF;

    INSERT INTO notifications SELECT _ts, * FROM match_offers_to_subscribers;

    _count = row_count();

    INSERT INTO subscribers
    SELECT city_id, subscriber_id, lonlat, ts
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
END`}],ke=[{name:"cities",createStmt:`create rowstore reference table if not exists cities (
  city_id BIGINT NOT NULL,
  city_name TEXT NOT NULL,
  centroid GEOGRAPHYPOINT NOT NULL,
  diameter DOUBLE,

  PRIMARY KEY (city_id)
);`},{name:"subscribers",createStmt:`create rowstore table if not exists subscribers (
  city_id BIGINT NOT NULL,
  subscriber_id BIGINT NOT NULL,
  current_location GEOGRAPHYPOINT NOT NULL,
  last_notification DATETIME(6),

  PRIMARY KEY (city_id, subscriber_id),
  INDEX (current_location),
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
      SELECT *
      FROM
        offers,
        subscribers
      WHERE
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
);`}];const Kn=({interval:e,kind:n,value:t})=>{const a=je(`${e}-${n}-${t}`);return{id:a,sql:`
      REPLACE INTO segments VALUES
        ('${a}', '${e}', '${n}', '${t}')
    `}};let zn=0;const F=(e,n,t,a)=>{const s=zn++,o=a.map(Kn);return[o.map(({sql:r})=>r),`
    REPLACE INTO offers SET
      offer_id = ${s},
      customer_id = 0,
      enabled = true,

      notification_zone = '${t}',
      segment_ids = '${JSON.stringify(o.map(r=>r.id))}',

      notification_content = '${n}',
      notification_target = 'example.com?offerId=${s}',

      maximum_bid_cents = ${e}
    `]},Ne=me([[-73.9582079,40.8019855],[-73.9827617,40.7683217],[-73.972116,40.7636412],[-73.9470472,40.7978272],[-73.9582079,40.8019855]]),Xn=me([[-73.9997423,40.7337629],[-74.0031335,40.7281694],[-73.9966516,40.7252749],[-73.991801,40.7308361],[-73.9997423,40.7337629]]),jn=me([[-74.4468984,40.4781127],[-74.4497744,40.472612],[-74.4413824,40.4664579],[-74.4346859,40.469233],[-74.4468984,40.4781127]]),qn=[`CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,"REPLACE INTO cities VALUES (0, 'new york', 'POINT(-74.006 40.7128)', 0.5)","REPLACE INTO customers VALUES (0, 's2cellular')",F(10,"10% off",Ne,[{interval:"hour",kind:"olc_8",value:"87G7JXR8"}]),F(5,"Skyvu 10% off",Ne,[{interval:"week",kind:"purchase",value:"Skyvu"},{interval:"hour",kind:"request",value:"skyvu.org"}]),F(5,"Topicshots 10% off",Ne,[{interval:"hour",kind:"olc_8",value:"87G7JXR8"},{interval:"hour",kind:"request",value:"topicshots.biz"}]),F(5,"Feedmix 10% off",Xn,[{interval:"minute",kind:"olc_6",value:"87G8P2"},{interval:"week",kind:"purchase",value:"Feedmix"}]),"REPLACE INTO cities VALUES (1, 'new brunswick', 'POINT(-74.451813 40.485687)', 0.5)",F(10,"10% off",jn,[{interval:"hour",kind:"olc_6",value:"87G7FG"},{interval:"week",kind:"purchase",value:"Skyvu"}])].flat(5),J={small:{maxRows:5e7,prefix:"v1/100k-16"},medium:{maxRows:1e8,prefix:"v1/1m-32"},large:{maxRows:1e9,prefix:"v1/10m-80"}},Qn=e=>Object.keys(J).includes(e),Jn=async e=>{try{return{connected:!0,initialized:await Zn(e)}}catch{return{connected:!1}}},Zn=async e=>{try{const n=(await B(e,"SHOW TABLES")).map(s=>s[0]).sort(),t=(await B(e,"SHOW PROCEDURES")).map(s=>s[0]).sort(),a=(await B(e,"SHOW FUNCTIONS")).map(s=>s[0]).sort();return ke.every(({name:s})=>n.includes(s))&&He.every(({name:s})=>t.includes(s))&&Me.every(({name:s})=>a.includes(s))}catch(n){if(n instanceof h&&(n.isUnknownDatabase()||n.isDatabaseRecovering()))return!1;throw n}},et=async(e,n)=>{n("Dropping existing schema","info"),await Ge(e,"DROP DATABASE IF EXISTS `"+e.database+"`"),n("Creating database","info"),await Ge(e,"CREATE DATABASE `"+e.database+"`");for(const t of Me)n(`Creating function: ${t.name}`,"info"),await T(e,t.createStmt);for(const t of ke)n(`Creating table: ${t.name}`,"info"),await T(e,t.createStmt);for(const t of He)n(`Creating procedure: ${t.name}`,"info"),await T(e,t.createStmt);for(const t of qn)await T(e,t);n("Schema initialized","success")},nt=async(e,n)=>{const t=J[n].prefix,a=await Ee(e,`
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
    `,e.database||"s2cellular");await Promise.all(a.map(async s=>{console.log(`recreating pipeline ${s.pipelineName} for city ${s.cityName}`),s.pipelineName.startsWith("locations_")?await T(e,`
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
          `,s.cityId,s.lon,s.diameter,s.lat,s.diameter):s.pipelineName.startsWith("requests_")?await T(e,`
            CREATE OR REPLACE PIPELINE ${s.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${t}/requests.*'
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,s.cityId):s.pipelineName.startsWith("purchases_")&&await T(e,`
            CREATE OR REPLACE PIPELINE ${s.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${t}/purchases.*'
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,s.cityId),await T(e,`ALTER PIPELINE ${s.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await T(e,`START PIPELINE IF NOT RUNNING ${s.pipelineName}`)}))},tt=async e=>{const n=await B(e,`
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
    `,e.database||"s2cellular");await Promise.all(n.map(async([t])=>{console.log("restarting pipeline",t),await T(e,`ALTER PIPELINE ${t} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await T(e,`START PIPELINE IF NOT RUNNING ${t}`)}))},st=async(e,n)=>{const{maxRows:t}=J[n],a=await Ee(e,`
      SELECT
        table_name AS name,
        SUM(rows) AS count
      FROM information_schema.table_statistics
      WHERE
        database_name = ?
        AND partition_type = "Master"
        AND table_name IN ("locations", "requests", "purchases", "notifications")
      GROUP BY table_name
      HAVING count > ${t}
    `,e.database||"s2cellular");await Promise.all(a.map(async({name:s,count:o})=>{const r=o-t,{ts:c,cumulative_count:u}=await Yn(e,`
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
          WHERE cumulative_count <= ${r}
        `,e.database||"s2cellular",s);c!==null&&(console.log(`removing ${u} rows from ${s} older than ${c}`),await T(e,`DELETE FROM ${s} WHERE ts <= ?`,c))}))},it=e=>T(e,"CALL run_matching_process()"),at=e=>T(e,"CALL update_segments()"),ot=(e,n,t)=>B(e,`
      SELECT
        ts,
        offer_id,
        GEOGRAPHY_LONGITUDE(lonlat) AS lon,
        GEOGRAPHY_LATITUDE(lonlat) AS lat
      FROM notifications
      WHERE ts > ?
      ORDER BY ts ASC
      LIMIT ${t}
    `,n),Z=()=>{const e=L(X),{data:n,mutate:t}=qe(["connectionState",e],()=>Jn(e));return C({connected:!1,initialized:!1,reset:t},n)},rt=(()=>{let e={};return n=>(n in e||(e[n]=1),`${n}(${e[n]++})`)})(),ee=(e,{name:n,enabled:t,intervalMS:a})=>{m.exports.useEffect(()=>{if(!t)return;const s=new AbortController,o=rt(n);console.log(`Starting ${o}: tick interval: ${a}ms`);const r=async()=>{try{if(console.time(o),s.signal.aborted)return;await e(s),setTimeout(r,a)}catch(c){if(s.signal.aborted||c instanceof h&&c.isUnknownDatabase()||c instanceof DOMException&&c.name==="AbortError")return;throw c}finally{console.timeEnd(o)}};return r(),()=>{console.log(`Stopping ${o}`),s.abort()}},[t,e,a,n])},ct=1*1e3,lt=()=>{const e=m.exports.useRef();return{subscribe:m.exports.useCallback(n=>{if(e.current)throw new Error("NotificationEmitter already subscribed");e.current=n},[]),unsubscribe:m.exports.useCallback(n=>{e.current===n&&(e.current=void 0)},[]),emit:m.exports.useCallback(n=>{e.current&&e.current(n)},[])}},dt=()=>{const e=L(X),n=L(j),{initialized:t}=Z(),a=m.exports.useRef(new Date().toISOString()),s=pe(kn),{subscribe:o,unsubscribe:r,emit:c}=lt(),u=m.exports.useCallback(async d=>{const E=U(C({},e),{ctx:d}),_=await ot(E,a.current,_e);_.length>0&&(a.current=_[_.length-1][0],s(_),c(_))},[e,s,c]);return ee(u,{name:"Notifications",enabled:t&&n,intervalMS:ct}),{subscribe:o,unsubscribe:r}},ut=({subscribe:e,unsubscribe:n})=>{const t=Qe(({snapshot:a})=>()=>a.getPromise(xe));return m.exports.useCallback(({latLngToPixel:a})=>{console.log("NotificationsRenderer: Setup");const s=new Ie,o=[],r=(d,E)=>{let _=0;const O=1.5,f=new Ie,y=306687,W=306687,b=new he;b.beginFill(y).drawCircle(0,0,5).endFill(),f.addChild(b);const N=new he;N.beginFill(W),N.drawTorus&&N.drawTorus(0,0,4,6),N.endFill(),f.addChild(N),s.addChild(f);const P=A=>{if(_+=A/60,_>O){s.removeChild(f),o.splice(o.indexOf(P),1);return}const p=_%O/O,x=nn(p);N.scale.set(1+x);const I=.4,g=p<I?Je(p/I):1-Ze((p-I)/(1-I));N.alpha=g,p<I?b.alpha=g:b.alpha=1-en((p-I)/(1-I));const[te,R]=a([E,d]);f.x=te,f.y=R};P(0),o.push(P)},c=(d,E,_)=>E<=d.ne[0]&&_<=d.ne[1]&&E>=d.sw[0]&&_>=d.sw[1],u=async d=>{const E=await t();for(const[,,_,O]of d)(!E||c(E,O,_))&&r(_,O)};return e(u),{scene:s,draw(d){for(const E of o)E(d)},destroy(){console.log("NotificationsRenderer: Destroy"),n(u)}}},[t,e,n])},_t=()=>{const e=dt(),n=ut(e);return l(K,{gap:4,justifyContent:"space-between",direction:["column","column","row"],height:"100%",children:[l(k,{spacing:4,flex:"2 2 0",minHeight:"200px",maxHeight:"100%",children:[i(z,{size:"md",children:"Map"}),i($n,{renderer:n})]}),i(k,{spacing:4,flex:"1 1 0",minWidth:"0",children:i(z,{size:"md",children:"Stats"})})]})},ne=({id:e,label:n,placeholder:t,value:a,setValue:s,helpText:o,type:r="text"})=>l(Se,{id:e,children:[i(Le,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:n}),i(mn,{size:"sm",placeholder:t,value:a,onChange:c=>s(c.target.value),type:r}),o?i(Nn,{fontSize:"xs",children:o}):null]}),Et=({isOpen:e,onClose:n,finalFocusRef:t})=>{const[a,s]=w(ye),[o,r]=w(Pe),[c,u]=w(Ue),[d,E]=w(we),[_,O]=w(ve),[f,y]=w(j),W=L(X),{connected:b,initialized:N,reset:P}=Z(),A=re(),[p,x]=tn(),I=M.useRef(null),g=be(),te=m.exports.useCallback(async()=>{const R=f;y(!1),x.on(),await et(W,(G,se)=>{const ie="reset-schema";g.isActive(ie)?g.update(ie,{title:G,status:se,duration:3e3,isClosable:se==="success"}):g({id:ie,title:G,status:se})}),x.off(),A.onClose(),P(),y(R)},[W,P,A,x,g,f,y]);return l(sn,{isOpen:e,placement:"right",onClose:n,finalFocusRef:t,children:[i(Re,{}),l(an,{children:[i(on,{}),i(Oe,{children:"Config"}),i(Ae,{children:l(k,{spacing:4,children:[i(ne,{id:"host",label:"Host & Port",placeholder:"http://127.0.0.1:8808",value:a,setValue:s,helpText:l(H,{children:["The protocol (http, https), host, and port for the SingleStore"," ",l(Y,{isExternal:!0,color:"teal.500",href:"https://docs.singlestore.com/docs/http-api/",children:["HTTP API"," ",i(rn,{bottom:"2px",boxSize:"0.9em",position:"relative"})]}),"."]})}),l(cn,{columns:2,gap:2,children:[i(ne,{id:"user",label:"Username",placeholder:"admin",value:o,setValue:r}),i(ne,{id:"password",label:"Password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:c,setValue:u,type:"password"}),i(ne,{id:"database",label:"Database",placeholder:"s2cellular",value:d,setValue:E}),l(Se,{id:"scaleFactor",children:[i(Le,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Scale Factor"}),i(ln,{size:"sm",required:!0,value:_,onChange:R=>{const G=R.target.value;Qn(G)&&O(G)},children:Object.keys(J).sort().map(R=>i("option",{value:R,children:R},R))})]})]}),l(ce,{status:b?"success":"error",borderRadius:"md",children:[i(le,{}),i(de,{children:b?"connected":"disconnected"})]}),l(ce,{status:N?"success":"warning",borderRadius:"md",children:[i(le,{}),i(de,{children:"schema"}),i(D,{position:"absolute",right:4,top:3,size:"xs",colorScheme:N?"green":"red",disabled:!b,onClick:A.onOpen,children:N?"Reset":"Setup"})]}),l(ce,{status:f?"success":"warning",borderRadius:"md",children:[i(le,{}),i(de,{children:"simulator"}),i(dn,{position:"absolute",right:4,top:3.5,size:"md",colorScheme:f?"green":"red",isChecked:f,disabled:!b||!N,onChange:()=>y(!f)})]})]})}),i(ge,{})]}),i(un,{isOpen:A.isOpen,onClose:A.onClose,closeOnEsc:!1,closeOnOverlayClick:!1,leastDestructiveRef:I,children:i(Re,{children:l(_n,{children:[l(Oe,{fontSize:"lg",fontWeight:"bold",children:[N?"Reset":"Setup"," ",d]}),l(Ae,{children:["This will ",N?"recreate":"create"," database"," ",d,". Are you sure?"]}),l(ge,{children:[i(D,{ref:I,onClick:A.onClose,disabled:p,children:"Cancel"}),i(D,{disabled:p,colorScheme:"red",onClick:te,ml:3,children:p?i(En,{}):"Reset Schema"})]})]})})})]})},mt=({to:e,children:n})=>{const t=On(e),a=An({path:t.pathname,end:!0});return i(Y,{as:Sn,to:e,px:2,py:1,rounded:"md",_hover:{textDecoration:"none",bg:oe("gray.200","gray.700")},fontWeight:a?"bold":"normal",href:"#",children:n})},Nt=()=>{const{colorMode:e,toggleColorMode:n}=Tn(),t=re(),a=re(),s=M.useRef(null),{connected:o,initialized:r}=Z(),c=L(j),u=i(H,{children:i(mt,{to:"/",children:"Dashboard"})});return i(H,{children:l(V,{bg:oe("gray.200","gray.700"),px:4,children:[l(K,{h:16,alignItems:"center",justifyContent:"space-between",children:[i(fn,{size:"md",icon:t.isOpen?i(pn,{}):i(In,{}),"aria-label":"Open Menu",display:{md:"none"},onClick:t.isOpen?t.onClose:t.onOpen}),l(ue,{spacing:8,alignItems:"center",children:[i(z,{size:"lg",children:"S2 Cellular"}),i(ue,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:u})]}),l(K,{alignItems:"center",gap:2,children:[i(D,{size:"sm",ref:s,onClick:a.onOpen,leftIcon:r?i(hn,{}):i(Ce,{}),colorScheme:o?r&&c?"green":"yellow":"red",children:o?r?c?"connected":"simulator disabled":"needs schema":"disconnected"}),i(D,{size:"sm",onClick:n,children:e==="light"?i(bn,{}):i(Rn,{})})]})]}),t.isOpen?i(V,{pb:4,display:{md:"none"},children:i(k,{as:"nav",spacing:4,children:u})}):null,i(Et,{isOpen:a.isOpen,onClose:a.onClose,finalFocusRef:s})]})})},Tt=10*1e3,Be=1*1e3,ft=()=>{const e=L(X),n=L(ve),t=L(j),{initialized:a}=Z(),s=m.exports.useCallback(c=>{const u=U(C({},e),{ctx:c});return Promise.all([nt(u,n),tt(u),st(u,n)])},[e,n]);ee(s,{name:"SimulatorMonitor",enabled:a&&t,intervalMS:Tt});const o=m.exports.useCallback(c=>it(U(C({},e),{ctx:c})),[e]);ee(o,{name:"SimulatorMatcher",enabled:a&&t,intervalMS:Be});const r=m.exports.useCallback(c=>at(U(C({},e),{ctx:c})),[e]);ee(r,{name:"SimulatorUpdateSegments",enabled:a&&t,intervalMS:Be})};function pt(){return ft(),l(K,{height:"100vh",direction:"column",children:[i(Nt,{}),i(V,{m:4,flex:"1",children:i(Ln,{children:i(gn,{path:"/",element:i(_t,{})})})})]})}class It extends M.Component{constructor(){super(void 0);$(this,"state",{});this.handlePromiseRejection=this.handlePromiseRejection.bind(this)}componentDidMount(){window.addEventListener("unhandledrejection",this.handlePromiseRejection)}componentWillUnmount(){window.removeEventListener("unhandledrejection",this.handlePromiseRejection)}handlePromiseRejection(n){this.setState({error:n.reason})}static getDerivedStateFromError(n){return{error:n}}render(){const{error:n}=this.state;if(n){let t;return n instanceof h&&(t=l(H,{children:[i(Cn,{textAlign:"center",children:"An error occurred while running the following query:"}),i(Dn,{display:"block",whiteSpace:["inherit","pre"],p:6,children:yn(n.sql)})]})),i(De,{my:10,children:l(k,{gap:4,maxW:"container.md",children:[i(De,{children:i(Ce,{boxSize:20,color:"red"})}),i(z,{size:"xl",textAlign:"center",children:n.message}),t,l(ue,{justify:"center",gap:4,children:[i(D,{onClick:()=>this.setState({error:void 0}),size:"sm",children:"Dismiss Error"}),i(D,{onClick:()=>window.location.reload(),size:"sm",colorScheme:"blue",leftIcon:i(Pn,{}),children:"Reload"})]})]})})}return this.props.children}}const ht=Un({fonts:{heading:"InterVariable, sans-serif",body:"InterVariable, sans-serif",mono:'"Source Code ProVariable", monospace'}}),bt=({children:e})=>{const n=be();return i(Mn,{value:{onError:a=>{n({title:"An error occurred",description:a.message,status:"error",duration:5e3,isClosable:!0})}},children:e})};wn.render(i(M.StrictMode,{children:i(vn,{theme:ht,children:i(It,{children:i(bt,{children:i(xn,{children:i(Gn,{basename:"/demo-s2cellular/",children:i(pt,{})})})})})})}),document.getElementById("root"));
