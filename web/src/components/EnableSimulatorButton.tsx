import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { trackAnalyticsEvent } from "@/analytics";
import { setSessionController } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useConnectionState, useMountedCallback } from "@/view/hooks/hooks";
import { useSession } from "@/view/hooks/useSession";

export const EnableSimulatorButton = () => {
  const setEnabled = useSetRecoilState(simulatorEnabled);
  const { session, refresh: refreshSession } = useSession();
  const config = useRecoilValue(connectionConfig);
  const { connected, initialized } = useConnectionState();

  const [enabling, enablingCtrl] = useBoolean(false);
  const stopSpinner = useMountedCallback(
    () => enablingCtrl.off,
    [enablingCtrl]
  );
  const onEnableSimulator = React.useCallback(async () => {
    enablingCtrl.on();
    trackAnalyticsEvent("enable-simulator");

    if (connected && initialized) {
      await setSessionController(config, session.sessionID, true);
    }
    setEnabled(true);

    refreshSession();
    stopSpinner();
  }, [
    config,
    connected,
    enablingCtrl,
    initialized,
    refreshSession,
    session.sessionID,
    setEnabled,
    stopSpinner,
  ]);

  return (
    <Alert status="warning" borderRadius="md">
      <AlertIcon />
      <AlertTitle>The simulator is disabled</AlertTitle>
      <Button
        position="absolute"
        right={4}
        top={3}
        size="xs"
        background={useColorModeValue("#ECE8FD", "#2F206E")}
        color={useColorModeValue("#553ACF", "#ECE8FD")}
        disabled={enabling}
        onClick={onEnableSimulator}
      >
        Enable simulator
      </Button>
    </Alert>
  );
};
