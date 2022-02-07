var We=Object.defineProperty,$e=Object.defineProperties;var Ve=Object.getOwnPropertyDescriptors;var Te=Object.getOwnPropertySymbols;var Ye=Object.prototype.hasOwnProperty,Ke=Object.prototype.propertyIsEnumerable;var re=(e,n,t)=>n in e?We(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,D=(e,n)=>{for(var t in n||(n={}))Ye.call(n,t)&&re(e,t,n[t]);if(Te)for(var t of Te(n))Ke.call(n,t)&&re(e,t,n[t]);return e},U=(e,n)=>$e(e,Ve(n));var $=(e,n,t)=>(re(e,typeof n!="symbol"?n+"":n,t),t);import{R as S,a as fe,b as ze,r as m,c as be,j as i,B as V,M as Xe,u as ce,d as B,A as je,e as l,F,L as Y,s as qe,f as L,g as Je,C as pe,h as Qe,G as he,i as Ze,l as en,k as nn,q as tn,m as K,S as v,H as z,n as x,o as le,p as sn,t as Ie,D as an,v as Re,w as on,x as rn,y as Oe,z as Ae,E as cn,I as ln,J as Se,K as Le,N as dn,O as de,P as _e,Q as ue,T as g,U as _n,V as ge,W as un,X as En,Y as Nn,Z as mn,_ as Tn,$ as fn,a0 as bn,a1 as pn,a2 as hn,a3 as Ee,a4 as In,a5 as Ce,a6 as Rn,a7 as On,a8 as An,a9 as Sn,aa as Ln,ab as gn,ac as Cn,ad as Dn,ae as yn,af as wn,ag as De,ah as Pn,ai as Un,aj as vn,ak as xn,al as Gn,am as Mn,an as Hn}from"./vendor.dff0e227.js";const kn=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};kn();const G=()=>({setSelf:e,onSet:n,node:t})=>{const a=`recoil.localstorage.${t.key}`,s=localStorage.getItem(a);s!=null&&e(JSON.parse(s)),n((o,r,c)=>{c?localStorage.removeItem(a):localStorage.setItem(a,JSON.stringify(o))})},ye=S({key:"connectionHost",default:"http://127.0.0.1",effects_UNSTABLE:[G()]}),we=S({key:"connectionUser",default:"root",effects_UNSTABLE:[G()]}),Pe=S({key:"connectionPassword",default:"",effects_UNSTABLE:[G()]}),Ue=S({key:"connectionDatabase",default:"s2cellular",effects_UNSTABLE:[G()]}),X=fe({key:"connectionConfig",get:({get:e})=>{const n=e(ye),t=e(we),a=e(Pe),s=e(Ue);return{host:n,user:t,password:a,database:s}},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),ve=S({key:"configScaleFactor",default:"small",effects_UNSTABLE:[G()]}),j=S({key:"simulatorEnabled",default:!0,effects_UNSTABLE:[G()]}),Ne=100,q=S({key:"notificationsBuffer",default:[]}),Bn=fe({key:"notifications",get:({get:e})=>e(q),set:({set:e,get:n},t)=>{if(t instanceof ze)return e(q,[]);const s=[...n(q),...t];s.length>Ne&&s.splice(0,s.length-Ne),e(q,s)},cachePolicy_UNSTABLE:{eviction:"most-recent"}}),xe=S({key:"mapBounds",default:void 0}),Fn=e=>(n,t,a,s=1)=>`https://a.basemaps.cartocdn.com/${e}/${a}/${n}/${t}${s>=2?"@2x":""}.png`,Wn=[40.756480069543976,-73.95583135057566],$n=({mapState:e,latLngToPixel:n,renderer:t})=>{const a=B.useRef(null),{width:s,height:o}=e||{width:0,height:0};return m.exports.useLayoutEffect(()=>{if(!a.current)throw new Error("No canvas ref");if(s<=0||o<=0||!n)return;console.log("PixiMapLayer: Setup");const r=new je({view:a.current,width:s,height:o,backgroundAlpha:0,antialias:!0}),{scene:c,draw:d,destroy:_}=t({width:s,height:o,latLngToPixel:n});return r.stage.addChild(c),r.ticker.add(N=>{d(N)}),()=>{console.log("PixiMapLayer: Destroy"),_(),r.destroy(!1,{children:!0,texture:!0,baseTexture:!0})}},[s,o,n,t]),i("canvas",{ref:a})},Vn=({renderer:e})=>{const[n,t]=m.exports.useState(Wn),[a,s]=m.exports.useState(12),o=be(xe),r=l(F,{children:["\xA9 ",i(Y,{href:"https://osm.org",children:"OpenStreetMap"})," contributors, \xA9"," ",i(Y,{href:"https://carto.com/about-carto/",children:"CARTO"})]});return i(V,{borderRadius:"lg",overflow:"hidden",height:"100%",children:i(Xe,{dprs:[1,2],provider:Fn(ce("light_all","dark_all")),maxZoom:20,center:n,zoom:a,onBoundsChanged:({center:c,zoom:d,bounds:_})=>{t(c),s(d),o(_)},attribution:r,children:i($n,{renderer:e})})})},Yn=/^Error (?<code>\d+):/;class h extends Error{constructor(n,t,a){super(n);$(this,"code");$(this,"sql");var s;if(Object.setPrototypeOf(this,h.prototype),this.sql=t,a)this.code=a;else{const o=n.match(Yn);this.code=o?parseInt(((s=o.groups)==null?void 0:s.code)||"-1",10):-1}}isUnknownDatabase(){return this.code===1049}isDatabaseRecovering(){return this.code===2269}}const Kn=async(e,n,...t)=>{const a=await J(e,n,...t);if(a.length!==1)throw new h("Expected exactly one row",n);return a[0]},J=async(e,n,...t)=>{const a=await Q("query/rows",e,n,...t);if(a.results.length!==1)throw new h("Expected exactly one result set",n);return a.results[0].rows},W=async(e,n,...t)=>{const a=await Q("query/tuples",e,n,...t);if(a.results.length!==1)throw new h("Expected exactly one result set",n);return a.results[0].rows},Ge=(e,n,...t)=>Q("exec",U(D({},e),{database:void 0}),n,...t),E=(e,n,...t)=>Q("exec",e,n,...t),Q=async(e,n,t,...a)=>{var r;const s=await fetch(`${n.host}/api/v1/${e}`,{method:"POST",signal:(r=n.ctx)==null?void 0:r.signal,headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${n.user}:${n.password}`)}`},body:JSON.stringify({sql:t,args:a,database:n.database})});if(!s.ok)throw new h(await s.text(),t);const o=await s.json();if(o.error)throw new h(o.error.message,t,o.error.code);return o},me=e=>`POLYGON((${e.map(t=>`${t[0]} ${t[1]}`).join(",")}))`;var Me=[{name:"date_sub_dynamic",createStmt:`CREATE OR REPLACE FUNCTION date_sub_dynamic (
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
);`}];const zn=`CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,Xn=({interval:e,kind:n,value:t})=>{const a=qe(`${e}-${n}-${t}`);return{id:a,sql:`
      REPLACE INTO segments VALUES
        ('${a}', '${e}', '${n}', '${t}')
    `}};let jn=0;const y=(e,n,t,a)=>{const s=jn++,o=a.map(Xn);return[o.map(({sql:r})=>r),`
    REPLACE INTO offers SET
      offer_id = ${s},
      customer_id = 0,
      enabled = true,

      notification_zone = '${t}',
      segment_ids = '${JSON.stringify(o.map(r=>r.id))}',

      notification_content = '${n}',
      notification_target = 'example.com?offerId=${s}',

      maximum_bid_cents = ${e}
    `]},Z=me([[-73.9582079,40.8019855],[-73.9827617,40.7683217],[-73.972116,40.7636412],[-73.9470472,40.7978272],[-73.9582079,40.8019855]]),qn=me([[-73.9997423,40.7337629],[-74.0031335,40.7281694],[-73.9966516,40.7252749],[-73.991801,40.7308361],[-73.9997423,40.7337629]]),Be=me([[-74.4468984,40.4781127],[-74.4497744,40.472612],[-74.4413824,40.4664579],[-74.4346859,40.469233],[-74.4468984,40.4781127]]),Jn=["REPLACE INTO cities VALUES (0, 'new york', 'POINT(-74.006 40.7128)', 0.5)","REPLACE INTO customers VALUES (0, 's2cellular')",y(10,"10% off",Z,[{interval:"hour",kind:"olc_8",value:"87G7JXR8"}]),y(5,"Skyvu 10% off",Z,[{interval:"week",kind:"purchase",value:"Skyvu"},{interval:"hour",kind:"request",value:"skyvu.org"}]),y(5,"Topicshots 10% off",Z,[{interval:"hour",kind:"olc_8",value:"87G7JXR8"},{interval:"hour",kind:"request",value:"topicshots.biz"}]),y(5,"Feedmix 10% off",qn,[{interval:"minute",kind:"olc_6",value:"87G8P2"},{interval:"week",kind:"purchase",value:"Feedmix"}]),y(3,"10% off everything!",Z,[{interval:"week",kind:"olc_6",value:"87G8Q2"}]),"REPLACE INTO cities VALUES (1, 'new brunswick', 'POINT(-74.451813 40.485687)', 0.5)",y(10,"10% off",Be,[{interval:"hour",kind:"olc_6",value:"87G7FG"},{interval:"week",kind:"purchase",value:"Skyvu"}]),y(3,"sales bonanza!!!",Be,[{interval:"week",kind:"olc_6",value:"87G7FH"}])].flat(5),ee={small:{maxRows:5e7,prefix:"v1/100k-16"},medium:{maxRows:1e8,prefix:"v1/1m-32"},large:{maxRows:1e9,prefix:"v1/10m-80"}},Qn=e=>Object.keys(ee).includes(e),Zn=async e=>{try{return{connected:!0,initialized:await et(e)}}catch{return{connected:!1}}},et=async e=>{try{const n=(await W(e,"SHOW TABLES")).map(s=>s[0]).sort(),t=(await W(e,"SHOW PROCEDURES")).map(s=>s[0]).sort(),a=(await W(e,"SHOW FUNCTIONS")).map(s=>s[0]).sort();return ke.every(({name:s})=>n.includes(s))&&He.every(({name:s})=>t.includes(s))&&Me.every(({name:s})=>a.includes(s))}catch(n){if(n instanceof h&&(n.isUnknownDatabase()||n.isDatabaseRecovering()))return!1;throw n}},nt=async(e,n)=>{n("Dropping existing schema","info"),await Ge(e,"DROP DATABASE IF EXISTS `"+e.database+"`"),n("Creating database","info"),await Ge(e,"CREATE DATABASE `"+e.database+"`");for(const t of Me)n(`Creating function: ${t.name}`,"info"),await E(e,t.createStmt);for(const t of ke)n(`Creating table: ${t.name}`,"info"),await E(e,t.createStmt);for(const t of He)n(`Creating procedure: ${t.name}`,"info"),await E(e,t.createStmt);await E(e,zn),await Fe(e),n("Schema initialized","success")},Fe=async e=>{for(const n of Jn)await E(e,n)},tt=async(e,n)=>{const t=ee[n].prefix,a=await J(e,`
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
    `,e.database||"s2cellular");await Promise.all(a.map(async s=>{console.log(`recreating pipeline ${s.pipelineName} for city ${s.cityName}`),s.pipelineName.startsWith("locations_")?await E(e,`
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
          `,s.cityId,s.lon,s.diameter,s.lat,s.diameter):s.pipelineName.startsWith("requests_")?await E(e,`
            CREATE OR REPLACE PIPELINE ${s.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${t}/requests.*'
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,s.cityId):s.pipelineName.startsWith("purchases_")&&await E(e,`
            CREATE OR REPLACE PIPELINE ${s.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${t}/purchases.*'
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,s.cityId),await E(e,`ALTER PIPELINE ${s.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await E(e,`START PIPELINE IF NOT RUNNING ${s.pipelineName}`)}))},st=async e=>{const n=await W(e,`
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
    `,e.database||"s2cellular");await Promise.all(n.map(async([t])=>{console.log("restarting pipeline",t),await E(e,`ALTER PIPELINE ${t} SET OFFSETS EARLIEST DROP ORPHAN FILES`),await E(e,`START PIPELINE IF NOT RUNNING ${t}`)}))},it=async e=>{const n=await J(e,`
      SELECT plan_id AS planId
      FROM information_schema.plancache
      WHERE plan_warnings LIKE "%empty tables%";
    `);await Promise.all(n.map(({planId:t})=>E(e,`DROP ${t} FROM PLANCACHE`)))},at=async(e,n)=>{const{maxRows:t}=ee[n],a=await J(e,`
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
    `,e.database||"s2cellular");await Promise.all(a.map(async({name:s,count:o})=>{const r=o-t,{ts:c,cumulative_count:d}=await Kn(e,`
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
        `,e.database||"s2cellular",s);c!==null&&(console.log(`removing ${d} rows from ${s} older than ${c}`),await E(e,`DELETE FROM ${s} WHERE ts <= ?`,c))}))},ot=e=>E(e,"CALL run_matching_process()"),rt=e=>E(e,"CALL update_segments()"),ct=(e,n,t)=>W(e,`
      SELECT
        ts,
        offer_id,
        GEOGRAPHY_LONGITUDE(lonlat) AS lon,
        GEOGRAPHY_LATITUDE(lonlat) AS lat
      FROM notifications
      WHERE ts > ?
      ORDER BY ts ASC
      LIMIT ${t}
    `,n),ne=()=>{const e=L(X),{data:n,mutate:t}=Je(["connectionState",e],()=>Zn(e));return D({connected:!1,initialized:!1,reset:t},n)},lt=(()=>{let e={};return n=>(n in e||(e[n]=1),`${n}(${e[n]++})`)})(),te=(e,{name:n,enabled:t,intervalMS:a})=>{m.exports.useEffect(()=>{if(!t)return;const s=new AbortController,o=lt(n);console.log(`Starting ${o}: tick interval: ${a}ms`);const r=async()=>{try{if(console.time(o),s.signal.aborted)return;const c=+Date.now();await e(s);const d=+Date.now()-c;setTimeout(r,Math.max(0,a-d))}catch(c){if(s.signal.aborted||c instanceof h&&c.isUnknownDatabase()||c instanceof DOMException&&c.name==="AbortError")return;throw c}finally{console.timeEnd(o)}};return r(),()=>{console.log(`Stopping ${o}`),s.abort()}},[t,e,a,n])},dt=1*1e3,_t=()=>{const e=m.exports.useRef();return{subscribe:m.exports.useCallback(n=>{if(e.current)throw new Error("NotificationEmitter already subscribed");e.current=n},[]),unsubscribe:m.exports.useCallback(n=>{e.current===n&&(e.current=void 0)},[]),emit:m.exports.useCallback(n=>{e.current&&e.current(n)},[])}},ut=()=>{const e=L(X),n=L(j),{initialized:t}=ne(),a=m.exports.useRef(new Date().toISOString()),s=be(Bn),{subscribe:o,unsubscribe:r,emit:c}=_t(),d=m.exports.useCallback(async _=>{const N=U(D({},e),{ctx:_}),u=await ct(N,a.current,Ne);u.length>0&&(a.current=u[u.length-1][0],s(u),c(u))},[e,s,c]);return te(d,{name:"Notifications",enabled:t&&n,intervalMS:dt}),{subscribe:o,unsubscribe:r}},Et=({subscribe:e,unsubscribe:n})=>{const t=Qe(({snapshot:a})=>()=>a.getPromise(xe));return m.exports.useCallback(({latLngToPixel:a})=>{console.log("NotificationsRenderer: Setup");const s=new pe,o=[],r=(_,N)=>{let u=0;const O=1.5,f=new pe,w=306687,M=306687,I=new he;I.beginFill(w).drawCircle(0,0,5).endFill(),f.addChild(I);const T=new he;T.beginFill(M),T.drawTorus&&T.drawTorus(0,0,4,6),T.endFill(),f.addChild(T),s.addChild(f);const P=A=>{if(u+=A/60,u>O){s.removeChild(f),o.splice(o.indexOf(P),1);return}const b=u%O/O,H=tn(b);T.scale.set(1+H);const p=.4,C=b<p?Ze(b/p):1-en((b-p)/(1-p));T.alpha=C,b<p?I.alpha=C:I.alpha=1-nn((b-p)/(1-p));const[ie,R]=a([N,_]);f.x=ie,f.y=R};P(0),o.push(P)},c=(_,N,u)=>N<=_.ne[0]&&u<=_.ne[1]&&N>=_.sw[0]&&u>=_.sw[1],d=async _=>{const N=await t();for(const[,,u,O]of _)(!N||c(N,O,u))&&r(u,O)};return e(d),{scene:s,draw(_){for(const N of o)N(_)},destroy(){console.log("NotificationsRenderer: Destroy"),n(d)}}},[t,e,n])},Nt=()=>{const e=ut(),n=Et(e);return l(K,{gap:4,justifyContent:"space-between",direction:["column","column","row"],height:"100%",children:[l(v,{spacing:4,flex:"2 2 0",minHeight:"200px",maxHeight:"100%",children:[i(z,{size:"md",children:"Map"}),i(Vn,{renderer:n})]}),i(v,{spacing:4,flex:"1 1 0",minWidth:"0",children:i(z,{size:"md",children:"Stats"})})]})},se=({id:e,label:n,placeholder:t,value:a,setValue:s,helpText:o,type:r="text"})=>l(Se,{id:e,children:[i(Le,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:n}),i(mn,{size:"sm",placeholder:t,value:a,onChange:c=>s(c.target.value),type:r}),o?i(Tn,{fontSize:"xs",children:o}):null]}),mt=({isOpen:e,onClose:n,finalFocusRef:t})=>{const[a,s]=x(ye),[o,r]=x(we),[c,d]=x(Pe),[_,N]=x(Ue),[u,O]=x(ve),[f,w]=x(j),M=L(X),{connected:I,initialized:T,reset:P}=ne(),A=le(),[b,H]=sn(),p=B.useRef(null),C=Ie(),ie=m.exports.useCallback(async()=>{const R=f;w(!1),H.on(),await nt(M,(k,ae)=>{const oe="reset-schema";C.isActive(oe)?C.update(oe,{title:k,status:ae,duration:3e3,isClosable:ae==="success"}):C({id:oe,title:k,status:ae})}),H.off(),A.onClose(),P(),w(R)},[M,P,A,H,C,f,w]);return l(an,{isOpen:e,placement:"right",onClose:n,finalFocusRef:t,children:[i(Re,{}),l(on,{children:[i(rn,{}),i(Oe,{children:"Config"}),i(Ae,{children:l(v,{spacing:4,children:[i(se,{id:"host",label:"Host & Port",placeholder:"http://127.0.0.1:8808",value:a,setValue:s,helpText:l(F,{children:["The protocol (http, https), host, and port for the SingleStore"," ",l(Y,{isExternal:!0,color:"teal.500",href:"https://docs.singlestore.com/docs/http-api/",children:["HTTP API"," ",i(cn,{bottom:"2px",boxSize:"0.9em",position:"relative"})]}),"."]})}),l(ln,{columns:2,gap:2,children:[i(se,{id:"user",label:"Username",placeholder:"admin",value:o,setValue:r}),i(se,{id:"password",label:"Password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:c,setValue:d,type:"password"}),i(se,{id:"database",label:"Database",placeholder:"s2cellular",value:_,setValue:N}),l(Se,{id:"scaleFactor",children:[i(Le,{mb:1,fontSize:"xs",fontWeight:"bold",textTransform:"uppercase",children:"Scale Factor"}),i(dn,{size:"sm",required:!0,value:u,onChange:R=>{const k=R.target.value;Qn(k)&&O(k)},children:Object.keys(ee).sort().map(R=>i("option",{value:R,children:R},R))})]})]}),l(de,{status:I?"success":"error",borderRadius:"md",children:[i(_e,{}),i(ue,{children:I?"connected":"disconnected"})]}),l(de,{status:T?"success":"warning",borderRadius:"md",children:[i(_e,{}),i(ue,{children:"schema"}),i(g,{position:"absolute",right:4,top:3,size:"xs",colorScheme:T?"green":"red",disabled:!I,onClick:A.onOpen,children:T?"Reset":"Setup"})]}),l(de,{status:f?"success":"warning",borderRadius:"md",children:[i(_e,{}),i(ue,{children:"simulator"}),i(_n,{position:"absolute",right:4,top:3.5,size:"md",colorScheme:f?"green":"red",isChecked:f,disabled:!I||!T,onChange:()=>w(!f)})]}),i(v,{children:i(g,{size:"sm",onClick:()=>Fe(M),children:"Update seed data"})})]})}),i(ge,{})]}),i(un,{isOpen:A.isOpen,onClose:A.onClose,closeOnEsc:!1,closeOnOverlayClick:!1,leastDestructiveRef:p,children:i(Re,{children:l(En,{children:[l(Oe,{fontSize:"lg",fontWeight:"bold",children:[T?"Reset":"Setup"," ",_]}),l(Ae,{children:["This will ",T?"recreate":"create"," database"," ",_,". Are you sure?"]}),l(ge,{children:[i(g,{ref:p,onClick:A.onClose,disabled:b,children:"Cancel"}),i(g,{disabled:b,colorScheme:"red",onClick:ie,ml:3,children:b?i(Nn,{}):"Reset Schema"})]})]})})})]})},Tt=({to:e,children:n})=>{const t=An(e),a=Sn({path:t.pathname,end:!0});return i(Y,{as:Ln,to:e,px:2,py:1,rounded:"md",_hover:{textDecoration:"none",bg:ce("gray.200","gray.700")},fontWeight:a?"bold":"normal",href:"#",children:n})},ft=()=>{const{colorMode:e,toggleColorMode:n}=fn(),t=le(),a=le(),s=B.useRef(null),{connected:o,initialized:r}=ne(),c=L(j),d=i(F,{children:i(Tt,{to:"/",children:"Dashboard"})});return i(F,{children:l(V,{bg:ce("gray.200","gray.700"),px:4,children:[l(K,{h:16,alignItems:"center",justifyContent:"space-between",children:[i(bn,{size:"md",icon:t.isOpen?i(pn,{}):i(hn,{}),"aria-label":"Open Menu",display:{md:"none"},onClick:t.isOpen?t.onClose:t.onOpen}),l(Ee,{spacing:8,alignItems:"center",children:[i(z,{size:"lg",children:"S2 Cellular"}),i(Ee,{as:"nav",spacing:4,display:{base:"none",md:"flex"},children:d})]}),l(K,{alignItems:"center",gap:2,children:[i(g,{size:"sm",ref:s,onClick:a.onOpen,leftIcon:r?i(In,{}):i(Ce,{}),colorScheme:o?r&&c?"green":"yellow":"red",children:o?r?c?"connected":"simulator disabled":"needs schema":"disconnected"}),i(g,{size:"sm",onClick:n,children:e==="light"?i(Rn,{}):i(On,{})})]})]}),t.isOpen?i(V,{pb:4,display:{md:"none"},children:i(v,{as:"nav",spacing:4,children:d})}):null,i(mt,{isOpen:a.isOpen,onClose:a.onClose,finalFocusRef:s})]})})},bt=10*1e3,pt=1*1e3,ht=10*1e3,It=()=>{const e=L(X),n=L(ve),t=L(j),{initialized:a}=ne(),s=m.exports.useCallback(c=>{const d=U(D({},e),{ctx:c});return Promise.all([tt(d,n),st(d),at(d,n),it(d)])},[e,n]);te(s,{name:"SimulatorMonitor",enabled:a&&t,intervalMS:bt});const o=m.exports.useCallback(c=>ot(U(D({},e),{ctx:c})),[e]);te(o,{name:"SimulatorMatcher",enabled:a&&t,intervalMS:pt});const r=m.exports.useCallback(c=>rt(U(D({},e),{ctx:c})),[e]);te(r,{name:"SimulatorUpdateSegments",enabled:a&&t,intervalMS:ht})};function Rt(){return It(),l(K,{height:"100vh",direction:"column",children:[i(ft,{}),i(V,{m:4,flex:"1",children:i(gn,{children:i(Cn,{path:"/",element:i(Nt,{})})})})]})}class Ot extends B.Component{constructor(){super(void 0);$(this,"state",{});this.handlePromiseRejection=this.handlePromiseRejection.bind(this)}componentDidMount(){window.addEventListener("unhandledrejection",this.handlePromiseRejection)}componentWillUnmount(){window.removeEventListener("unhandledrejection",this.handlePromiseRejection)}handlePromiseRejection(n){this.setState({error:n.reason})}static getDerivedStateFromError(n){return{error:n}}render(){const{error:n}=this.state;if(n){let t;return n instanceof h&&(t=l(F,{children:[i(Dn,{textAlign:"center",children:"An error occurred while running the following query:"}),i(yn,{display:"block",whiteSpace:["inherit","pre"],p:6,children:wn(n.sql)})]})),i(De,{my:10,children:l(v,{gap:4,maxW:"container.md",children:[i(De,{children:i(Ce,{boxSize:20,color:"red"})}),i(z,{size:"xl",textAlign:"center",children:n.message}),t,l(Ee,{justify:"center",gap:4,children:[i(g,{onClick:()=>this.setState({error:void 0}),size:"sm",children:"Dismiss Error"}),i(g,{onClick:()=>window.location.reload(),size:"sm",colorScheme:"blue",leftIcon:i(Pn,{}),children:"Reload"})]})]})})}return this.props.children}}const At=Un({fonts:{heading:"InterVariable, sans-serif",body:"InterVariable, sans-serif",mono:'"Source Code ProVariable", monospace'}}),St=({children:e})=>{const n=Ie();return i(Hn,{value:{onError:a=>{n({title:"An error occurred",description:a.message,status:"error",duration:5e3,isClosable:!0})}},children:e})};vn.render(i(B.StrictMode,{children:i(xn,{theme:At,children:i(Ot,{children:i(St,{children:i(Gn,{children:i(Mn,{basename:"/demo-s2cellular/",children:i(Rt,{})})})})})})}),document.getElementById("root"));
