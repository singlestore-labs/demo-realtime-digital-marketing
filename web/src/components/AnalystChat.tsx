import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  VStack,
  useColorModeValue,
  Collapse,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { CloseIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import {
  queryAnalyst,
  formatAnalystResult,
  AnalystQueryResult,
  AnalystChart,
  AnalystTable,
} from "@/data/analystClient";
import { analystApiKey, analystEndpointUrl, analystChatOpen, analystChatMessages, analystSessionId } from "@/data/recoil";

const Plot = createPlotlyComponent(Plotly);

interface Message {
  role: "user" | "assistant";
  content: string;
  result?: AnalystQueryResult;
}

export const AnalystChat: React.FC = () => {
  const apiKey = useRecoilValue(analystApiKey);
  const endpointUrl = useRecoilValue(analystEndpointUrl);
  const [isOpen, setIsOpen] = useRecoilState(analystChatOpen);
  const [messages, setMessages] = useRecoilState(analystChatMessages);
  const [sessionId, setSessionId] = useRecoilState(analystSessionId);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const [size, setSize] = React.useState({ width: 450, height: 600 });
  const [isResizing, setIsResizing] = React.useState(false);
  const isMountedRef = React.useRef(true);
  const isProcessingRef = React.useRef(false);
  const currentSessionIdRef = React.useRef(sessionId);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const userBgColor = useColorModeValue("#820DDF", "#9333EA");
  const assistantBgColor = useColorModeValue("gray.100", "gray.700");
  const chartBgColor = useColorModeValue("white", "gray.700");
  const chartTextColor = useColorModeValue("black", "white");
  const chartIsDark = useColorModeValue(false, true);

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Keep session ID ref in sync with Recoil state
  React.useEffect(() => {
    currentSessionIdRef.current = sessionId;
  }, [sessionId]);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const resizeStartRef = React.useRef({ x: 0, y: 0, width: 0, height: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
  };

  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = resizeStartRef.current.x - e.clientX;
      const deltaY = resizeStartRef.current.y - e.clientY;

      setSize({
        width: Math.max(350, Math.min(window.innerWidth * 0.9, resizeStartRef.current.width + deltaX)),
        height: Math.max(400, Math.min(window.innerHeight * 0.85, resizeStartRef.current.height + deltaY)),
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isProcessingRef.current) return;

    if (!apiKey || !endpointUrl) {
      return;
    }

    isProcessingRef.current = true;
    const userMessage: Message = { role: "user", content: input };
    const messageText = input;
    const requestSessionId = sessionId;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await queryAnalyst(
        {
          message: messageText,
          output_modes: ["data", "text"],
          session_id: requestSessionId,
        },
        apiKey,
        endpointUrl,
        undefined, // callbacks - not used yet
        abortControllerRef.current?.signal
      );

      // Ignore response if session has changed (chat was cleared)
      if (requestSessionId !== currentSessionIdRef.current) return;

      if (!isMountedRef.current) return;

      // Handle multiple results (agent can return more than one)
      if (!response.results || !Array.isArray(response.results)) {
        const malformedMessage: Message = {
          role: "assistant",
          content: "Received malformed response from Analyst API.",
        };
        setMessages((prev) => [...prev, malformedMessage]);
      } else if (response.results.length === 0) {
        const emptyMessage: Message = {
          role: "assistant",
          content: "The agent returned no results.",
        };
        setMessages((prev) => [...prev, emptyMessage]);
      } else {
        // Batch all assistant messages into a single state update
        const assistantMessages: Message[] = response.results.map((result) => {
          const formatted = formatAnalystResult(result);
          return {
            role: "assistant",
            content: formatted.content,
            result: result,
          };
        });
        setMessages((prev) => [...prev, ...assistantMessages]);
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      // Ignore aborted requests
      if (error instanceof Error && error.name === 'AbortError') return;
      // Ignore errors if session changed (chat was cleared)
      if (requestSessionId !== currentSessionIdRef.current) return;

      const errorMessage: Message = {
        role: "assistant",
        content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Only update state if this request is still valid (session hasn't changed)
      if (requestSessionId === currentSessionIdRef.current) {
        isProcessingRef.current = false;
        abortControllerRef.current = null;
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }
  };

  const renderData = (result: AnalystQueryResult) => {
    if (!result.data || result.data.row_count === 0) return null;

    const { columns, rows } = result.data;
    const maxRows = 10;

    return (
      <TableContainer maxW="100%" overflowX="auto" mt={2}>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              {columns.map((col, idx) => (
                <Th key={idx}>{col}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows.slice(0, maxRows).map((row, rowIdx) => (
              <Tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <Td key={cellIdx}>{String(cell)}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        {rows.length > maxRows && (
          <Text fontSize="xs" color="gray.500" mt={2}>
            Showing {maxRows} of {rows.length} rows
          </Text>
        )}
      </TableContainer>
    );
  };

  const renderTables = (result: AnalystQueryResult) => {
    if (!result.tables || result.tables.length === 0) return null;

    return (
      <>
        {result.tables.map((table, tableIdx) => {
          const maxRows = 10;
          const columns = table.columns.map((col) => col.name);
          const rows = table.table_data;

          return (
            <Box key={tableIdx} mt={3}>
              {table.title && (
                <Text fontWeight="bold" mb={2} fontSize="sm">
                  {table.title}
                </Text>
              )}
              <TableContainer maxW="100%" overflowX="auto">
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      {columns.map((col, idx) => (
                        <Th key={idx}>{col}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rows.slice(0, maxRows).map((row, rowIdx) => (
                      <Tr key={rowIdx}>
                        {row.map((cell, cellIdx) => (
                          <Td key={cellIdx}>{String(cell)}</Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                {rows.length > maxRows && (
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Showing {maxRows} of {rows.length} rows
                  </Text>
                )}
              </TableContainer>
            </Box>
          );
        })}
      </>
    );
  };

  // Memoize chart processing to avoid recomputation on every render
  const processedCharts = React.useMemo(() => {
    return messages
      .map((msg) => msg.result?.charts)
      .filter((charts): charts is AnalystChart[] => !!charts && charts.length > 0)
      .flat()
      .map((chart) => {
        // Deep clone to avoid frozen object errors
        const chartCopy = JSON.parse(JSON.stringify(chart));

        // Helper: only convert pure numeric strings, not dates or mixed content
        const maybeParseNumber = (val: any) => {
          if (typeof val !== "string") return val;
          const trimmed = val.trim();
          // Skip if it looks like a date (contains hyphens, slashes, or colons)
          if (/[-/:]/.test(trimmed)) return val;
          // Skip if it's not purely numeric (allowing decimals and negatives)
          if (!/^-?\d+\.?\d*$/.test(trimmed)) return val;
          const parsed = parseFloat(trimmed);
          return !isNaN(parsed) ? parsed : val;
        };

        const processedData = chartCopy.figure.data.map((trace: any) => ({
          ...trace,
          y: Array.isArray(trace.y) ? trace.y.map(maybeParseNumber) : trace.y,
          x: Array.isArray(trace.x) ? trace.x.map(maybeParseNumber) : trace.x,
        }));

        const layoutCopy = JSON.parse(JSON.stringify(chartCopy.figure.layout));

        return {
          title: chart.title,
          data: processedData,
          layout: layoutCopy,
        };
      });
  }, [messages]);

  const renderCharts = (result: AnalystQueryResult) => {
    if (!result.charts || result.charts.length === 0) return null;

    // Find processed charts matching this result
    const resultCharts = processedCharts.filter((_, idx) => {
      // Match by scanning messages for this result's charts
      let chartsSoFar = 0;
      for (const msg of messages) {
        if (msg.result === result && result.charts) {
          return idx >= chartsSoFar && idx < chartsSoFar + result.charts.length;
        }
        if (msg.result?.charts) {
          chartsSoFar += msg.result.charts.length;
        }
      }
      return false;
    });

    return (
      <>
        {resultCharts.map((chart, chartIdx) => {
          const plotLayout = {
            ...chart.layout,
            paper_bgcolor: chartIsDark ? "#2D3748" : "white",
            plot_bgcolor: chartIsDark ? "#2D3748" : "#E5ECF6",
            font: {
              ...(chart.layout.font || {}),
              color: chartIsDark ? "white" : "#2a3f5f",
            },
            autosize: true,
            margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 },
          };

          return (
            <Box
              key={`chart-${chartIdx}-${chart.title}`}
              mt={3}
              width="100%"
              bg={chartBgColor}
              p={2}
              borderRadius="md"
            >
              {chart.title && (
                <Text fontWeight="bold" mb={2} fontSize="sm" color={chartTextColor}>
                  {chart.title}
                </Text>
              )}
              <Box width="100%" height="400px">
                <Plot
                  key={`plot-${chartIdx}`}
                  data={chart.data}
                  layout={plotLayout}
                  config={{ responsive: true, displayModeBar: true }}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <>
      {/* Floating toggle button */}
      {!isOpen && (
        <IconButton
          aria-label="Open Analyst Chat"
          icon={<ChatIcon />}
          position="fixed"
          bottom="20px"
          right="20px"
          size="lg"
          colorScheme="purple"
          borderRadius="full"
          boxShadow="lg"
          onClick={() => setIsOpen(true)}
          zIndex={1000}
        />
      )}

      {/* Chat window */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          width={`${size.width}px`}
          height={`${size.height}px`}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="lg"
          boxShadow="2xl"
          display="flex"
          flexDirection="column"
          zIndex={1000}
          overflow="hidden"
          pointerEvents={isOpen ? "auto" : "none"}
        >
          {/* Custom resize handle - top-left corner */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="20px"
            height="20px"
            cursor="nwse-resize"
            zIndex={1001}
            onMouseDown={handleResizeStart}
            _hover={{ opacity: 0.7 }}
            sx={{
              "&::after": {
                content: '""',
                position: "absolute",
                top: "4px",
                left: "4px",
                width: "0",
                height: "0",
                borderLeft: "10px solid",
                borderBottom: "10px solid transparent",
                borderColor: "purple.400",
              },
            }}
          />
          {/* Header */}
          <Flex
            p={4}
            bg="purple.600"
            color="white"
            borderTopRadius="lg"
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex alignItems="center" gap={2}>
              <ChatIcon />
              <Text fontWeight="bold">Aura Analyst</Text>
            </Flex>
            <Flex gap={2}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="sm"
                  variant="ghost"
                  color="white"
                  aria-label="Options"
                />
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      // Abort any in-flight requests
                      if (abortControllerRef.current) {
                        abortControllerRef.current.abort();
                        abortControllerRef.current = null;
                      }
                      // Clear processing locks
                      isProcessingRef.current = false;
                      setMessages([]);
                      setSessionId(crypto.randomUUID());
                      setIsLoading(false);
                    }}
                    color={useColorModeValue("gray.800", "white")}
                    fontWeight="medium"
                  >
                    Clear Chat
                  </MenuItem>
                </MenuList>
              </Menu>
              <IconButton
                aria-label="Close chat"
                icon={<CloseIcon />}
                size="sm"
                variant="ghost"
                color="white"
                onClick={() => setIsOpen(false)}
              />
            </Flex>
          </Flex>

          {/* Messages */}
          <VStack
            flex={1}
            overflowY="auto"
            p={4}
            spacing={3}
            align="stretch"
          >
            {messages.length === 0 && (!apiKey || !endpointUrl) && (
              <VStack spacing={3} color="gray.500" textAlign="center" mt={8}>
                <Text>Aura Analyst is not configured.</Text>
                <Button
                  as={RouterLink}
                  to="/configure"
                  size="sm"
                  colorScheme="purple"
                  variant="outline"
                >
                  Configure Analyst →
                </Button>
              </VStack>
            )}
            {messages.length === 0 && apiKey && endpointUrl && (
              <Text color="gray.500" textAlign="center" mt={8}>
                Ask me anything about your MarTech campaign data!
                <br />
                <br />
                Try: "What are the top performing campaigns?" or "Show me
                conversion rates by city"
              </Text>
            )}
            {messages.map((msg, idx) => (
              <Flex
                key={idx}
                justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}
              >
                <Box
                  maxW="80%"
                  bg={msg.role === "user" ? userBgColor : assistantBgColor}
                  color={msg.role === "user" ? "white" : undefined}
                  px={4}
                  py={2}
                  borderRadius="lg"
                >
                  <Text fontSize="sm" whiteSpace="pre-wrap">
                    {msg.content}
                  </Text>
                  {msg.result && renderCharts(msg.result)}
                  {msg.result && renderTables(msg.result)}
                  {msg.result && renderData(msg.result)}
                </Box>
              </Flex>
            ))}
            {isLoading && (
              <Flex justifyContent="flex-start">
                <Box
                  bg={assistantBgColor}
                  px={4}
                  py={2}
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Spinner size="sm" />
                  <Text fontSize="sm">Thinking...</Text>
                </Box>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input */}
          <Flex p={4} borderTop="1px solid" borderColor={borderColor} gap={2}>
            <Input
              placeholder="Ask about your campaign data..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
            />
            <Button
              colorScheme="purple"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              Send
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </>
  );
};
