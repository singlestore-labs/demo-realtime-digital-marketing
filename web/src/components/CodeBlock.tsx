import { Code, HTMLChakraProps, ThemingProps } from "@chakra-ui/react";

export interface Props extends HTMLChakraProps<"code">, ThemingProps<"Code"> {}

export const CodeBlock = (props: Props) => (
  <Code
    as="pre"
    borderRadius="md"
    display="block"
    overflow="auto"
    whiteSpace="pre"
    px={6}
    py={4}
    {...props}
  />
);
