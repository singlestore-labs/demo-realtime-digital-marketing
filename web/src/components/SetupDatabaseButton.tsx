import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { useRecoilState } from "recoil";

import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { connectionDatabase } from "@/data/recoil";

export const SetupDatabaseButton: React.FC = () => {
  const [databaseName] = useRecoilState(connectionDatabase);

  return (
    <Box>
      <Text>
        You don't have database {databaseName}. Please setup the schema for this
        application.
      </Text>
      <br />
      <ResetSchemaButton
        background={useColorModeValue("#ECE8FD", "#2F206E")}
        color={useColorModeValue("#553ACF", "#ECE8FD")}
        size="sm"
      >
        Setup Database
      </ResetSchemaButton>
    </Box>
  );
};
