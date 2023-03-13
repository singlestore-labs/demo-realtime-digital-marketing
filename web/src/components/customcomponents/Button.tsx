import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

// To make the primary button consistant everywhere we will not allow user to change color theme.
// To have custom theme button we can directly use Button component.
type customButtonProps = Omit<
  ButtonProps,
  "color" | "background" | "colorSchema"
>;

export const PrimaryButton = (props: customButtonProps) => {
  return (
    <Button
      style={{
        color: useColorModeValue("#553ACF", "#ECE8FD"),
        background: useColorModeValue("#ECE8FD", "#2F206E"),
      }}
      {...props}
    />
  );
};

export const InvertedPrimaryButton = (props: customButtonProps) => {
  return (
    <Button
      style={{
        color: useColorModeValue("#FFFFFF", "#2F206E"),
        background: useColorModeValue("#553ACF", "#CCC3F9"),
      }}
      {...props}
    />
  );
};
