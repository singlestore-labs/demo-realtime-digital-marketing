import { Flex, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { BsGithub } from "react-icons/bs";

export interface GithubStargazerProps {
  owner: string;
  repoName: string;
  color?: string;
}

export const GithubStargazer: React.FC<GithubStargazerProps> = ({
  owner,
  repoName,
}) => {
  const [stargazersCount, setStargazersCount] = React.useState(0);

  const handleFlexRedirect = () => {
    window.open(`https://github.com/${owner}/${repoName}`, "_blank");
  };

  const getStarCount = async () => {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}`
    );
    const resJson = await res.json();
    setStargazersCount(resJson.stargazers_count);
  };
  getStarCount();

  return (
    <Flex
      alignItems="center"
      justifyContent="right"
      gap={0}
      margin={0}
      padding={0}
      onClick={handleFlexRedirect}
    >
      <Flex
        gap={0}
        justifyContent="center"
        margin={0}
        padding={0}
        cursor="pointer"
      >
        <Flex
          alignItems="center"
          gap={1}
          fontSize="0.9em"
          border="1.5px solid"
          borderRight="none"
          borderColor={useColorModeValue("#DCD5FB", "#3A249E")}
          borderLeftRadius="5px"
          padding="3px 10px 3px 10px"
          color={useColorModeValue("black", "white")}
          backgroundColor={useColorModeValue("#DCD5FB", "#3A249E")}
        >
          <BsGithub />
          star
        </Flex>
        <Flex
          alignItems="center"
          gap={1}
          border="0.12em solid"
          borderColor={useColorModeValue("#DCD5FB", "#3A249E")}
          borderRightRadius="5px"
          paddingLeft={3}
          paddingRight={3}
          color={useColorModeValue("black", "white")}
          backgroundColor="transparent"
          fontSize="0.9em"
        >
          {stargazersCount}
        </Flex>
      </Flex>
    </Flex>
  );
};
