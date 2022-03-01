import { ConfigInput } from "@/components/ConfigInput";
import { DatabaseConfigForm } from "@/components/DatabaseConfigForm";
import { DisconnectVaporButton } from "@/components/DisconnectVaporButton";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { useConnectionState } from "@/data/hooks";
import { simulatorEnabled, vaporBaseUrl } from "@/data/recoil";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Switch,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

type Props = {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose(): void;
};

export const DatabaseDrawer = ({ isOpen, onClose, finalFocusRef }: Props) => {
  const [isSimulatorEnabled, setSimulatorEnabled] =
    useRecoilState(simulatorEnabled);

  const { connected, initialized, isVapor } = useConnectionState();
  const [vaporUrl, setVaporUrl] = useRecoilState(vaporBaseUrl);

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
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Advanced
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <ConfigInput
                    label="Vapor Base URL"
                    value={vaporUrl}
                    placeholder="https://vapor.example.com"
                    setValue={setVaporUrl}
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stack>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
