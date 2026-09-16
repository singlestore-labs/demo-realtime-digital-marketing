import { IconButton } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import * as React from "react";
import { useRecoilState } from "recoil";

import { analystChatOpen } from "@/data/recoil";

export const AnalystChatToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(analystChatOpen);

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
      onClick={() => setIsOpen(!isOpen)}
      boxShadow="lg"
      zIndex={999}
      _hover={{
        transform: "scale(1.1)",
      }}
      transition="transform 0.2s"
    />
  );
};
