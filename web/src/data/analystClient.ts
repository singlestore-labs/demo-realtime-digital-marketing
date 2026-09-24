// Aura Analyst API Client for MarTech Demo
// Uses the /chat streaming endpoint

export interface AnalystQueryRequest {
  message: string;
  output_modes?: Array<"sql" | "data" | "chart" | "text">;
  session_id?: string;
  model?: string;
}

export interface AnalystTable {
  type: "table";
  title: string;
  columns: Array<{ name: string; type: string }>;
  table_data: any[][];
  query?: string;
}

export interface AnalystChart {
  type: "chart";
  chart_type: string;
  title: string;
  format: string;
  figure: {
    data: any[];
    layout: any;
  };
  raw_data?: any;
  query?: string;
  chart_metadata?: any;
}

export interface AnalystQueryResult {
  sql: {
    command: string;
    confidence_score: number | null;
    tables_used: string[];
  } | null;
  data: {
    columns: string[];
    rows: any[][];
    row_count: number;
  } | null;
  chart: Record<string, any> | null;
  text: string | null;
  error: string | null;
  tables?: AnalystTable[];
  charts?: AnalystChart[];
  followUpQueries?: string[];
}

export interface AnalystQueryResponse {
  results: AnalystQueryResult[];
}

export interface AnalystError {
  error: {
    code: string;
    message: string;
  };
}

export interface StreamCallback {
  onTextDelta?: (delta: string) => void;
  onTable?: (table: AnalystTable) => void;
  onChart?: (chart: AnalystChart) => void;
  onFollowUpQueries?: (queries: string[]) => void;
  onQuery?: (query: string) => void;
  onReasoning?: (reasoning: string) => void;
}

