import { extendTheme, useColorMode } from "@chakra-ui/react";
import "@fontsource/inter/variable-full.css";
import "@fontsource/source-code-pro/variable.css";

export const chakraTheme = extendTheme({
  fonts: {
    heading: "InterVariable, sans-serif",
    body: "InterVariable, sans-serif",
    mono: '"Source Code ProVariable", monospace',
  },
  components: {
    Link: {
      baseStyle: (props: { colorMode: "light" | "dark" }) => ({
        color: props.colorMode === "light" ? "#553ACF" : "#CCC3F9",
      }),
    },
    button: {
      style: (props: { colorMode: "light" | "dark" }) => ({
        background: props.colorMode === "light" ? "#4F34C7" : "#CCC3F9",
        color: props.colorMode === "light" ? "#FFFFFF" : "#2F206E"
      })
    }
  }
});