import { Button, ButtonProps, useColorMode } from "@chakra-ui/react";

type customButtonProps = Omit<ButtonProps, "color" | "background">;

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
      color={color}
      background={background}
      colorScheme="purple.900"
      {...props}
    />
  );
};
