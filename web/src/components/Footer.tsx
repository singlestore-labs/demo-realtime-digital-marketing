import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsLinkedin } from "react-icons/bs";
import { VscGithub, VscGithubInverted, VscTwitter } from "react-icons/vsc";
import { MarkdownText } from "./MarkdownText";

export const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Box
        bg={useColorModeValue("#ECE8FD", "#2F206E")}
        justifyContent={"center"}
        alignItems={"center"}
        zIndex={5}
        fontSize={"0.85em"}
        padding={"10px"}
      >
        <Flex
          direction={"column"}
          justifyContent={"center"}
          gap={1}
          alignItems={"center"}
        >
          <MarkdownText>
            RealTime Digital Marketing is a demo application running on
            [**SingleStoreDB**](https://singlestore.com).
          </MarkdownText>

          <Flex
            direction={"row"}
            gap={8}
            fontWeight={"bold"}
            fontSize={"0.85em"}
          >
            <Flex
              direction={"row"}
              gap={1}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text>Repository</Text>
              <IconButton
                aria-label="Github Repo"
                size="sm"
                background={colorMode === "light" ? undefined : "black"}
                icon={
                  colorMode === "light" ? (
                    <VscGithub size="1.4em" />
                  ) : (
                    <VscGithubInverted size="1.4em" />
                  )
                }
                onClick={() =>
                  window.open(
                    "https://github.com/singlestore-labs/demo-realtime-digital-marketing",
                    "_blank"
                  )
                }
              />
            </Flex>

            <Flex
              direction={"row"}
              gap={1}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text>Share on</Text>
              <IconButton
                aria-label="Github Repo"
                size="sm"
                background={colorMode === "light" ? undefined : "black"}
                icon={<VscTwitter size="1em" />}
                onClick={() =>
                  window.open(
                    "https://github.com/singlestore-labs/demo-realtime-digital-marketing",
                    "_blank"
                  )
                }
              />
              <IconButton
                aria-label="Github Repo"
                size="sm"
                background={colorMode === "light" ? undefined : "black"}
                icon={<BsLinkedin size="1em" />}
                onClick={() =>
                  window.open(
                    "https://github.com/singlestore-labs/demo-realtime-digital-marketing",
                    "_blank"
                  )
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
