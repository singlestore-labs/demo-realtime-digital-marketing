import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown, { Components } from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { NavLink as RouterLink } from "react-router-dom";
import dedent from "ts-dedent";

const theme: Components = ChakraUIRenderer({
  a: ({ children, ...props }) => {
    const { href } = props;
    const isExternal = !!href?.startsWith("http");
    if (isExternal) {
      return (
        <Link isExternal={isExternal} {...props}>
          {children}
          <ExternalLinkIcon
            bottom="2px"
            boxSize="0.9em"
            position="relative"
            ml={1}
          />
        </Link>
      );
    } else {
      return (
        <Link to={href || ""} {...props} as={RouterLink}>
          {children}
        </Link>
      );
    }
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