export function extractEntitiesFromText(text: string): {
  cleanText: string;
  extractedTables: AnalystTable[];
  extractedCharts: AnalystChart[];
} {
  const extractedTables: AnalystTable[] = [];
  const extractedCharts: AnalystChart[] = [];
  let remainingText = text;

  const extractObjects = (pattern: RegExp, remainingText: string) => {
    const results: Array<Record<string, unknown>> = [];
    let str = remainingText;
    while (pattern.test(str)) {
      const match = pattern.exec(str);
      const startIdx = match ? match.index : -1;
      if (startIdx === -1) break;

      let braceCount = 0;
      let endIdx = startIdx;
      let inString = false;
      let escapeNext = false;

      for (let i = startIdx; i < str.length; i++) {
        const char = str[i];
        if (escapeNext) { escapeNext = false; continue; }
        if (char === '\\') { escapeNext = true; continue; }
        if (char === '"') { inString = !inString; continue; }
        if (!inString) {
          if (char === '{') braceCount++;
          if (char === '}') {
            braceCount--;
            if (braceCount === 0) { endIdx = i + 1; break; }
          }
        }
      }

      if (endIdx === startIdx) {
        // No closing brace found — truncated JSON; skip past the match to avoid infinite loop
        str = str.substring(startIdx + match![0].length);
        continue;
      }

      try {
        results.push(JSON.parse(str.substring(startIdx, endIdx)));
      } catch (e) {
        console.warn("[Analyst] Failed to parse entity JSON:", e);
      }
      str = str.substring(0, startIdx) + str.substring(endIdx);
    }
    return { results, cleanStr: str };
  };

  const tableResult = extractObjects(/\{"type":\s*"table"/, remainingText);
  for (const obj of tableResult.results) {
    if (obj.type === "table") extractedTables.push(obj as unknown as AnalystTable);
  }
  remainingText = tableResult.cleanStr;

  const chartResult = extractObjects(/\{"type":\s*"chart"/, remainingText);
  for (const obj of chartResult.results) {
    if (obj.type === "chart") extractedCharts.push(obj as unknown as AnalystChart);
  }
  remainingText = chartResult.cleanStr;

  return { cleanText: remainingText.trim(), extractedTables, extractedCharts };
}

/**
 * Query the Aura Analyst API with streaming
 * @param request The query request
 * @param apiKey The Analyst API key
 * @param endpointUrl The base Analyst endpoint URL (from Portal)
 * @param callbacks Optional callbacks for progressive rendering
 * @returns The query response
 */
export async function queryAnalyst(
  request: AnalystQueryRequest,
  apiKey: string,
  endpointUrl: string,
  callbacks?: StreamCallback,
  signal?: AbortSignal
): Promise<AnalystQueryResponse> {
  const url = endpointUrl;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    signal,
  });

  const traceId = response.headers.get("singlestore-trace-id");
  console.log("[Analyst] Trace ID:", traceId);

  if (!response.ok) {
    let errorMessage = `Analyst API error: ${response.status} ${response.statusText}`;
    try {
      const errorData = (await response.json()) as AnalystError;
      if (errorData.error?.code && errorData.error?.message) {
        errorMessage = `Analyst API error: ${errorData.error.code} - ${errorData.error.message}`;
      }
    } catch {
      // Non-JSON response, use status text
    }
    throw new Error(errorMessage);
  }

  // Handle streaming SSE response from /chat endpoint
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let accumulatedText = "";
  const tables: AnalystTable[] = [];
  const charts: AnalystChart[] = [];
  let followUpQueries: string[] = [];
  let chunkCount = 0;

  if (!reader) {
    throw new Error("Response body is not readable");
  }

  console.log("[Analyst] Starting to read streaming response");

  while (true) {
    const { done, value } = await reader.read();
    chunkCount++;
    if (chunkCount % 10 === 0) {
      console.log(`[Analyst] Processed ${chunkCount} chunks`);
    }
    if (done) {
      console.log(`[Analyst] Stream complete after ${chunkCount} chunks`);
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("event:") && !line.startsWith("data:")) continue;

      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);

          // Capture reasoning and SQL query from reasoning events
          if (parsed.type === "response.reasoning.done" && parsed.text) {
            // Send full reasoning text to callback
            if (callbacks?.onReasoning) {
              callbacks.onReasoning(parsed.text);
            }

            // Extract SQL query from the reasoning text
            const sqlMatch = parsed.text.match(/```sql\s*([\s\S]*?)\s*```/);
            if (sqlMatch && sqlMatch[1]) {
              const query = sqlMatch[1].trim();
              if (callbacks?.onQuery) {
                callbacks.onQuery(query);
              }
            }
          }

          // Accumulate text deltas from output_text.delta events
          if (parsed.type === "response.output_text.delta") {
            accumulatedText += parsed.delta;
            // Notify callback immediately for progressive rendering
            if (callbacks?.onTextDelta) {
              callbacks.onTextDelta(parsed.delta);
            }
          }

          // Capture follow-up queries
          if (parsed.type === "response.follow_up_queries_event" && parsed.follow_up_queries) {
            followUpQueries = parsed.follow_up_queries;
            if (callbacks?.onFollowUpQueries) {
              callbacks.onFollowUpQueries(parsed.follow_up_queries);
            }
          }

          // Handle table/chart objects sent as top-level SSE JSON events
          if (parsed.type === "table") {
            tables.push(parsed as AnalystTable);
            if (callbacks?.onTable) {
              callbacks.onTable(parsed as AnalystTable);
            }
          } else if (parsed.type === "chart") {
            charts.push(parsed as AnalystChart);
            if (callbacks?.onChart) {
              callbacks.onChart(parsed as AnalystChart);
            }
          }
        } catch (e) {
          // Try to parse as table or chart JSON (not wrapped in SSE format)
          try {
            const jsonData = JSON.parse(data);
            if (jsonData.type === "table") {
              tables.push(jsonData);
              // Notify callback immediately
              if (callbacks?.onTable) {
                callbacks.onTable(jsonData);
              }
            } else if (jsonData.type === "chart") {
              charts.push(jsonData);
              // Notify callback immediately
              if (callbacks?.onChart) {
                callbacks.onChart(jsonData);
              }
            }
          } catch {
            console.warn("[Analyst] Failed to parse SSE data:", data);
          }
        }
      }
    }
  }

  const { cleanText, extractedTables, extractedCharts } = extractEntitiesFromText(accumulatedText);
  const allTables = [...tables, ...extractedTables];
  const allCharts = [...charts, ...extractedCharts];

  // Return accumulated text, tables, charts, and follow-up queries as a result
  return {
    results: [
      {
        sql: null,
        data: null,
        chart: null,
        text: cleanText || "No response",
        error: null,
        tables: allTables.length > 0 ? allTables : undefined,
        charts: allCharts.length > 0 ? allCharts : undefined,
        followUpQueries: followUpQueries.length > 0 ? followUpQueries : undefined,
      },
    ],
  };
}

/**
 * Format Analyst results for display
 */
export function formatAnalystResult(result: AnalystQueryResult): {
  type: "text" | "data" | "error";
  content: string;
  data?: { columns: string[]; rows: any[][] };
} {
  if (result.error) {
    return { type: "error", content: result.error };
  }

  if (result.text) {
    return { type: "text", content: result.text };
  }

  if (result.data) {
    return {
      type: "data",
      content: `Found ${result.data.row_count} ${result.data.row_count === 1 ? "result" : "results"}`,
      data: result.data,
    };
  }

  return { type: "text", content: "No results" };
}
