import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";

export const ConnectToSingleStoreButton: React.FC = () => {
  const { colorMode } = useColorMode();
  const buttonStyle = {
    background: "#ECE8FD",
    color: "#553ACF",
  };
  if (colorMode === "dark") {
    buttonStyle.background = "#2F206E";
    buttonStyle.color = "#ECE8FD";
  }

  const handleLinkRedirects = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    window.open(e.currentTarget.value, "_self");
  };

  return (
    <Box>
      <Text>
        This application is a demo of how to use SingleStore to serve ads to
        users based on their behavior and realtime location. The demo is based
        on location, purchase, and request history from millions of simulated
        subscribers for a hypothetical service company. To learn about how this
        works please visit the{" "}
        <Link style={{ color: buttonStyle.color }} to="/configure">
          Configure page
        </Link>
      </Text>
      <br />
      <Button
        size="sm"
        value="/"
        onClick={handleLinkRedirects}
        {...buttonStyle}
      >
        <SettingsIcon />
        <Text pl={2}>Connect to SingleStore</Text>
      </Button>
    </Box>
  );
};
