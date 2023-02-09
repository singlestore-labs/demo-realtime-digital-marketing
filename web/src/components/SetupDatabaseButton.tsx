import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

import { ResetSchemaButton } from "@/components/ResetSchemaButton";

export const SetupDatabaseButton: React.FC = () => {
  return (
    <Box>
      <Text>
        Setup database from configuration page to use the application.
      </Text>
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
