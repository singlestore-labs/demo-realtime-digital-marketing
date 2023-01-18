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
                    <VscGithub size="1.2em" />
                  ) : (
                    <VscGithubInverted size="1.2em" />
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
                    "https://twitter.com/intent/tweet?text=Exciting%20MarTech%20demo%20application%20from%20SingleStoreDB%20showcasing%20its%20unique%20capabilities!%20As%20a%20demo%20app%2C%20it%20gives%20you%20a%20taste%20of%20what%27s%20possible%20when%20using%20SingleStoreDB%20for%20your%20own%20projects%2C%20https%3A%2F%2Fdigital-marketing.labs.singlestore.com.%20%0A%0A%23SingleStoreDB%20%23database%20%23digitalmarketing%20%23appdevelopment%20",
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
                    "https://www.linkedin.com/sharing/share-offsite/?url=https://www.figma.com/file/zLZinfGmhUmnA6fWJedQVc/RealTime-Digital-Marketing-App?node-id=887%3A18691&t=x2neHA3Rtfjx7ooc-4",
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
