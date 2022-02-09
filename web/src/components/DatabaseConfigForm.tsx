import { MarkdownText } from "@/components/MarkdownText";
import { ScaleFactorSelector } from "@/components/ScaleFactorSelector";
import {
  connectionDatabase,
  connectionHost,
  connectionPassword,
  connectionUser,
} from "@/data/recoil";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useRecoilState } from "recoil";

type ConfigInputProps = {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  helpText?: ReactNode;
  type?: "text" | "password" | "number";
};

const ConfigInput = ({
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

type Props = {
  showDatabase?: boolean;
  showScaleFactor?: boolean;
};

export const DatabaseConfigForm = ({
  showDatabase,
  showScaleFactor,
}: Props) => {
  const [host, setHost] = useRecoilState(connectionHost);
  const [user, setUser] = useRecoilState(connectionUser);
  const [password, setPassword] = useRecoilState(connectionPassword);
  const [database, setDatabase] = useRecoilState(connectionDatabase);

  return (
    <Stack spacing={4}>
      <ConfigInput
        label="Host & Port"
        placeholder="http://127.0.0.1:8808"
        value={host}
        setValue={setHost}
        helpText={
          <MarkdownText>
            {`
              The protocol (http, https), host, and port for the SingleStore
              [HTTP API][1].

              [1]: https://docs.singlestore.com/docs/http-api/
            `}
          </MarkdownText>
        }
      />
      <SimpleGrid columns={2} gap={2}>
        <ConfigInput
          label="Username"
          placeholder="admin"
          value={user}
          setValue={setUser}
        />
        <ConfigInput
          label="Password"
          placeholder="•••••••••••"
          value={password}
          setValue={setPassword}
          type="password"
        />
        {showDatabase && (
          <ConfigInput
            label="Database"
            placeholder="s2cellular"
            value={database}
            setValue={setDatabase}
          />
        )}
        {showScaleFactor && <ScaleFactorSelector />}
      </SimpleGrid>
    </Stack>
  );
};
