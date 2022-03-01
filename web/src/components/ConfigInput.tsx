import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type ConfigInputProps = {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  helpText?: ReactNode;
  type?: "text" | "password" | "number";
};

export const ConfigInput = ({
  label,
  placeholder,
  value,
  setValue,
  helpText,
  type = "text",
}: ConfigInputProps) => (
  <FormControl>
    <FormLabel mb={1} fontSize="xs" fontWeight="bold" textTransform="uppercase">
      {label}
    </FormLabel>
    <Input
      size="sm"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
    {helpText ? (
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    ) : null}
  </FormControl>
);
