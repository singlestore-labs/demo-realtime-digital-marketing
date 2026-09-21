import { Flex, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { BsGithub } from "react-icons/bs";

export const GitStargazerLogo = () => {
  return (
    <Flex
      alignItems="center"
      gap={1}
      fontSize="0.9em"
      border="1.5px solid"
      borderRight="none"
      borderColor={useColorModeValue("#E6D6FF", "#360061")}
      borderLeftRadius="5px"
      padding="3px 10px 3px 10px"
      color={useColorModeValue("black", "white")}
      backgroundColor={useColorModeValue("#E6D6FF", "#360061")}
    >
      <BsGithub />
      star
    </Flex>
  );
};
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

  React.useEffect(() => {
    const getStarCount = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repoName}`
        );
        if (res.ok) {
          const resJson = await res.json();
          setStargazersCount(resJson.stargazers_count || 0);
        }
      } catch (error) {
        // Silently fail - star count is not critical
        console.debug("GitHub star count fetch failed:", error);
      }
    };
    getStarCount();
  }, [owner, repoName]);

  return (
    <Flex
      gap={0}
      justifyContent="center"
      margin={0}
      padding={0}
      cursor="pointer"
      onClick={handleFlexRedirect}
    >
      <GitStargazerLogo />
      <Flex
        alignItems="center"
        gap={1}
        border="0.12em solid"
        borderColor={useColorModeValue("#E6D6FF", "#360061")}
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
  );
};
