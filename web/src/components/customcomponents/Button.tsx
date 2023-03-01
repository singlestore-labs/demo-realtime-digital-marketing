import { Button, ButtonProps, useColorMode } from "@chakra-ui/react";
import * as React from "react";

// To make primaryt consistant everywhere we will not allow user to change color theme.
// To have custome button we can directly use Button component.
type customButtonProps = Omit<
  ButtonProps,
  "color" | "background" | "colorSchema"
>;

export const PrimaryButton = (props: customButtonProps) => {
  const { colorMode } = useColorMode();
  let background = "#ECE8FD";
  let color = "#553ACF";
  if (colorMode === "dark") {
    background = "#2F206E";
    color = "#ECE8FD";
  }
  return (
    <Button
      style={{
        color,
        background,
      }}
      {...props}
    />
  );
};
