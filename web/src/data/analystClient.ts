// Aura Analyst API Client for MarTech Demo
// Uses the structured query endpoint for programmatic integration

export interface AnalystQueryRequest {
  message: string;
  output_modes?: Array<"sql" | "data" | "chart" | "text">;
  session_id?: string;
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

/**
 * Query the Aura Analyst API
 * @param request The query request
 * @param apiKey The Analyst API key
 * @param endpointUrl The base Analyst endpoint URL (from Portal)
 * @returns The query response
 */
export async function queryAnalyst(
  request: AnalystQueryRequest,
  apiKey: string,
  endpointUrl: string
): Promise<AnalystQueryResponse> {
  const url = endpointUrl.replace("/chat", "/query");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
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

  return response.json();
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
