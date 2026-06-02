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
    // SingleStore 2026 Official Brand Colors
    // Primary: Purple 700 (#820DDF) as primary accent
    purple: {
      50: "#F9F5FF",
      100: "#F3EBFF",
      200: "#E6D6FF",
      300: "#D4B8FF",
      400: "#B88FFF",
      500: "#9D66FF",
      600: "#9040FF",
      700: "#820DDF",  // Primary brand color
      800: "#6B0AB8",
      900: "#550891",
    },
  },
  fonts: {
    heading: "InterVariable, sans-serif",
    body: "InterVariable, sans-serif",
    mono: '"Source Code ProVariable", monospace',
  },
  styles: {
    global: ({ colorMode }: { colorMode: ColorMode }) => ({
      a: {
        color: colorMode === "light" ? "purple.700" : "purple.300",
      },
    }),
  },
  components: {
    Link: {
      baseStyle: ({ colorMode }: { colorMode: ColorMode }) => ({
        color: colorMode === "light" ? "purple.700" : "purple.300",
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
              bg: colorMode === "light" ? "purple.700" : "purple.300",
            },
          };
        },
      },
    },
    Switch: {
      variants: {
        simulator: ({ colorMode }: { colorMode: ColorMode }) => ({
          track: {
            _checked: {
              bg: colorMode === "light" ? "black" : "white",
            },
          },
          thumb: {
            bg: colorMode === "light" ? "white" : "black",
          },
        }),
      },
    },
    Tooltip: {
      variants: {
        simulator: ({ colorMode }: { colorMode: ColorMode }) => ({
          bg: colorMode === "light" ? "#171923" : "#F3F3F5",
        }),
      },
    },
  },
});
