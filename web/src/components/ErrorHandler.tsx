import { SQLError } from "@/data/client";
import { RepeatIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Center, Code, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import dedent from "ts-dedent";

type State = {
  error?: Error;
};

export class ErrorBoundary extends React.Component<unknown, State> {
  state: State = {};

  constructor() {
    super(undefined);
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
    this.setState({ error: ev.reason });
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      let info;
      if (error instanceof SQLError) {
        info = (
          <>
            <Text>An error occurred while running the following query:</Text>
            <Center>
              <Code display="block" whiteSpace="pre" textAlign="left" p={6}>
                {dedent(error.sql)}
              </Code>
            </Center>
          </>
        );
      }

      return (
        <Stack textAlign="center" mt={10} gap={4}>
          <Box textAlign="center">
            <WarningTwoIcon boxSize={20} color="red" />
          </Box>
          <Stack gap={2}>
            <Heading size="xl">{error.message}</Heading>
            {info}
          </Stack>
          <Heading
            onClick={() => window.location.reload()}
            color="blue.500"
            _hover={{ cursor: "pointer", color: "blue.400" }}
            size="sm"
          >
            <RepeatIcon mr={2} position="relative" bottom="1px" />
            Reload
          </Heading>
        </Stack>
      );
    }

    return this.props.children;
  }
}
