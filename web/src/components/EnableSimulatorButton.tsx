import { InfoIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormControlProps,
  FormLabel,
  Switch,
  SwitchProps,
  Text,
  Tooltip,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { trackAnalyticsEvent } from "@/analytics";
import { setSessionController } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useConnectionState, useMountedCallback } from "@/view/hooks/hooks";
import { useSession } from "@/view/hooks/useSession";

export const EnableSimulatorWarning = () => {
  return (
    <Alert status="warning" borderRadius="md">
      <AlertIcon />
      <Box display="flex" flexDirection="column">
        <AlertTitle>The simulator is disabled</AlertTitle>
        <AlertDescription>
          This application uses a simulator to generate new data like live
          notifications and subscribers. To experience the full power of
          real-time digital marketing, please enable the simulator in the nav
          bar.
        </AlertDescription>
      </Box>
    </Alert>
  );
};

export const SimulatorToggler = ({
  switchProps,
  containerProps,
}: {
  switchProps?: SwitchProps;
  containerProps?: FormControlProps;
}) => {
  const [enabled, setEnabled] = useRecoilState(simulatorEnabled);
  const { session, refresh: refreshSession } = useSession();
  const config = useRecoilValue(connectionConfig);
  const { connected, initialized } = useConnectionState();
  const [toggling, togglingCtrl] = useBoolean(false);

  const stopSpinner = useMountedCallback(
    () => togglingCtrl.off,
    [togglingCtrl]
  );

  const onToggleSimulator = React.useCallback(
    async (state: boolean) => {
      togglingCtrl.on();
      if (state) {
        trackAnalyticsEvent("enable-simulator");
      } else {
        trackAnalyticsEvent("disable-simulator");
      }

      if (connected && initialized) {
        await setSessionController(config, session.sessionID, state);
      }
      setEnabled(state);

      refreshSession();
      stopSpinner();
      togglingCtrl.off();
    },
    [
      config,
      connected,
      togglingCtrl,
      initialized,
      refreshSession,
      session.sessionID,
      setEnabled,
      stopSpinner,
    ]
  );

  return (
    <FormControl {...containerProps} gap={3}>
      <FormLabel
        htmlFor="simulatorSwitch"
        fontSize="xs"
        fontWeight="bold"
        display="inline"
        padding={0}
        margin={0}
      >
        Simulator{" "}&nbsp;
        <InfoIcon fontSize="1.1em" />
      </FormLabel>
      <Switch
        id="simulatorSwitch"
        disabled={toggling}
        isChecked={enabled}
        onChange={() => onToggleSimulator(!enabled)}
        {...switchProps}
      />
    </FormControl>
  );
};

export const SimulatorButton = () => {
  return (
    <Tooltip
      variant="simulator"
      label={
        <Text>
          The simulator generates live notifications and subscribers even if the
          application browser window is closed. Toggle off to stop new data
          generation or suspend cluster in SingleStoreDB portal.
        </Text>
      }
      hasArrow
      textAlign="center"
    >
      <Button
        style={{
          color: useColorModeValue("black", "white"),
          backgroundColor: useColorModeValue("#DCD5FB", "#3A249E"),
          border: "none",
          boxShadow: "none",
        }}
        padding="8px 18px 8px 18px"
        size="sm"
      >
        <SimulatorToggler
          switchProps={{ size: "sm", variant: "simulator" }}
          containerProps={{ display: "flex", alignItems: "center" }}
        />
      </Button>
    </Tooltip>
  );
};
