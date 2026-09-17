import { IconButton } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { analystApiKey, analystChatOpen, analystEndpointUrl } from "@/data/recoil";

export const AnalystChatToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(analystChatOpen);
  const apiKey = useRecoilValue(analystApiKey);
  const endpointUrl = useRecoilValue(analystEndpointUrl);

  // Only show toggle if API is configured and chat is closed
  const isConfigured = !!apiKey && !!endpointUrl;
  if (!isConfigured || isOpen) {
    return null;
  }

  return (
    <IconButton
      aria-label="Toggle Aura Analyst"
      icon={<ChatIcon />}
      size="lg"
      colorScheme="purple"
      position="fixed"
      bottom="20px"
      right="20px"
      borderRadius="full"
      onClick={() => setIsOpen(true)}
      boxShadow="lg"
      zIndex={999}
      _hover={{
        transform: "scale(1.1)",
      }}
      transition="transform 0.2s"
    />
  );
};
