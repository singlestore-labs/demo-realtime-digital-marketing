import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { AuraChat } from "./AuraChat";

export const AuraChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {!isOpen && (
        <Box position="fixed" bottom="20px" right="20px" zIndex={999}>
          <IconButton
            aria-label="Open Aura Analyst"
            icon={<span style={{ fontSize: "24px" }}>🔮</span>}
            size="lg"
            colorScheme="purple"
            borderRadius="full"
            onClick={() => setIsOpen(true)}
            boxShadow="lg"
            _hover={{
              transform: "scale(1.1)",
            }}
            transition="transform 0.2s"
          />
        </Box>
      )}
      <AuraChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
