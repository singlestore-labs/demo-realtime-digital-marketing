import {
  Button,
  ButtonOptions,
  HTMLChakraProps,
  ThemingProps,
} from "@chakra-ui/react";

export interface Props
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    ThemingProps<"Button"> {}

export const DisconnectVaporButton = (props: Props) => (
  <Button
    onClick={() => {
      const { pathname, hash } = window.location;
      window.location.replace(pathname + hash);
    }}
    colorScheme="red"
    {...props}
  >
    Disconnect
  </Button>
);
