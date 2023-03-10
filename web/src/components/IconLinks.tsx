import {
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { BsLinkedin } from "react-icons/bs";
import { VscGithub, VscGithubInverted, VscTwitter } from "react-icons/vsc";

type customeIconProps = Omit<
  IconButtonProps,
  "Background" | "icon" | "value" | "aria-label"
>;

export const TwitterIconButton = (props: customeIconProps) => {
  const url = `https://digital-marketing.labs.singlestore.com/`;
  const text = `Exciting MarTech demo application from SingleStoreDB showcasing its unique capabilities! As a demo app, it gives you a taste of what's possible when using SingleStoreDB for your own projects. \
	#SingleStoreDB #database #digitalmarketing #appdevelopment `;

  return (
    <IconButton
      aria-label="Twitter share"
      background={useColorModeValue(undefined, "black")}
      icon={<VscTwitter size="1em" />}
      value={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`}
      {...props}
    />
  );
};

export const LinkedinIconButton = (props: customeIconProps) => {
  const url = "https://digital-marketing.labs.singlestore.com/";

  return (
    <IconButton
      aria-label="Linkedin share"
      background={useColorModeValue(undefined, "black")}
      icon={<BsLinkedin size="1em" />}
      value={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`}
      {...props}
    />
  );
};

export const GithubIconButton = (props: customeIconProps) => {
  const url =
    "https://github.com/singlestore-labs/demo-realtime-digital-marketing";
  const gitHubIconButton = useColorModeValue(
    <VscGithub size="1.2em" />,
    <VscGithubInverted size="1.2em" />
  );

  return (
    <IconButton
      aria-label="Github Repo"
      background={useColorModeValue(undefined, "black")}
      icon={gitHubIconButton}
      value={url}
      {...props}
    />
  );
};
