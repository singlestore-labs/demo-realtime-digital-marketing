import { Box, Flex, Link, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

import {
  GithubIconButton,
  LinkedinIconButton,
  TwitterIconButton,
} from "./IconLinks";

const SocialMediaSection = () => {
  const handleRedirect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    window.open(e.currentTarget.value, "_blank");
  };

  return (
    <Flex direction="row" gap={8} fontWeight="bold" fontSize="0.85em">
      <Flex direction="row" gap={1} justifyContent="center" alignItems="center">
        <Text>Repository</Text>
        <GithubIconButton size="sm" onClick={handleRedirect} />
      </Flex>

      <Flex direction="row" gap={1} justifyContent="center" alignItems="center">
        <Text>Share on</Text>
        <TwitterIconButton size="sm" onClick={handleRedirect} />
        <LinkedinIconButton
          aria-label="Github Repo"
          size="sm"
          onClick={handleRedirect}
        />
      </Flex>
    </Flex>
  );
};

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("#ECE8FD", "#2F206E")}
      justifyContent="center"
      alignItems="center"
      zIndex={5}
      fontSize="0.85em"
      padding="10px"
    >
      <Flex
        direction="column"
        justifyContent="center"
        gap={1}
        alignItems="center"
      >
        <Text>
          Real-Time Digital Marketing is a demo application running on{" "}
          <Link href="https://singlestore.com"> SingleStoreDB</Link>
        </Text>

        <SocialMediaSection />
      </Flex>
    </Box>
  );
};
