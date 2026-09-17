import { IconButton, Tooltip } from "@chakra-ui/react";
import * as React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  analystApiKey,
  analystChatOpen,
  analystEndpointUrl,
} from "@/data/recoil";

export const AnalystChatToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(analystChatOpen);
  const apiKey = useRecoilValue(analystApiKey);
  const endpointUrl = useRecoilValue(analystEndpointUrl);

  const isConfigured = !!apiKey && !!endpointUrl;

  if (!isConfigured) {
    return null;
  }

  return (
    <Tooltip
      label={isOpen ? "Close Aura Analyst" : "Open Aura Analyst"}
      placement="left"
    >
      <IconButton
        aria-label="Toggle Aura Analyst"
        icon={<FiMessageSquare />}
        onClick={() => setIsOpen(!isOpen)}
        position="fixed"
        bottom={4}
        right={4}
        size="lg"
        colorScheme="purple"
        borderRadius="full"
        boxShadow="lg"
        zIndex={1000}
      />
    </Tooltip>
  );
};
