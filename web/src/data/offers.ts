import OpenLocationCode from "open-location-code-typescript";
import { Bounds, Point } from "pigeon-maps";
import stringHash from "string-hash";

import { ConnectionConfig, Exec } from "@/data/client";
import { compileInsert, InsertStatement } from "@/data/sqlgen";
import { boundsToWKTPolygon } from "@/geo";
import {
  randomChoice,
  randomFloatInRange,
  randomIntegerInRange,
  randomVendor,
  Vendor,
} from "@/rand";
import VENDORS from "@/static-data/vendors.json";

export const DEFAULT_CITY = {
  id: 120658,
  name: "New York City",
  lonlat: [-73.993562, 40.727063] as Point,
  diameter: 0.04,
};

const MAX_OFFERS_PER_BATCH = 500;

export type CityConfig = {
  id: number;
  name: string;
  lonlat: Point;
  diameter: number;
};

export const createCity = (config: ConnectionConfig, city: CityConfig) =>
  Exec(
    config,
    `
      INSERT INTO cities (city_id, city_name, center, diameter)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        city_name = VALUES(city_name),
        center = VALUES(center),
        diameter = VALUES(diameter)
    `,
    city.id,
    city.name,
    `POINT(${city.lonlat[0]} ${city.lonlat[1]})`,
    city.diameter
  );

export const removeCity = (config: ConnectionConfig, cityId: number) =>
  Exec(config, "DELETE FROM cities WHERE city_id = ?", cityId);

export const SegmentKinds = ["olc_8", "purchase", "request"] as const;
export type SegmentKind = (typeof SegmentKinds)[number];

export const SegmentIntervals = [
  "minute",
  "hour",
  "day",
  "week",
  "month",
] as const;
export type SegmentInterval = (typeof SegmentIntervals)[number];

export type Segment = {
  interval: SegmentInterval;
  kind: SegmentKind;
  value: string;
};

export const segmentId = ({ interval, kind, value }: Segment) =>
  stringHash(`${interval}-${kind}-${value}`);

export const createSegments = async (
  config: ConnectionConfig,
  segments: Segment[]
) => {
  const { sql, params } = compileInsert({
    table: "segments",
    options: { replace: true },
    columns: ["segment_id", "valid_interval", "filter_kind", "filter_value"],
    tuples: segments.map((segment) => [
      segmentId(segment),
      segment.interval,
      segment.kind,
      segment.value,
    ]),
  });

  await Exec(config, sql, ...params);
};

export type Offer = {
  customer: string;
  segments: Segment[];

  // should be a WKT polygon
  notificationZone: string;

  notificationContent: string;
  notificationTarget: string;
  maximumBidCents: number;
};

export const createOffers = async (
  config: ConnectionConfig,
  offers: Offer[]
) => {
  const stmt: InsertStatement = {
    table: "offers",
    options: { replace: true },
    columns: [
      "customer",
      "notification_zone",
      "segment_ids",
      "notification_content",
      "notification_target",
      "maximum_bid_cents",
    ],
    tuples: [],
  };

  let numOffers = 0;
  let segments: Segment[] = [];

  const commitBatch = async () => {
    const { sql, params } = compileInsert(stmt);
    await Promise.all([
      Exec(config, sql, ...params),
      createSegments(config, segments),
    ]);

    stmt.tuples = [];
    segments = [];
    numOffers = 0;
  };

  for (const offer of offers) {
    stmt.tuples.push([
      offer.customer,
      offer.notificationZone,
      JSON.stringify(offer.segments.map(segmentId)),
      offer.notificationContent,
      offer.notificationTarget,
      offer.maximumBidCents,
    ]);

    numOffers++;
    segments = segments.concat(offer.segments);

    if (numOffers >= MAX_OFFERS_PER_BATCH) {
      await commitBatch();
    }
  }

  if (numOffers > 0) {
    await commitBatch();
  }
};

const randomSegmentKind = () => randomChoice(SegmentKinds);
const randomSegmentInterval = () => randomChoice(SegmentIntervals);

const vendorDomain = ({ vendor, tld }: (typeof VENDORS)[number]) =>
  `${vendor.toLowerCase()}.${tld}`;

const randomPointInCity = (city: CityConfig): Point => {
  const [lon, lat] = city.lonlat;
  const radius = city.diameter / 2;
  const [minLon, maxLon] = [lon - radius, lon + radius];
  const [minLat, maxLat] = [lat - radius, lat + radius];
  return [
    randomFloatInRange(minLon, maxLon),
    randomFloatInRange(minLat, maxLat),
  ];
};

export const randomSegment = (city: CityConfig, vendor: Vendor): Segment => {
  const kind = randomSegmentKind();
  const interval = randomSegmentInterval();
  switch (kind) {
    case "olc_8": {
      const [lon, lat] = randomPointInCity(city);
      const olc = OpenLocationCode.encode(lat, lon, 8).substring(0, 8);
      return {
        kind,
        interval,
        value: olc,
      };
    }
    case "purchase":
      return {
        kind,
        interval,
        value: vendor.vendor,
      };
    case "request":
      return {
        kind,
        interval,
        value: vendorDomain(vendor),
      };
  }
};

export const randomOffer = (city: CityConfig): Offer => {
  const numSegments = randomIntegerInRange(1, 3);
  const vendor = randomVendor();

  const segments = Array.from({ length: numSegments }, () =>
    randomSegment(city, vendor)
  );

  const domain = vendorDomain(vendor);
  const pctOff = randomIntegerInRange(10, 50);
  const notificationContent = `${pctOff}% off at ${vendor.vendor}`;
  const notificationTarget = domain;

  const [lon, lat] = randomPointInCity(city);
  const olc = OpenLocationCode.encode(lat, lon, 8);
  const area = OpenLocationCode.decode(olc);
  const bounds = {
    ne: [area.latitudeHi, area.longitudeHi],
    sw: [area.latitudeLo, area.longitudeLo],
  } as Bounds;

  return {
    customer: vendor.vendor,
    segments,
    notificationZone: boundsToWKTPolygon(bounds),
    notificationContent,
    notificationTarget,
    maximumBidCents: randomIntegerInRange(2, 15),
  };
};

export const randomOffers = (city: CityConfig, numOffers: number) =>
  Array.from({ length: numOffers }, () => randomOffer(city));
