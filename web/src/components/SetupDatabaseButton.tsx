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
        You don't have {databaseName} database. Please setup the schema for this
        application.
      </Text>
      <br />
      <ResetSchemaButton
        background={useColorModeValue("#ECE8FD", "#360061")}
        color={useColorModeValue("#820DDF", "#ECE8FD")}
        size="sm"
      >
        Setup Database
      </ResetSchemaButton>
    </Box>
  );
};
