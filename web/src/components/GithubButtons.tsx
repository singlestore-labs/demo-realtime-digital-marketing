import React, { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { Flex, useColorMode } from "@chakra-ui/react";

export interface IPropTypes {
  owner: string;
  repo: string;
  color?: string;
}

export const GithubStargazer: React.FC<IPropTypes> = (props) => {
  const { owner, repo } = props;
  const { colorMode } = useColorMode();
  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      const resJson = await res.json();
      setStargazersCount(resJson.stargazers_count);
    };
    getCount();
  }, [owner, repo]);

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"right"}
      gap={0}
      margin={0}
      padding={0}
      onClick={() =>
        window.open(`https://github.com/${owner}/${repo}`, "_blank")
      }
    >
      <Flex gap={0} justifyContent={"center"} margin={0} padding={0}>
        <Flex
          alignItems={"center"}
          gap={1}
          border={"1px solid"}
          borderRight={"none"}
          borderColor={colorMode === "light" ? "#ddddde" : "#444b5b"}
          borderLeftRadius={"5px"}
          padding={"3px 8px 3px 8px"}
          color={colorMode == "light" ? "black" : "white"}
          backgroundColor={colorMode == "light" ? "#f1f6f7" : "black"}
        >
          <BsGithub />
          star
        </Flex>
        <Flex
          alignItems={"center"}
          gap={1}
          border={"1px solid"}
          borderColor={colorMode === "light" ? "#ddddde" : "#444b5b"}
          borderRightRadius={"5px"}
          paddingLeft={2}
          paddingRight={2}
          color={colorMode == "light" ? "black" : "white"}
          backgroundColor={colorMode == "light" ? "white" : "black"}
        >
          {stargazersCount}
        </Flex>
      </Flex>
    </Flex>
  );
};
