import { IconButton, Tooltip, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { useSetRecoilState } from "recoil";

import { analystChatOpen, analystPendingQuestion } from "@/data/recoil";

interface AskAuraButtonProps {
  question: string;
  colSpan?: number;
}

export const AskAuraButton: React.FC<AskAuraButtonProps> = ({
  question,
  colSpan = 1,
}) => {
  const setIsOpen = useSetRecoilState(analystChatOpen);
  const setPendingQuestion = useSetRecoilState(analystPendingQuestion);
  const iconColor = useColorModeValue("purple.500", "purple.400");
  const iconHoverColor = useColorModeValue("purple.600", "purple.500");

  // Hide button on narrow panels (colSpan 1) when screen is small
  const shouldShow = useBreakpointValue({ base: colSpan > 1, md: true });

  const handleClick = () => {
    setIsOpen(true);
    setPendingQuestion(question);
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <Tooltip label="Ask Aura about this" placement="left" hasArrow>
      <IconButton
        aria-label="Ask Aura about this"
        icon={<FiMessageSquare />}
        size="sm"
        variant="ghost"
        color={iconColor}
        _hover={{ color: iconHoverColor, bg: "transparent" }}
        onClick={handleClick}
        position="absolute"
        top={2}
        right={2}
      />
    </Tooltip>
  );
};
