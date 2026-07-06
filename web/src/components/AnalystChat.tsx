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
  Code,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CloseIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
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
  processingSteps?: Array<{ type: "status" | "query" | "reasoning"; content: string }>;
  isStreaming?: boolean;
  streamingSteps?: Array<{ type: "status" | "query" | "reasoning"; content: string; timestamp: number }>;
}

// Fun thinking status messages inspired by Claude
const THINKING_STATUSES = [
  "Thinking",
  "Pondering",
  "Cogitating",
  "Contemplating",
  "Ruminating",
  "Analyzing",
  "Processing",
  "Deliberating",
  "Examining",
  "Investigating",
  "Mulling over",
  "Reflecting",
  "Scrutinizing",
  "Perusing",
  "Reasoning",
  "Calculating",
  "Computing",
  "Evaluating",
  "Puzzling through",
  "Working on it",
];

// Helper function to clean reasoning text by removing redundant headers
const cleanReasoningText = (text: string): string => {
  return text.replace(/^\*\*Reasoning:\*\*\s*/i, '').trim();
};

export const AnalystChat: React.FC = () => {
  const apiKey = useRecoilValue(analystApiKey);
  const endpointUrl = useRecoilValue(analystEndpointUrl);
  const [isOpen, setIsOpen] = useRecoilState(analystChatOpen);
  const [messages, setMessages] = useRecoilState(analystChatMessages);
  const [sessionId, setSessionId] = useRecoilState(analystSessionId);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentThinkingStatus, setCurrentThinkingStatus] = React.useState("Thinking");
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const [size, setSize] = React.useState({ width: 450, height: 600 });
  const [isResizing, setIsResizing] = React.useState(false);
  const isMountedRef = React.useRef(true);
  const isProcessingRef = React.useRef(false);
  const currentSessionIdRef = React.useRef(sessionId);
  const thinkingIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const userBgColor = useColorModeValue("#820DDF", "#9333EA");
  const assistantBgColor = useColorModeValue("gray.100", "gray.700");
  const chartBgColor = useColorModeValue("white", "gray.700");
  const chartTextColor = useColorModeValue("black", "white");
  const chartIsDark = useColorModeValue(false, true);
  const reasoningBgColor = useColorModeValue("gray.50", "gray.700");
  const followUpButtonHoverBg = useColorModeValue("purple.50", "purple.900");
  const followUpTextColor = useColorModeValue("gray.600", "gray.400");
  const clearChatTextColor = useColorModeValue("gray.800", "white");

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (thinkingIntervalRef.current) {
        clearInterval(thinkingIntervalRef.current);
      }
    };
  }, []);

  // Rotate thinking status messages
  React.useEffect(() => {
    if (isLoading) {
      thinkingIntervalRef.current = setInterval(() => {
        setCurrentThinkingStatus(
          THINKING_STATUSES[Math.floor(Math.random() * THINKING_STATUSES.length)]
        );
      }, 4000); // Changed from 2000ms to 4000ms
    } else if (thinkingIntervalRef.current) {
      clearInterval(thinkingIntervalRef.current);
      thinkingIntervalRef.current = null;
    }

    return () => {
      if (thinkingIntervalRef.current) {
        clearInterval(thinkingIntervalRef.current);
      }
    };
  }, [isLoading]);

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

  const handleSend = async (messageOverride?: string) => {
    const messageToSend = messageOverride || input;
    if (!messageToSend.trim() || isLoading || isProcessingRef.current) return;

    if (!apiKey || !endpointUrl) {
      return;
    }

    isProcessingRef.current = true;
    const userMessage: Message = { role: "user", content: messageToSend };
    const messageText = messageToSend;
    const requestSessionId = sessionId;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    // Set a 2 minute timeout
    let wasTimedOut = false;
    const timeoutId = setTimeout(() => {
      console.log('[Analyst] Request timeout after 2 minutes');
      wasTimedOut = true;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }, 120000); // 2 minutes

    // Track processing steps (reasoning and queries executed)
    const processingSteps: Array<{ type: "status" | "query" | "reasoning"; content: string }> = [];

    // Create a streaming assistant message that will be updated in real-time
    const streamingMessageIndex = messages.length + 1;
    const streamingMessage: Message = {
      role: "assistant",
      content: "",
      isStreaming: true,
      streamingSteps: [],
    };
    setMessages((prev) => [...prev, streamingMessage]);

    try {
      const response = await queryAnalyst(
        {
          message: messageText,
          output_modes: ["data", "text"],
          session_id: requestSessionId,
        },
        apiKey,
        endpointUrl,
        {
          onReasoning: (reasoning: string) => {
            console.log('[Analyst] Received reasoning:', reasoning.substring(0, 100));
            processingSteps.push({ type: "reasoning", content: reasoning });
            // Update the streaming message with new reasoning in real-time
            setMessages((prev) => {
              const updated = prev.map((msg, idx) => {
                if (idx === streamingMessageIndex && msg.isStreaming) {
                  return {
                    ...msg,
                    streamingSteps: [
                      ...(msg.streamingSteps || []),
                      { type: "reasoning" as const, content: reasoning, timestamp: Date.now() }
                    ]
                  };
                }
                return msg;
              });
              return updated;
            });
          },
          onQuery: (query: string) => {
            console.log('[Analyst] Received query:', query.substring(0, 100));
            processingSteps.push({ type: "query", content: query });
            // Update the streaming message with new query in real-time
            setMessages((prev) => {
              const updated = prev.map((msg, idx) => {
                if (idx === streamingMessageIndex && msg.isStreaming) {
                  return {
                    ...msg,
                    streamingSteps: [
                      ...(msg.streamingSteps || []),
                      { type: "query" as const, content: query, timestamp: Date.now() }
                    ]
                  };
                }
                return msg;
              });
              return updated;
            });
          },
        },
        abortControllerRef.current?.signal
      );

      console.log('[Analyst] Query complete, processing response');

      // Ignore response if session has changed (chat was cleared)
      if (requestSessionId !== currentSessionIdRef.current) {
        console.log('[Analyst] Session changed, ignoring response');
        return;
      }

      if (!isMountedRef.current) {
        console.log('[Analyst] Component unmounted, ignoring response');
        return;
      }

      console.log('[Analyst] Response results:', response.results?.length || 0);

      // Handle multiple results (agent can return more than one)
      if (!response.results || !Array.isArray(response.results)) {
        console.log('[Analyst] Malformed response');
        // Remove streaming message and show error
        setMessages((prev) => {
          const updated = [...prev];
          updated.splice(streamingMessageIndex, 1);
          return [
            ...updated,
            {
              role: "assistant",
              content: "Received malformed response from Analyst API.",
            }
          ];
        });
      } else if (response.results.length === 0) {
        console.log('[Analyst] Empty results');
        // Remove streaming message and show error
        setMessages((prev) => {
          const updated = [...prev];
          updated.splice(streamingMessageIndex, 1);
          return [
            ...updated,
            {
              role: "assistant",
              content: "The agent returned no results.",
            }
          ];
        });
      } else {
        console.log('[Analyst] Updating UI with results');
        // Update the streaming message to show final results
        setMessages((prev) => {
          const updated = [...prev];
          // Remove the streaming message
          updated.splice(streamingMessageIndex, 1);

          // Add final assistant messages
          const assistantMessages: Message[] = response.results.map((result, idx) => {
            const formatted = formatAnalystResult(result);
            return {
              role: "assistant",
              content: formatted.content,
              result: result,
              processingSteps: idx === 0 && processingSteps.length > 0 ? processingSteps : undefined,
              isStreaming: false,
            };
          });

          return [...updated, ...assistantMessages];
        });
        console.log('[Analyst] UI update complete');
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (!isMountedRef.current) return;

      // Handle aborted requests
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('[Analyst] Request was aborted');

        // Only show timeout message if it was actually a timeout (not user clearing chat)
        if (wasTimedOut && requestSessionId === currentSessionIdRef.current) {
          setMessages((prev) => {
            const updated = [...prev];
            updated.splice(streamingMessageIndex, 1);
            return [
              ...updated,
              {
                role: "assistant",
                content: "Request timed out after 2 minutes. Please try a simpler question or check your connection.",
              }
            ];
          });
        } else {
          // User cleared chat - just remove the streaming message silently
          setMessages((prev) => {
            const updated = [...prev];
            updated.splice(streamingMessageIndex, 1);
            return updated;
          });
        }
        return;
      }

      // Ignore errors if session changed (chat was cleared)
      if (requestSessionId !== currentSessionIdRef.current) return;

      // Remove streaming message and show error
      setMessages((prev) => {
        const updated = [...prev];
        updated.splice(streamingMessageIndex, 1);
        return [
          ...updated,
          {
            role: "assistant",
            content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          }
        ];
      });
    } finally {
      clearTimeout(timeoutId);
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
        // Guard against malformed charts
        if (!chart.figure || !chart.figure.data || !Array.isArray(chart.figure.data)) {
          return {
            title: chart.title || "Malformed chart",
            data: [],
            layout: {},
          };
        }

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

        const layoutCopy = chartCopy.figure.layout
          ? JSON.parse(JSON.stringify(chartCopy.figure.layout))
          : {};

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
            margin: { l: 50, r: 50, b: 50, t: 80, pad: 4 },
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
                    color={clearChatTextColor}
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
                  {msg.role === "user" ? (
                    <Text fontSize="sm" whiteSpace="pre-wrap">
                      {msg.content}
                    </Text>
                  ) : msg.isStreaming ? (
                    <VStack align="stretch" spacing={2}>
                      <Flex alignItems="center" gap={2}>
                        <Spinner size="sm" />
                        <Text fontSize="sm" fontWeight="medium">{currentThinkingStatus}...</Text>
                      </Flex>
                      {msg.streamingSteps && msg.streamingSteps.length > 0 && (
                        <VStack align="stretch" spacing={1} mt={2}>
                          {msg.streamingSteps.map((step, stepIdx) => (
                            <Box
                              key={stepIdx}
                              p={2}
                              borderRadius="md"
                              fontSize="xs"
                              bg={reasoningBgColor}
                              borderLeft="3px solid"
                              borderColor={step.type === "query" ? "blue.400" : "purple.400"}
                            >
                              <Flex alignItems="center" gap={1} mb={1}>
                                <Text fontWeight="bold">
                                  {step.type === "query" ? "🔍 Running query" : "💭 Reasoning"}
                                </Text>
                              </Flex>
                              {step.type === "query" ? (
                                <Code
                                  fontSize="xs"
                                  whiteSpace="pre-wrap"
                                  display="block"
                                  p={1}
                                >
                                  {step.content}
                                </Code>
                              ) : (
                                <Text whiteSpace="pre-wrap" noOfLines={3}>
                                  {cleanReasoningText(step.content)}
                                </Text>
                              )}
                            </Box>
                          ))}
                        </VStack>
                      )}
                    </VStack>
                  ) : (
                    <Box fontSize="sm">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <Text mb={2}>{children}</Text>,
                          strong: ({ children }) => <Text as="strong" fontWeight="bold">{children}</Text>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </Box>
                  )}
                  {!msg.isStreaming && msg.processingSteps && msg.processingSteps.length > 0 && (
                    <Accordion allowToggle mt={2}>
                      {msg.processingSteps.some(s => s.type === "reasoning") && (
                        <AccordionItem border="none">
                          <AccordionButton px={0} _hover={{ bg: "transparent" }}>
                            <Box flex="1" textAlign="left" fontSize="xs" fontWeight="medium">
                              💭 View Reasoning
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel px={0} pb={2}>
                            <VStack align="stretch" spacing={2}>
                              {msg.processingSteps
                                .filter(step => step.type === "reasoning")
                                .map((step, stepIdx) => (
                                  <Box
                                    key={stepIdx}
                                    p={3}
                                    borderRadius="md"
                                    fontSize="xs"
                                    whiteSpace="pre-wrap"
                                    bg={reasoningBgColor}
                                    borderLeft="3px solid"
                                    borderColor="purple.400"
                                  >
                                    <ReactMarkdown
                                      components={{
                                        p: ({ children }) => <Text mb={1} fontSize="xs">{children}</Text>,
                                        code: ({ inline, children }) =>
                                          inline ? (
                                            <Code fontSize="xs">{children}</Code>
                                          ) : (
                                            <Code display="block" p={2} fontSize="xs" whiteSpace="pre-wrap">
                                              {children}
                                            </Code>
                                          ),
                                      }}
                                    >
                                      {cleanReasoningText(step.content)}
                                    </ReactMarkdown>
                                  </Box>
                                ))}
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                      )}
                      {msg.processingSteps.some(s => s.type === "query") && (
                        <AccordionItem border="none">
                          <AccordionButton px={0} _hover={{ bg: "transparent" }}>
                            <Box flex="1" textAlign="left" fontSize="xs" fontWeight="medium">
                              📊 View Queries ({msg.processingSteps.filter(s => s.type === "query").length})
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel px={0} pb={2}>
                            <VStack align="stretch" spacing={2}>
                              {msg.processingSteps
                                .filter(step => step.type === "query")
                                .map((step, stepIdx) => (
                                  <Code
                                    key={stepIdx}
                                    p={2}
                                    borderRadius="md"
                                    fontSize="xs"
                                    whiteSpace="pre-wrap"
                                    display="block"
                                    colorScheme="purple"
                                  >
                                    {step.content}
                                  </Code>
                                ))}
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                      )}
                    </Accordion>
                  )}
                  {msg.result && renderCharts(msg.result)}
                  {msg.result && renderTables(msg.result)}
                  {msg.result && renderData(msg.result)}
                  {msg.result?.followUpQueries && msg.result.followUpQueries.length > 0 && (
                    <VStack align="stretch" spacing={2} mt={3} pt={3} borderTop="1px solid" borderColor={borderColor}>
                      <Text fontSize="xs" fontWeight="bold" color={followUpTextColor}>
                        💡 You might also ask:
                      </Text>
                      {msg.result.followUpQueries.slice(0, 3).map((question: string, qIdx: number) => (
                        <Button
                          key={qIdx}
                          size="sm"
                          variant="outline"
                          colorScheme="purple"
                          justifyContent="flex-start"
                          textAlign="left"
                          whiteSpace="normal"
                          height="auto"
                          py={2}
                          px={3}
                          fontSize="xs"
                          onClick={() => {
                            if (!isLoading && !isProcessingRef.current) {
                              handleSend(question);
                            }
                          }}
                          disabled={isLoading || isProcessingRef.current}
                          _hover={{ bg: followUpButtonHoverBg }}
                        >
                          {question}
                        </Button>
                      ))}
                    </VStack>
                  )}
                </Box>
              </Flex>
            ))}
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
              onClick={() => handleSend()}
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
