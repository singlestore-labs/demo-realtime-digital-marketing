import { useConnectionState } from "@/data/hooks";
import { resetSchema } from "@/data/queries";
import {
  connectionConfig,
  connectionDatabase,
  connectionHost,
  connectionPassword,
  connectionUser,
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
  Badge,
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
  Spinner,
  Stack,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

type Props = {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose(): void;
};

// TODO: show connection status details in the drawer

export const DatabaseDrawer = ({ isOpen, onClose, finalFocusRef }: Props) => {
  const [host, setHost] = useRecoilState(connectionHost);
  const [user, setUser] = useRecoilState(connectionUser);
  const [password, setPassword] = useRecoilState(connectionPassword);
  const [database, setDatabase] = useRecoilState(connectionDatabase);
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
  }, [
    config,
    resetConnectionState,
    resetSchemaDialog,
    resettingSchemaCtrl,
    toast,
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
        <DrawerHeader>Connection Details</DrawerHeader>

        <DrawerBody>
          <Stack spacing={4}>
            <FormControl id="host">
              <FormLabel fontSize="sm" fontWeight="bold">
                Host & Port
              </FormLabel>
              <Input
                placeholder="http://127.0.0.1:8808"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
              <FormHelperText>
                The protocol (http, https), host, and port for the SingleStore{" "}
                <Link
                  isExternal
                  color="teal.500"
                  href="https://docs.singlestore.com/managed-service/en/reference/http-api.html"
                >
                  HTTP API{" "}
                  <ExternalLinkIcon
                    bottom="2px"
                    boxSize="0.9em"
                    position="relative"
                  />
                </Link>
                .
              </FormHelperText>
            </FormControl>
            <FormControl id="user">
              <FormLabel fontSize="sm" fontWeight="bold">
                Username
              </FormLabel>
              <Input
                placeholder="admin"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" label="password">
              <FormLabel fontSize="sm" fontWeight="bold">
                Password
              </FormLabel>
              <Input
                type="password"
                placeholder="•••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="database" label="database">
              <FormLabel fontSize="sm" fontWeight="bold">
                Database
              </FormLabel>
              <Input
                placeholder="s2cellular"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
              />
            </FormControl>
            <Alert status={connected ? "success" : "error"} borderRadius="md">
              <AlertIcon />
              <AlertTitle>
                {connected ? "connected" : "disconnected"}
              </AlertTitle>
            </Alert>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          {connected ? (
            <Badge size="lg" mr={4} colorScheme={initialized ? "green" : "red"}>
              {initialized ? "ready!" : "needs schema"}
            </Badge>
          ) : null}
          <Button disabled={!connected} onClick={resetSchemaDialog.onOpen}>
            Reset Schema
          </Button>
        </DrawerFooter>
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
              Reset Schema
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can&lsquo;t undo this action afterwards.
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
