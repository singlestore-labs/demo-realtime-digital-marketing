import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import { MarkdownText } from "@/components/MarkdownText";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";

export const SetupDatabaseButton: React.FC = () => {
  return (
    <Box>
      <MarkdownText>
        {`
		Setup database from configuration page to use the application.
	`}
      </MarkdownText>
      <ResetSchemaButton
        background={useColorModeValue("#ECE8FD", "#2F206E")}
        color={useColorModeValue("#553ACF", "#ECE8FD")}
        size="sm"
      >
        Setup database
      </ResetSchemaButton>
    </Box>
  );
};
