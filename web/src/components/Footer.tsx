import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { BsLinkedin } from "react-icons/bs";
import { VscGithub, VscGithubInverted, VscTwitter } from "react-icons/vsc";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { colorMode } = useColorMode();
  const handleRedirects = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    window.open(e.currentTarget.value, "_blank");
  };

  let gitHubIconButton = <VscGithub size="1.2em" />;

  if (colorMode === "dark") {
    gitHubIconButton = <VscGithubInverted size="1.2em" />;
  }

  return (
    <>
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
          gap={0}
          alignItems="center"
        >
          <Text>
            RealTime Digital Marketing is a demo application running on
            <Link to="https://singlestore.com">**SingleStoreDB**</Link>
          </Text>

          <Flex direction="row" gap={8} fontWeight="bold" fontSize="0.85em">
            <Flex
              direction="row"
              gap={1}
              justifyContent="center"
              alignItems="center"
            >
              <Text>Repository</Text>
              <IconButton
                aria-label="Github Repo"
                size="sm"
                background={colorMode === "light" ? undefined : "black"}
                icon={gitHubIconButton}
                value="https://github.com/singlestore-labs/demo-realtime-digital-marketing"
                onClick={handleRedirects}
              />
            </Flex>

            <Flex
              direction="row"
              gap={1}
              justifyContent="center"
              alignItems="center"
            >
              <Text>Share on</Text>
              <IconButton
                aria-label="Github Repo"
                size="sm"
                background={colorMode === "light" ? undefined : "black"}
                icon={<VscTwitter size="1em" />}
                value="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdigital-marketing.labs.singlestore.com%2F&text=Exciting%20MarTech%20demo%20application%20from%20SingleStoreDB%20showcasing%20its%20unique%20capabilities!%20As%20a%20demo%20app%2C%20it%20gives%20you%20a%20taste%20of%20what%27s%20possible%20when%20using%20SingleStoreDB%20for%20your%20own%20projects%2C%20.%20%0A%0A%23SingleStoreDB%20%23database%20%23digitalmarketing%20%23appdevelopment%20"
                onClick={handleRedirects}
              />
              <IconButton
                aria-label="Github Repo"
                size="sm"
                background={colorMode === "light" ? undefined : "black"}
                icon={<BsLinkedin size="1em" />}
                value="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdigital-marketing.labs.singlestore.com%2F"
                onClick={handleRedirects}
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
