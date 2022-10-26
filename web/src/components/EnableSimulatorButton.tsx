import { trackAnalyticsEvent } from "@/analytics";
import { useConnectionState, useMountedCallback } from "@/data/hooks";
import { setSessionController } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useSession } from "@/data/useSession";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  useBoolean,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
  const onEnableSimulator = useCallback(async () => {
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
        colorScheme="blue"
        disabled={enabling}
        onClick={onEnableSimulator}
      >
        Enable simulator
      </Button>
    </Alert>
  );
};
