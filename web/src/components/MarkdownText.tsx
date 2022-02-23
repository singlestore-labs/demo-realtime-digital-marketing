import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown, { Components } from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import dedent from "ts-dedent";

const theme: Components = ChakraUIRenderer({
  a: ({ children, ...props }) => {
    const isExternal = !!props.href?.startsWith("http");
    return (
      <Link isExternal={isExternal} {...props}>
        {children}
        {isExternal && (
          <ExternalLinkIcon
            bottom="2px"
            boxSize="0.9em"
            position="relative"
            ml={1}
          />
        )}
      </Link>
    );
  },
});

type Props = {
  children: string | (string | false | undefined | null)[];
} & Omit<ReactMarkdownOptions, "children">;

export const MarkdownText = ({ children, ...props }: Props) => {
  return (
    <ReactMarkdown {...props} skipHtml components={theme}>
      {Array.isArray(children)
        ? children
            .filter((x) => x)
            .map((child) => dedent(child || ""))
            .join("\n\n")
        : dedent(children)}
    </ReactMarkdown>
  );
};
