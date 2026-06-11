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
} from "@chakra-ui/react";
import { CloseIcon, ChatIcon } from "@chakra-ui/icons";
import * as React from "react";
import {
  queryAnalyst,
  formatAnalystResult,
  AnalystQueryResult,
} from "@/data/analystClient";

interface Message {
  role: "user" | "assistant";
  content: string;
  result?: AnalystQueryResult;
}

interface AnalystChatProps {
  apiKey?: string;
  endpointUrl?: string;
}

export const AnalystChat: React.FC<AnalystChatProps> = ({
  apiKey = import.meta.env.VITE_ANALYST_API_KEY,
  endpointUrl = import.meta.env.VITE_ANALYST_ENDPOINT_URL,
}) => {
  // Only show chat if API credentials are configured (local dev only)
  if (!apiKey || !endpointUrl) {
    return null;
  }
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [sessionId] = React.useState<string>(() => crypto.randomUUID());
  const [size, setSize] = React.useState({ width: 450, height: 600 });
  const [isResizing, setIsResizing] = React.useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const userBgColor = useColorModeValue("#820DDF", "#9333EA");
  const assistantBgColor = useColorModeValue("gray.100", "gray.700");

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
    if (!input.trim() || isLoading) return;

    if (!apiKey || !endpointUrl) {
      alert(
        "Aura Analyst is not configured. Please set VITE_ANALYST_API_KEY and VITE_ANALYST_ENDPOINT_URL"
      );
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await queryAnalyst(
        {
          message: input,
          output_modes: ["data", "text"],
          session_id: sessionId,
        },
        apiKey,
        endpointUrl
      );

      // Handle multiple results (agent can return more than one)
      for (const result of response.results) {
        const formatted = formatAnalystResult(result);
        const assistantMessage: Message = {
          role: "assistant",
          content: formatted.content,
          result: result,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
            <IconButton
              aria-label="Close chat"
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              color="white"
              onClick={() => setIsOpen(false)}
            />
          </Flex>

          {/* Messages */}
          <VStack
            flex={1}
            overflowY="auto"
            p={4}
            spacing={3}
            align="stretch"
          >
            {messages.length === 0 && (
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
