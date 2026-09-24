import { describe, it, expect } from "vitest";
import { extractEntitiesFromText } from "./analystClient";

const TABLE_PAYLOAD = {
  type: "table" as const,
  title: "Top Subscriber Segments by Campaign Impressions (Top 10)",
  columns: [
    { name: "Breakdown Type", type: "object" },
    { name: "Breakdown", type: "object" },
    { name: "Impressions", type: "int64" },
    { name: "Active Campaigns", type: "int64" },
    { name: "Conversions", type: "int64" },
  ],
  table_data: [
    ["Subscriber Segment", "olc_8:87G7PX8X", 1646, 5, 0],
    ["Subscriber Segment", "request:babbleblab.net", 1468, 4, 0],
  ],
};

const CHART_PAYLOAD = {
  type: "chart" as const,
  chart_type: "bar",
  title: "Impressions by Segment",
  format: "plotly",
  figure: { data: [{ x: ["a"], y: [1], type: "bar" }], layout: {} },
};

describe("extractEntitiesFromText", () => {
  it("extracts a spaced-key table and removes it from cleanText", () => {
    const json = JSON.stringify(TABLE_PAYLOAD).replace(
      '{"type":"table"',
      '{"type": "table"'
    );
    const text = `Here is your data:\n${json}\nLet me know if you have questions.`;
    const { cleanText, extractedTables, extractedCharts } =
      extractEntitiesFromText(text);

    expect(extractedTables).toHaveLength(1);
    expect(extractedTables[0].title).toBe(TABLE_PAYLOAD.title);
    expect(extractedTables[0].table_data).toHaveLength(2);
    expect(extractedCharts).toHaveLength(0);
    expect(cleanText).not.toContain('"type"');
    expect(cleanText).toContain("Here is your data:");
  });

  it("extracts a compact-key table (no space after colon)", () => {
    const json = JSON.stringify(TABLE_PAYLOAD);
    expect(json).toContain('"type":"table"');
    const { cleanText, extractedTables } = extractEntitiesFromText(json);

    expect(extractedTables).toHaveLength(1);
    expect(cleanText).toBe("");
  });

  it("does not leave raw table JSON in cleanText", () => {
    const json = JSON.stringify(TABLE_PAYLOAD);
    const text = `Some preamble. ${json}`;
    const { cleanText } = extractEntitiesFromText(text);
    expect(cleanText).not.toContain("table_data");
  });

  it("extracts a chart and leaves text intact", () => {
    const json = JSON.stringify(CHART_PAYLOAD);
    const text = `Chart follows: ${json} Done.`;
    const { cleanText, extractedCharts, extractedTables } =
      extractEntitiesFromText(text);

    expect(extractedCharts).toHaveLength(1);
    expect(extractedCharts[0].title).toBe(CHART_PAYLOAD.title);
    expect(extractedTables).toHaveLength(0);
    expect(cleanText).toContain("Chart follows:");
    expect(cleanText).toContain("Done.");
    expect(cleanText).not.toContain('"type":"chart"');
  });

  it("extracts both a table and a chart from the same text", () => {
    const text = `${JSON.stringify(TABLE_PAYLOAD)} ${JSON.stringify(CHART_PAYLOAD)}`;
    const { extractedTables, extractedCharts, cleanText } =
      extractEntitiesFromText(text);

    expect(extractedTables).toHaveLength(1);
    expect(extractedCharts).toHaveLength(1);
    expect(cleanText).toBe("");
  });

  it("extracts multiple tables independently", () => {
    const second = { ...TABLE_PAYLOAD, title: "Second Table", table_data: [] };
    const text = `${JSON.stringify(TABLE_PAYLOAD)} ${JSON.stringify(second)}`;
    const { extractedTables } = extractEntitiesFromText(text);

    expect(extractedTables).toHaveLength(2);
    expect(extractedTables[0].title).toBe(TABLE_PAYLOAD.title);
    expect(extractedTables[1].title).toBe("Second Table");
  });

  it("returns empty state metadata for a table with zero rows", () => {
    const empty = { ...TABLE_PAYLOAD, table_data: [] };
    const { extractedTables } = extractEntitiesFromText(JSON.stringify(empty));

    expect(extractedTables).toHaveLength(1);
    expect(extractedTables[0].table_data).toHaveLength(0);
  });

  it("returns plain text unchanged when no entities are present", () => {
    const text = "Just plain text with no JSON.";
    const { cleanText, extractedTables, extractedCharts } =
      extractEntitiesFromText(text);

    expect(cleanText).toBe(text);
    expect(extractedTables).toHaveLength(0);
    expect(extractedCharts).toHaveLength(0);
  });

  it("does not extract when type is neither table nor chart", () => {
    const other = JSON.stringify({ type: "unknown", data: 1 });
    const { extractedTables, extractedCharts } =
      extractEntitiesFromText(other);

    expect(extractedTables).toHaveLength(0);
    expect(extractedCharts).toHaveLength(0);
  });

  it("does not hang on truncated JSON with no closing brace", () => {
    // Simulates a mid-stream cut-off — brace matching must not infinite-loop
    const truncated = '{"type": "table", "title": "Incomplete';
    const { extractedTables, cleanText } = extractEntitiesFromText(truncated);
    expect(extractedTables).toHaveLength(0);
    // Remaining text may be empty or trimmed — the key requirement is it returns
    expect(typeof cleanText).toBe("string");
  });
});
