import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { BsGithub } from "react-icons/bs";

export interface IPropTypes {
  owner: string;
  repo: string;
  color?: string;
}

export const GithubStargazer: React.FC<IPropTypes> = ({ owner, repo }) => {
  const [stargazersCount, setStargazersCount] = React.useState(0);

  const handleFlexRedirects = () => {
    window.open(`https://github.com/${owner}/${repo}`, "_blank");
  };

  React.useEffect(() => {
    const getCount = async () => {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      const resJson = await res.json();
      setStargazersCount(resJson.stargazers_count);
    };
    getCount();
  }, [owner, repo]);

  return (
    <Flex
      alignItems="center"
      justifyContent="right"
      gap={0}
      margin={0}
      padding={0}
      onClick={handleFlexRedirects}
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
