import { useConnectionState } from "@/data/hooks";
import { resetSchema } from "@/data/queries";
import {
  configScaleFactor,
  connectionConfig,
  connectionDatabase,
  connectionHost,
  connectionPassword,
  connectionUser,
  ScaleFactors,
  simulatorEnabled,
} from "@/data/recoil";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Button,
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
  Spinner,
  Stack,
  Switch,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { ReactNode, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

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

  const config = useRecoilValue(connectionConfig);
  const {
    connected,
    initialized,
    reset: resetConnectionState,
  } = useConnectionState();

  const resetSchemaDialog = useDisclosure();
  const [resettingSchema, resettingSchemaCtrl] = useBoolean();
  const cancelResetSchemaBtn = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const onResetSchema = useCallback(async () => {
    const simulatorEnabledBefore = isSimulatorEnabled;
    setSimulatorEnabled(false);
    resettingSchemaCtrl.on();
    await resetSchema(config, (title, status) => {
      const id = "reset-schema";
      if (toast.isActive(id)) {
        toast.update(id, {
          title,
          status,
          duration: 3000,
          isClosable: status === "success",
        });
      } else {
        toast({ id, title, status });
      }
    });
    resettingSchemaCtrl.off();
    resetSchemaDialog.onClose();
    resetConnectionState();
    setSimulatorEnabled(simulatorEnabledBefore);
  }, [
    config,
    resetConnectionState,
    resetSchemaDialog,
    resettingSchemaCtrl,
    toast,
    isSimulatorEnabled,
    setSimulatorEnabled,
  ]);

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
                    if (v === "small" || v === "large") {
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
              <Button
                position="absolute"
                right={4}
                top={3}
                size="xs"
                colorScheme={initialized ? "green" : "red"}
                disabled={!connected}
                onClick={resetSchemaDialog.onOpen}
              >
                {initialized ? "Reset" : "Setup"}
              </Button>
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
      <AlertDialog
        isOpen={resetSchemaDialog.isOpen}
        onClose={resetSchemaDialog.onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        leastDestructiveRef={cancelResetSchemaBtn}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {initialized ? "Reset" : "Setup"} {database}
            </AlertDialogHeader>
            <AlertDialogBody>
              This will {initialized ? "recreate" : "create"} database{" "}
              {database}. Are you sure?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelResetSchemaBtn}
                onClick={resetSchemaDialog.onClose}
                disabled={resettingSchema}
              >
                Cancel
              </Button>
              <Button
                disabled={resettingSchema}
                colorScheme="red"
                onClick={onResetSchema}
                ml={3}
              >
                {resettingSchema ? <Spinner /> : "Reset Schema"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Drawer>
  );
};
