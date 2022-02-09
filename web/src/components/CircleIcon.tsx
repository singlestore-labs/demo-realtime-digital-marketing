import { Icon, IconProps } from "@chakra-ui/react";

export const CircleIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <circle fill="currentColor" cx="12" cy="12" r="12" />
  </Icon>
);
