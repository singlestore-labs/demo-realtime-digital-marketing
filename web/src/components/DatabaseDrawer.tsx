import { trackAnalyticsEvent } from "@/analytics";
import { DatabaseConfigForm } from "@/components/DatabaseConfigForm";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { useConnectionState } from "@/data/hooks";
import { dropDatabase, setSessionController } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useSession } from "@/data/useSession";
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
  const { session, refresh: refreshSession } = useSession();

  const simEnabled = isSimulatorEnabled && session.isController;

  const config = useRecoilValue(connectionConfig);
  const { connected, initialized } = useConnectionState();
  const advancedMenu = useDisclosure();

  const [togglingSimulator, togglingSimulatorControl] = useBoolean(false);
  const onToggleSimulator = useCallback(async () => {
    togglingSimulatorControl.on();

    const newSimEnabled = !(isSimulatorEnabled && session.isController);
    setSimulatorEnabled(newSimEnabled);
    await setSessionController(config, session.sessionID, newSimEnabled);

    refreshSession();
    togglingSimulatorControl.off();
  }, [
    config,
    isSimulatorEnabled,
    refreshSession,
    session.isController,
    session.sessionID,
    setSimulatorEnabled,
    togglingSimulatorControl,
  ]);

  const [droppingDatabase, droppingDatabaseCtrl] = useBoolean(false);
  const onDropDatabase = useCallback(async () => {
    trackAnalyticsEvent("drop-database");
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
            <DatabaseConfigForm showScaleFactor showDatabase />
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
              >
                {initialized ? "Reset" : "Setup"}
              </ResetSchemaButton>
            </Alert>
            <Alert
              status={simEnabled ? "success" : "warning"}
              borderRadius="md"
            >
              <AlertIcon />
              <AlertTitle>simulator</AlertTitle>
              <Switch
                position="absolute"
                right={4}
                top={3.5}
                size="md"
                colorScheme={simEnabled ? "green" : "red"}
                isChecked={simEnabled}
                disabled={!connected || !initialized || togglingSimulator}
                onChange={onToggleSimulator}
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
