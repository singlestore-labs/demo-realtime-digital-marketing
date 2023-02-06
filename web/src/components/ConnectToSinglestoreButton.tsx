import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import { MarkdownText } from "./MarkdownText";

export const ConnectToSingleStoreButton: React.FC = () => {
  const handleLinkRedirects = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    window.open(e.currentTarget.value, "_self");
  };

  return (
    <Box>
      <MarkdownText>
        {`
			This application is a demo of how to use SingleStore to serve ads to
			users based on their behavior and realtime location. The demo is
			based on location, purchase, and request history from millions of
			simulated subscribers for a hypothetical service company. To learn
			about how this works please visit the [Configure page](/configure).
		`}
      </MarkdownText>
      <Button
        size="sm"
        value="/"
        onClick={handleLinkRedirects}
        background={useColorModeValue("#ECE8FD", "#2F206E")}
        color={useColorModeValue("#553ACF", "#ECE8FD")}
      >
        <SettingsIcon />
        <Text pl={2}>Connect to SingleStore</Text>
      </Button>
    </Box>
  );
};
