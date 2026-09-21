import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { analystApiKey, analystEndpointUrl } from "@/data/recoil";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

type AuraChatProps = {
  isOpen: boolean;
  onClose: () => void;
  context?: string; // Optional context about what panel this is in
};

export const AuraChat: React.FC<AuraChatProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const apiKey = useRecoilValue(analystApiKey);
  const endpointUrl = useRecoilValue(analystEndpointUrl);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !apiKey || !endpointUrl) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: context || "Real-time Digital Marketing Dashboard",
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content:
          data.content ||
          data.message ||
          "I'm not sure how to respond to that.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Aura chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please check your API configuration.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  const isConfigured = apiKey && endpointUrl;

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      width="400px"
      height="500px"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      boxShadow="xl"
      zIndex={1000}
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Flex
        p={4}
        borderBottom="1px solid"
        borderColor={borderColor}
        alignItems="center"
        justifyContent="space-between"
        bg={useColorModeValue("purple.50", "purple.900")}
        borderTopRadius="lg"
      >
        <Text fontWeight="bold" fontSize="lg">
          🔮 Aura Analyst
        </Text>
        <IconButton
          aria-label="Close chat"
          icon={<CloseIcon />}
          size="sm"
          variant="ghost"
          onClick={onClose}
        />
      </Flex>

      {/* Messages */}
      <VStack flex={1} overflowY="auto" p={4} spacing={3} align="stretch">
        {!isConfigured ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">
              Please configure Aura Analyst in the Configure tab to start
              chatting.
            </Text>
          </Box>
        ) : messages.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">
              Ask me anything about your campaign data!
            </Text>
          </Box>
        ) : (
          messages.map((msg, idx) => (
            <Flex
              key={idx}
              justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}
            >
              <Box
                maxW="80%"
                bg={
                  msg.role === "user"
                    ? useColorModeValue("purple.500", "purple.600")
                    : useColorModeValue("gray.100", "gray.700")
                }
                color={msg.role === "user" ? "white" : undefined}
                px={4}
                py={2}
                borderRadius="lg"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {msg.content}
                </Text>
              </Box>
            </Flex>
          ))
        )}
        {isLoading && (
          <Flex justifyContent="flex-start">
            <Box
              maxW="80%"
              bg={useColorModeValue("gray.100", "gray.700")}
              px={4}
              py={2}
              borderRadius="lg"
            >
              <Text fontSize="sm" color="gray.500">
                Thinking...
              </Text>
            </Box>
          </Flex>
        )}
        <div ref={messagesEndRef} />
      </VStack>

      {/* Input */}
      <Flex p={4} borderTop="1px solid" borderColor={borderColor} gap={2}>
        <Input
          placeholder={
            isConfigured ? "Ask a question..." : "Configure API first"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!isConfigured || isLoading}
        />
        <Button
          colorScheme="purple"
          onClick={sendMessage}
          isLoading={isLoading}
          isDisabled={!isConfigured || !input.trim()}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};
