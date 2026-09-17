import {
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  analystApiKey,
  analystChatOpen,
  analystEndpointUrl,
  analystPendingQuestion,
} from "@/data/recoil";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AnalystChat: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(analystChatOpen);
  const [pendingQuestion, setPendingQuestion] = useRecoilState(
    analystPendingQuestion
  );
  const apiKey = useRecoilValue(analystApiKey);
  const endpointUrl = useRecoilValue(analystEndpointUrl);

  const [messages, setMessages] = React.useState<Array<Message>>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Handle pending question from AskAuraButton
  React.useEffect(() => {
    if (pendingQuestion && isOpen) {
      handleSend(pendingQuestion);
      setPendingQuestion("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingQuestion, isOpen]);

  const handleSend = async (question?: string) => {
    const messageText = question || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${endpointUrl}/v1/chat/completions`, {
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
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0]?.message?.content || "No response",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Analyst API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      width="400px"
      height="600px"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="2xl"
      border="1px solid"
      borderColor={borderColor}
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
      >
        <Text fontWeight="bold" fontSize="lg">
          Aura Analyst
        </Text>
        <CloseButton onClick={() => setIsOpen(false)} />
      </Flex>

      {/* Messages */}
      <VStack flex={1} overflowY="auto" p={4} spacing={3} alignItems="stretch">
        {messages.length === 0 && (
          <Text color="gray.500" textAlign="center" mt={8}>
            Ask me anything about your campaign data!
          </Text>
        )}
        {messages.map((message, i) => (
          <Box
            key={i}
            alignSelf={message.role === "user" ? "flex-end" : "flex-start"}
            maxW="80%"
            bg={message.role === "user" ? "purple.500" : "gray.100"}
            color={message.role === "user" ? "white" : "black"}
            px={3}
            py={2}
            borderRadius="lg"
          >
            <Text fontSize="sm" whiteSpace="pre-wrap">
              {message.content}
            </Text>
          </Box>
        ))}
        {isLoading && (
          <Box
            alignSelf="flex-start"
            maxW="80%"
            bg="gray.100"
            px={3}
            py={2}
            borderRadius="lg"
          >
            <Text fontSize="sm" color="gray.500">
              Thinking...
            </Text>
          </Box>
        )}
      </VStack>

      {/* Input */}
      <Stack p={4} borderTop="1px solid" borderColor={borderColor} spacing={2}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question..."
          disabled={isLoading}
        />
        <Button
          colorScheme="purple"
          onClick={() => handleSend()}
          isLoading={isLoading}
          disabled={!input.trim()}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
};
