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
  Wrap,
  WrapItem,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, ChatIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  queryAnalyst,
  formatAnalystResult,
  AnalystQueryResult,
  AnalystChart,
} from "@/data/analystClient";
import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);
import {
  analystApiKey,
  analystEndpointUrl,
  analystChatOpen,
  analystChatMessages,
  analystSessionId,
} from "@/data/recoil";

interface ProcessingStep {
  type: "status" | "query";
  content: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  result?: AnalystQueryResult;
  processingSteps?: ProcessingStep[];
}

export const AnalystChat: React.FC = () => {
  const apiKey = useRecoilValue(analystApiKey);
  const endpointUrl = useRecoilValue(analystEndpointUrl);
  const [isOpen, setIsOpen] = useRecoilState(analystChatOpen);
  const [messages, setMessages] = useRecoilState(analystChatMessages);
  const [sessionId, setSessionId] = useRecoilState(analystSessionId);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [processingSteps, setProcessingSteps] = React.useState<ProcessingStep[]>([]);

  // Initialize session ID if not set
  React.useEffect(() => {
    if (!sessionId) {
      setSessionId(crypto.randomUUID());
    }
  }, [sessionId, setSessionId]);
  const [size, setSize] = React.useState({ width: 450, height: 600 });
  const [isResizing, setIsResizing] = React.useState(false);
  const isMountedRef = React.useRef(true);
  const isProcessingRef = React.useRef(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const userBgColor = useColorModeValue("#820DDF", "#9333EA");
  const assistantBgColor = useColorModeValue("gray.100", "gray.700");

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
      alert(
        "Aura Analyst is not configured. Please set VITE_ANALYST_API_KEY and VITE_ANALYST_ENDPOINT_URL"
      );
      return;
    }

    isProcessingRef.current = true;
    const userMessage: Message = { role: "user", content: input };
    const messageText = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Initialize processing steps
    const steps: ProcessingStep[] = [];
    const addStep = (step: ProcessingStep) => {
      steps.push(step);
      setProcessingSteps([...steps]);
    };

    addStep({ type: "status", content: "Thinking..." });

    // Create placeholder assistant message for progressive updates
    const placeholderMessage: Message = {
      role: "assistant",
      content: "",
      processingSteps: [...steps],
      result: {
        sql: null,
        data: null,
        chart: null,
        text: null,
        error: null,
        tables: [],
        followUpQueries: [],
      },
    };
    setMessages((prev) => [...prev, placeholderMessage]);
    const messageIndex = messages.length + 1; // +1 for the user message we just added

    try {
      const response = await queryAnalyst(
        {
          message: messageText,
          output_modes: ["data", "text"],
          session_id: sessionId,
        },
        apiKey,
        endpointUrl,
        {
          // Progressive rendering callbacks
          onQuery: (query: string) => {
            if (!isMountedRef.current) return;
            addStep({ type: "query", content: query });
            setMessages((prev) => {
              const updated = [...prev];
              const msg = updated[messageIndex];
              if (msg && msg.role === "assistant") {
                updated[messageIndex] = {
                  ...msg,
                  processingSteps: [...steps],
                };
              }
              return updated;
            });
          },
          onTextDelta: (delta: string) => {
            if (!isMountedRef.current) return;
            setMessages((prev) => {
              const updated = [...prev];
              const msg = updated[messageIndex];
              if (msg && msg.role === "assistant") {
                updated[messageIndex] = {
                  ...msg,
                  content: msg.content + delta,
                };
              }
              return updated;
            });
          },
          onTable: (table) => {
            if (!isMountedRef.current) return;
            setMessages((prev) => {
              const updated = [...prev];
              const msg = updated[messageIndex];
              if (msg && msg.role === "assistant" && msg.result) {
                updated[messageIndex] = {
                  ...msg,
                  result: {
                    ...msg.result,
                    tables: [...(msg.result.tables || []), table],
                  },
                };
              }
              return updated;
            });
          },
          onChart: (chart) => {
            if (!isMountedRef.current) return;
            setMessages((prev) => {
              const updated = [...prev];
              const msg = updated[messageIndex];
              if (msg && msg.role === "assistant" && msg.result) {
                updated[messageIndex] = {
                  ...msg,
                  result: {
                    ...msg.result,
                    charts: [...(msg.result.charts || []), chart],
                  },
                };
              }
              return updated;
            });
          },
          onFollowUpQueries: (queries) => {
            if (!isMountedRef.current) return;
            setMessages((prev) => {
              const updated = [...prev];
              const msg = updated[messageIndex];
              if (msg && msg.role === "assistant" && msg.result) {
                updated[messageIndex] = {
                  ...msg,
                  result: {
                    ...msg.result,
                    followUpQueries: queries,
                  },
                };
              }
              return updated;
            });
          },
        }
      );

      if (!isMountedRef.current) return;

      // Remove status steps, keep only query steps
      const finalSteps = steps.filter(step => step.type === "query");

      // Final update with complete result
      if (!response.results || !Array.isArray(response.results)) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[messageIndex] = {
            role: "assistant",
            content: "Received malformed response from Analyst API.",
            processingSteps: finalSteps,
          };
          return updated;
        });
      } else if (response.results.length === 0) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[messageIndex] = {
            role: "assistant",
            content: "The agent returned no results.",
            processingSteps: finalSteps,
          };
          return updated;
        });
      } else {
        // Update with final result (may contain additional metadata)
        const result = response.results[0];
        setMessages((prev) => {
          const updated = [...prev];
          const msg = updated[messageIndex];
          if (msg && msg.role === "assistant") {
            updated[messageIndex] = {
              ...msg,
              content: result.text || msg.content || "No response",
              result: result,
              processingSteps: finalSteps,
            };
          }
          return updated;
        });
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      const finalSteps = steps.filter(step => step.type === "query");
      setMessages((prev) => {
        const updated = [...prev];
        updated[messageIndex] = {
          role: "assistant",
          content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          processingSteps: finalSteps,
        };
        return updated;
      });
    } finally {
      isProcessingRef.current = false;
      if (isMountedRef.current) {
        setIsLoading(false);
        setProcessingSteps([]);
      }
    }
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

  const renderFollowUpQueries = (result: AnalystQueryResult) => {
    if (!result.followUpQueries || result.followUpQueries.length === 0) return null;

    return (
      <Wrap mt={3} spacing={2}>
        {result.followUpQueries.map((query, idx) => (
          <WrapItem key={idx}>
            <Tag
              size="md"
              variant="outline"
              colorScheme="purple"
              cursor="pointer"
              _hover={{ bg: useColorModeValue("purple.50", "purple.900") }}
              onClick={() => {
                setInput(query);
              }}
            >
              {query}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    );
  };

  const ProcessingSteps: React.FC<{ steps: ProcessingStep[] }> = ({ steps }) => {
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
    const stepBgColor = useColorModeValue("gray.50", "gray.600");
    const stepTextColor = useColorModeValue("gray.600", "gray.300");
    const queryBgColor = useColorModeValue("gray.100", "gray.700");
    const queryTextColor = useColorModeValue("gray.700", "gray.200");

    if (!steps || steps.length === 0) return null;

    return (
      <Box mt={2} mb={3}>
        <Flex
          alignItems="center"
          cursor="pointer"
          onClick={onToggle}
          py={1}
          _hover={{ opacity: 0.8 }}
        >
          <IconButton
            aria-label="Toggle processing steps"
            icon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            size="xs"
            variant="ghost"
            mr={1}
          />
          <Text fontSize="xs" fontWeight="medium" color={stepTextColor}>
            Processing steps
          </Text>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <VStack align="stretch" spacing={2} pl={6} mt={2}>
            {steps.map((step, idx) => (
              <Box key={idx}>
                {step.type === "status" ? (
                  <Flex alignItems="center" fontSize="xs" color={stepTextColor}>
                    <Spinner size="xs" mr={2} />
                    <Text>{step.content}</Text>
                  </Flex>
                ) : (
                  <Box
                    bg={queryBgColor}
                    p={2}
                    borderRadius="md"
                    fontSize="xs"
                    fontFamily="monospace"
                    color={queryTextColor}
                    overflowX="auto"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                  >
                    {step.content}
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </Collapse>
      </Box>
    );
  };

  const renderCharts = (result: AnalystQueryResult) => {
    console.log("[renderCharts] Called with result:", result);
    console.log("[renderCharts] Charts array:", result.charts);
    console.log("[renderCharts] Plotly object:", Plotly);
    console.log("[renderCharts] Plotly version:", (Plotly as any)?.version);
    console.log("[renderCharts] Plot component:", Plot);

    if (!result.charts || result.charts.length === 0) {
      console.log("[renderCharts] No charts to render");
      return null;
    }

    console.log(`[renderCharts] Rendering ${result.charts.length} chart(s)`);

    // Call hooks at the top level, outside the map
    const isDark = useColorModeValue(false, true);
    const bgColor = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("black", "white");

    return (
      <>
        {result.charts.map((chart, chartIdx) => {
          console.log(`[renderCharts] Processing chart ${chartIdx}:`, chart);
          console.log(`[renderCharts] Chart ${chartIdx} figure data:`, chart.figure.data);

          // Convert string values to numbers in chart data for Plotly
          // Deep clone to avoid "read only property" errors
          const processedData = chart.figure.data.map((trace: any) => {
            console.log(`[renderCharts] Original trace:`, trace);
            console.log(`[renderCharts] Original y values:`, trace.y);
            console.log(`[renderCharts] Y value types:`, trace.y?.map((v: any) => typeof v));

            // Create a deep copy using JSON parse/stringify to avoid frozen object issues
            const traceCopy = JSON.parse(JSON.stringify(trace));

            const processed = {
              ...traceCopy,
              y: Array.isArray(traceCopy.y)
                ? traceCopy.y.map((val: any) => {
                    if (typeof val === "string") {
                      const parsed = parseFloat(val);
                      return !isNaN(parsed) ? parsed : val;
                    }
                    return val;
                  })
                : traceCopy.y,
              x: Array.isArray(traceCopy.x)
                ? traceCopy.x.map((val: any) => {
                    if (typeof val === "string") {
                      const parsed = parseFloat(val);
                      return !isNaN(parsed) ? parsed : val;
                    }
                    return val;
                  })
                : traceCopy.x,
            };

            console.log(`[renderCharts] Processed trace:`, processed);
            console.log(`[renderCharts] Processed y values:`, processed.y);
            return processed;
          });

          console.log(`[renderCharts] All processed data for chart ${chartIdx}:`, processedData);
          console.log(`[renderCharts] Layout for chart ${chartIdx}:`, chart.figure.layout);

          // Deep clone the layout as well to avoid frozen object issues
          const layoutCopy = JSON.parse(JSON.stringify(chart.figure.layout));

          const plotLayout = {
            ...layoutCopy,
            paper_bgcolor: isDark ? "#2D3748" : "white",
            plot_bgcolor: isDark ? "#2D3748" : "#E5ECF6",
            font: {
              ...layoutCopy.font,
              color: isDark ? "white" : "#2a3f5f",
            },
            autosize: true,
            margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 },
          };

          console.log(`[renderCharts] About to render Plot component for chart ${chartIdx}`);
          console.log(`[renderCharts] Plot data:`, processedData);
          console.log(`[renderCharts] Plot layout:`, plotLayout);

          // Test if Plot component throws any errors
          try {
            return (
              <Box key={`chart-${chartIdx}-${chart.title}`} mt={3} width="100%" bg={bgColor} p={2} borderRadius="md">
                {chart.title && (
                  <Text fontWeight="bold" mb={2} fontSize="sm" color={textColor}>
                    {chart.title}
                  </Text>
                )}
                <Box
                  width="100%"
                  height="400px"
                  border="1px solid red"
                  id={`plot-container-${chartIdx}`}
                  onLoad={() => console.log(`[renderCharts] Plot container ${chartIdx} loaded`)}
                >
                  <Plot
                    key={`plot-${chartIdx}`}
                    data={processedData}
                    layout={plotLayout}
                    config={{ responsive: true, displayModeBar: true }}
                    style={{ width: "100%", height: "100%" }}
                    onInitialized={(figure: any, graphDiv: any) => {
                      console.log(`[renderCharts] Plot ${chartIdx} initialized!`, { figure, graphDiv });
                    }}
                    onUpdate={(figure: any, graphDiv: any) => {
                      console.log(`[renderCharts] Plot ${chartIdx} updated!`, { figure, graphDiv });
                    }}
                    onError={(err: any) => {
                      console.error(`[renderCharts] Plot ${chartIdx} error:`, err);
                    }}
                  />
                </Box>
              </Box>
            );
          } catch (err) {
            console.error(`[renderCharts] Error rendering Plot component ${chartIdx}:`, err);
            return (
              <Box key={`chart-error-${chartIdx}`} mt={3} width="100%" bg="red.100" p={2} borderRadius="md">
                <Text color="red.700">Error rendering chart: {String(err)}</Text>
              </Box>
            );
          }
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
                      setMessages([]);
                      setSessionId(crypto.randomUUID());
                    }}
                    color={useColorModeValue("gray.800", "inherit")}
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
              <Text color="gray.500" textAlign="center" mt={8}>
                Aura Analyst is not configured. Please set VITE_ANALYST_API_KEY
                and VITE_ANALYST_ENDPOINT_URL environment variables.
              </Text>
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
                  {msg.processingSteps && msg.processingSteps.length > 0 && (
                    <ProcessingSteps steps={msg.processingSteps} />
                  )}
                  <Box fontSize="sm">
                    <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
                      {msg.content}
                    </ReactMarkdown>
                  </Box>
                  {msg.result && renderCharts(msg.result)}
                  {msg.result && renderTables(msg.result)}
                  {msg.result && renderFollowUpQueries(msg.result)}
                </Box>
              </Flex>
            ))}
            {isLoading && processingSteps.length === 0 && (
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
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSend();
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
