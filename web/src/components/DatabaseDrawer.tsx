import { DatabaseConfigForm } from "@/components/DatabaseConfigForm";
import { DisconnectVaporButton } from "@/components/DisconnectVaporButton";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { useConnectionState } from "@/data/hooks";
import { dropDatabase } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Alert,
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
  Stack,
  Switch,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

type Props = {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose(): void;
};

export const DatabaseDrawer = ({ isOpen, onClose, finalFocusRef }: Props) => {
  const [isSimulatorEnabled, setSimulatorEnabled] =
    useRecoilState(simulatorEnabled);

  const config = useRecoilValue(connectionConfig);
  const { connected, initialized, isVapor } = useConnectionState();
  const advancedMenu = useDisclosure();
  const [droppingDatabase, droppingDatabaseCtrl] = useBoolean(false);

  const onDropDatabase = useCallback(async () => {
    droppingDatabaseCtrl.on();
    await dropDatabase(config);
    droppingDatabaseCtrl.off();
  }, [config, droppingDatabaseCtrl]);

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
            {isVapor ? null : (
              <DatabaseConfigForm showScaleFactor showDatabase />
            )}
            <Alert status={connected ? "success" : "error"} borderRadius="md">
              <AlertIcon />
              <AlertTitle>
                {connected ? "connected" : "disconnected"}
              </AlertTitle>
              {isVapor ? (
                <DisconnectVaporButton
                  position="absolute"
                  right={4}
                  top={3}
                  size="xs"
                />
              ) : null}
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
            <Text
              onClick={advancedMenu.onToggle}
              fontSize="xs"
              textAlign="center"
              cursor="pointer"
            >
              Advanced
              {advancedMenu.isOpen ? (
                <ChevronUpIcon ml={2} />
              ) : (
                <ChevronDownIcon ml={2} />
              )}
            </Text>
            {advancedMenu.isOpen ? (
              <Button
                size="xs"
                _hover={{ colorScheme: "red" }}
                onClick={onDropDatabase}
                disabled={droppingDatabase}
              >
                Drop Database
              </Button>
            ) : undefined}
          </Stack>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
