// these files are parsed at build time in vite.config.js
import { polygonToSQL } from "@/geo";
import FUNCTIONS from "@/sql/functions.sql";
import PROCEDURES from "@/sql/procedures.sql";
import TABLES from "@/sql/schema.sql";
import NYC_POLYGONS from "nyc_polygons.json";
import stringHash from "string-hash";

export { FUNCTIONS, PROCEDURES, TABLES };

export const S3_LINK = `CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`;

const CENTRAL_PARK = polygonToSQL([
  [-73.9582079, 40.8019855],
  [-73.9827617, 40.7683217],
  [-73.972116, 40.7636412],
  [-73.9470472, 40.7978272],
  [-73.9582079, 40.8019855],
]);

const WASHINGTON_SQUARE = polygonToSQL([
  [-73.9997423, 40.7337629],
  [-74.0031335, 40.7281694],
  [-73.9966516, 40.7252749],
  [-73.991801, 40.7308361],
  [-73.9997423, 40.7337629],
]);

type Segment = {
  interval: "minute" | "hour" | "day" | "week" | "month";
  kind: "olc_8" | "olc_6" | "purchase" | "request";
  value: string;
};

const defineSegment = ({ interval, kind, value }: Segment) => {
  const id = stringHash(`${interval}-${kind}-${value}`);

  return {
    id,
    sql: `
      REPLACE INTO segments VALUES
        ('${id}', '${interval}', '${kind}', '${value}')
    `,
  };
};

let nextOfferId = 0;
const defineOffer = (
  bidCents: number,
  message: string,
  zone: string,
  segments: Segment[]
) => {
  const id = nextOfferId++;
  const segmentQueries = segments.map(defineSegment);
  return [
    segmentQueries.map(({ sql }) => sql),
    `
    REPLACE INTO offers SET
      offer_id = ${id},
      customer_id = 0,
      enabled = true,

      notification_zone = '${zone}',
      segment_ids = '${JSON.stringify(segmentQueries.map((s) => s.id))}',

      notification_content = '${message}',
      notification_target = 'example.com?offerId=${id}',

      maximum_bid_cents = ${bidCents}
    `,
  ];
};

export const SEED_DATA = [
  "REPLACE INTO cities VALUES (0, 'new york', 'POINT(-74.006 40.7128)', 0.5)",
  "REPLACE INTO customers VALUES (0, 's2cellular')",

  defineOffer(10, "10% off", CENTRAL_PARK, [
    { interval: "hour", kind: "olc_8", value: "87G7JXR8" },
  ]),
  defineOffer(5, "Skyvu 10% off", CENTRAL_PARK, [
    { interval: "week", kind: "purchase", value: "Skyvu" },
    { interval: "hour", kind: "request", value: "skyvu.org" },
  ]),
  defineOffer(5, "Topicshots 10% off", CENTRAL_PARK, [
    { interval: "hour", kind: "olc_8", value: "87G7JXR8" },
    { interval: "hour", kind: "request", value: "topicshots.biz" },
  ]),
  defineOffer(5, "Feedmix 10% off", WASHINGTON_SQUARE, [
    { interval: "minute", kind: "olc_6", value: "87G8P2" },
    { interval: "week", kind: "purchase", value: "Feedmix" },
  ]),
  defineOffer(3, "10% off everything!", CENTRAL_PARK, [
    { interval: "week", kind: "olc_6", value: "87G8Q2" },
  ]),

  NYC_POLYGONS.map((poly) =>
    defineOffer(8, "10% off nyc neighborhood", poly, [
      { interval: "week", kind: "olc_6", value: "87G8P2" },
    ])
  ),
].flat(5);
