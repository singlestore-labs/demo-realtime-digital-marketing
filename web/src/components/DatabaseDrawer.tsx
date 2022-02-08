import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { useConnectionState } from "@/data/hooks";
import {
  configScaleFactor,
  connectionDatabase,
  connectionHost,
  connectionPassword,
  connectionUser,
  simulatorEnabled,
} from "@/data/recoil";
import { isScaleFactor, ScaleFactors } from "@/scalefactors";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Select,
  SimpleGrid,
  Stack,
  Switch,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";

type Props = {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose(): void;
};

type ConfigInputProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  helpText?: ReactNode;
  type?: "text" | "password" | "number";
};

const ConfigInput = ({
  id,
  label,
  placeholder,
  value,
  setValue,
  helpText,
  type = "text",
}: ConfigInputProps) => (
  <FormControl id={id}>
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

export const DatabaseDrawer = ({ isOpen, onClose, finalFocusRef }: Props) => {
  const [host, setHost] = useRecoilState(connectionHost);
  const [user, setUser] = useRecoilState(connectionUser);
  const [password, setPassword] = useRecoilState(connectionPassword);
  const [database, setDatabase] = useRecoilState(connectionDatabase);
  const [scaleFactor, setScaleFactor] = useRecoilState(configScaleFactor);
  const [isSimulatorEnabled, setSimulatorEnabled] =
    useRecoilState(simulatorEnabled);

  const { connected, initialized } = useConnectionState();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Config</DrawerHeader>

        <DrawerBody>
          <Stack spacing={4}>
            <ConfigInput
              id="host"
              label="Host & Port"
              placeholder="http://127.0.0.1:8808"
              value={host}
              setValue={setHost}
              helpText={
                <>
                  The protocol (http, https), host, and port for the SingleStore{" "}
                  <Link
                    isExternal
                    color="teal.500"
                    href="https://docs.singlestore.com/docs/http-api/"
                  >
                    HTTP API{" "}
                    <ExternalLinkIcon
                      bottom="2px"
                      boxSize="0.9em"
                      position="relative"
                    />
                  </Link>
                  .
                </>
              }
            />
            <SimpleGrid columns={2} gap={2}>
              <ConfigInput
                id="user"
                label="Username"
                placeholder="admin"
                value={user}
                setValue={setUser}
              />
              <ConfigInput
                id="password"
                label="Password"
                placeholder="•••••••••••"
                value={password}
                setValue={setPassword}
                type="password"
              />
              <ConfigInput
                id="database"
                label="Database"
                placeholder="s2cellular"
                value={database}
                setValue={setDatabase}
              />
              <FormControl id="scaleFactor">
                <FormLabel
                  mb={1}
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Scale Factor
                </FormLabel>
                <Select
                  size="sm"
                  required
                  value={scaleFactor}
                  onChange={(ev) => {
                    const v = ev.target.value;
                    if (isScaleFactor(v)) {
                      setScaleFactor(v);
                    }
                  }}
                >
                  {Object.keys(ScaleFactors)
                    .sort()
                    .map((f) => (
                      <option value={f} key={f}>
                        {f}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </SimpleGrid>
            <Alert status={connected ? "success" : "error"} borderRadius="md">
              <AlertIcon />
              <AlertTitle>
                {connected ? "connected" : "disconnected"}
              </AlertTitle>
            </Alert>
            <Alert
              status={initialized ? "success" : "warning"}
              borderRadius="md"
            >
              <AlertIcon />
              <AlertTitle>schema</AlertTitle>
              <ResetSchemaButton
                position="absolute"
                right={4}
                top={3}
                size="xs"
                colorScheme={initialized ? "green" : "red"}
              >
                {initialized ? "Reset" : "Setup"}
              </ResetSchemaButton>
            </Alert>
            <Alert
              status={isSimulatorEnabled ? "success" : "warning"}
              borderRadius="md"
            >
              <AlertIcon />
              <AlertTitle>simulator</AlertTitle>
              <Switch
                position="absolute"
                right={4}
                top={3.5}
                size="md"
                colorScheme={isSimulatorEnabled ? "green" : "red"}
                isChecked={isSimulatorEnabled}
                disabled={!connected || !initialized}
                onChange={() => setSimulatorEnabled(!isSimulatorEnabled)}
              />
            </Alert>
          </Stack>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
