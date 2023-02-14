import "@fontsource/inter/variable-full.css";
import "@fontsource/source-code-pro/variable.css";

import { extendTheme, Theme, theme as origTheme } from "@chakra-ui/react";

export const chakraTheme = extendTheme({
  fonts: {
    heading: "InterVariable, sans-serif",
    body: "InterVariable, sans-serif",
    mono: '"Source Code ProVariable", monospace',
  },
  styles: {
    global: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
      a: {
        color: colorMode === "light" ? "#553ACF" : "#CCC3F9",
      },
    }),
  },
  components: {
    Link: {
      baseStyle: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
        color: colorMode === "light" ? "#553ACF" : "#CCC3F9",
      }),
    },
    Alert: {
      variants: {
        solid: (props: {
          colorScheme: string;
          colorMode: "light" | "dark";
          theme: Theme;
        }) => {
          // only applies to `solid` variant
          const { colorScheme: c, colorMode } = props;
          if (c !== "blue") {
            // use original definition for all color schemes except "blue"
            return origTheme.components.Alert.variants.solid(props);
          }
          return {
            container: {
              bg: colorMode === "light" ? "#553ACF" : "#CCC3F9",
            },
          };
        },
      },
    },
  },
});
