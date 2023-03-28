import {
  ColorMode,
  extendTheme,
  Theme,
  theme as origTheme,
} from "@chakra-ui/react";

import "@fontsource/inter/variable-full.css";
import "@fontsource/source-code-pro/variable.css";

export const chakraTheme = extendTheme({
  colors: {
    indigo: {
      50: "#F7F6FE",
      100: "#ECE8FD",
      200: "#DCD5FB",
      300: "#CCC3F9",
      400: "#B0A0F8",
      500: "#7760E1",
      600: "#553ACF",
      700: "#472EB7",
      800: "#3A249E",
      900: "#2F206E",
    }
  },
  fonts: {
    heading: "InterVariable, sans-serif",
    body: "InterVariable, sans-serif",
    mono: '"Source Code ProVariable", monospace',
  },
  styles: {
    global: ({ colorMode }: { colorMode: ColorMode }) => ({
      a: {
        color: colorMode === "light" ? "indigo.600" : "indigo.300",
      },
    }),
  },
  components: {
    Link: {
      baseStyle: ({ colorMode }: { colorMode: ColorMode }) => ({
        color: colorMode === "light" ? "indigo.600" : "indigo.300",
      }),
    },
    Button: {
      variants: {
        solid: {
          _focus: {
            border: 0,
            "box-shadow": "0 0 0 3px currentColor",
          },
        },
      },
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
              bg: colorMode === "light" ? "indigo.600" : "indigo.300",
            },
          };
        },
      },
    },
  },
});
