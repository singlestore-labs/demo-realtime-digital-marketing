import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { analystApiKey, analystEndpointUrl } from "@/data/recoil";
import { Message } from "./AuraChat";

type AuraMiniChatProps = {
  context: string;
  title?: string;
};

export const AuraMiniChat: React.FC<AuraMiniChatProps> = ({
  context,
  title,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const apiKey = useRecoilValue(analystApiKey);
  const endpointUrl = useRecoilValue(analystEndpointUrl);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const bgColor = useColorModeValue("purple.50", "purple.900");
  const borderColor = useColorModeValue("purple.200", "purple.700");

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
          context,
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
      console.error("Aura mini chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error.",
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

  const isConfigured = apiKey && endpointUrl;

  return (
    <Box
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      bg={bgColor}
      mt={4}
    >
      <Flex
        p={2}
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ opacity: 0.8 }}
      >
        <Flex alignItems="center" gap={2}>
          <Text fontSize="sm" fontWeight="bold">
            🔮 {title || "Ask Aura"}
          </Text>
        </Flex>
        <IconButton
          aria-label="Toggle chat"
          icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          size="xs"
          variant="ghost"
        />
      </Flex>

      <Collapse in={isOpen}>
        <Box p={3} pt={0}>
          <VStack
            maxH="200px"
            overflowY="auto"
            spacing={2}
            align="stretch"
            mb={2}
          >
            {!isConfigured ? (
              <Text fontSize="xs" color="gray.500" textAlign="center">
                Configure Aura Analyst in the Configure tab.
              </Text>
            ) : messages.length === 0 ? (
              <Text fontSize="xs" color="gray.500" textAlign="center">
                Ask about this section!
              </Text>
            ) : (
              messages.map((msg, idx) => (
                <Flex
                  key={idx}
                  justifyContent={
                    msg.role === "user" ? "flex-end" : "flex-start"
                  }
                >
                  <Box
                    maxW="85%"
                    bg={
                      msg.role === "user"
                        ? useColorModeValue("purple.500", "purple.600")
                        : useColorModeValue("gray.100", "gray.700")
                    }
                    color={msg.role === "user" ? "white" : undefined}
                    px={3}
                    py={1}
                    borderRadius="md"
                  >
                    <Text fontSize="xs" whiteSpace="pre-wrap">
                      {msg.content}
                    </Text>
                  </Box>
                </Flex>
              ))
            )}
            {isLoading && (
              <Flex justifyContent="flex-start">
                <Box
                  bg={useColorModeValue("gray.100", "gray.700")}
                  px={3}
                  py={1}
                  borderRadius="md"
                >
                  <Text fontSize="xs" color="gray.500">
                    ...
                  </Text>
                </Box>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          <Flex gap={2}>
            <Input
              size="sm"
              placeholder={isConfigured ? "Ask..." : "Configure first"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConfigured || isLoading}
            />
            <Button
              size="sm"
              colorScheme="purple"
              onClick={sendMessage}
              isLoading={isLoading}
              isDisabled={!isConfigured || !input.trim()}
            >
              Send
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};
