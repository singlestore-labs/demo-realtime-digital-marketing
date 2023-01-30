

import { RepeatIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import dedent from "ts-dedent";

import { CodeBlock } from "@/components/CodeBlock";
import { SQLError } from "@/data/client";
import { resettingSchema } from "@/data/recoil";

type Props = {
  isResettingSchema?: boolean;
  children?: ReactNode;
};

type State = {
  error?: Error;
};

export const ClientErrorBoundary = ({ children }: { children: ReactNode }) => {
  const isResettingSchema = useRecoilValue(resettingSchema);
  return (
    <ErrorBoundary isResettingSchema={isResettingSchema}>
      {children}
    </ErrorBoundary>
  );
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {};

  constructor(props: Props) {
    super(props);
    this.handlePromiseRejection = this.handlePromiseRejection.bind(this);
  }

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.handlePromiseRejection);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.handlePromiseRejection
    );
  }

  handlePromiseRejection(ev: PromiseRejectionEvent) {
    if (this.props.isResettingSchema) {
      console.warn("Ignoring error while resetting schema", ev.reason);
    } else {
      this.setState({ error: ev.reason });
    }
  }

  componentDidCatch(error: Error) {
    if (this.props.isResettingSchema) {
      console.warn("Ignoring error while resetting schema", error);
    } else {
      this.setState({ error });
    }
  }

  render() {
    const { error } = this.state;
    if (error) {
      let info;
      if (error instanceof SQLError) {
        info = (
          <>
            <Text textAlign="center">
              An error occurred while running the following query:
            </Text>
            <CodeBlock>{dedent(error.sql)}</CodeBlock>
          </>
        );
      }

      return (
        <Container maxW="container.md" my={10}>
          <Stack gap={4}>
            <Center>
              <WarningTwoIcon boxSize={20} color="red" />
            </Center>
            <Heading size="xl" textAlign="center">
              {error.message}
            </Heading>
            {info}
            <HStack justify="center" gap={4}>
              <Button
                onClick={() => this.setState({ error: undefined })}
                size="sm"
              >
                Dismiss Error
              </Button>
              <Button
                onClick={() => window.location.reload()}
                size="sm"
                colorScheme="blue"
                leftIcon={<RepeatIcon />}
              >
                Reload
              </Button>
            </HStack>
          </Stack>
        </Container>
      );
    }

    return this.props.children;
  }
}
