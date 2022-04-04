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

  const [enabling, enablingCtrl] = useBoolean(false);
  const onEnableSimulator = useCallback(async () => {
    enablingCtrl.on();

    await setSessionController(config, session.sessionId, true);
    setEnabled(true);

    refreshSession();
    enablingCtrl.off();
  }, [config, enablingCtrl, refreshSession, session.sessionId, setEnabled]);

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
