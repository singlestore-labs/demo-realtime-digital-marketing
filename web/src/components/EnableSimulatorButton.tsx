import {
  Alert,
  AlertIcon,
  AlertTitle,
  FormControl,
  FormControlProps,
  FormLabel,
  Switch,
  SwitchProps,
  useBoolean,
} from "@chakra-ui/react";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { trackAnalyticsEvent } from "@/analytics";
import { setSessionController } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useConnectionState, useMountedCallback } from "@/view/hooks/hooks";
import { useSession } from "@/view/hooks/useSession";

export const EnableSimulatorButton = () => {
  return (
    <Alert status="warning" borderRadius="md">
      <AlertIcon />
      <AlertTitle>The simulator is disabled</AlertTitle>
      <ToggleSimulatorButton
        containerProps={{
          position: "absolute",
          textAlign: "right",
          right: 3,
          display: "inline",
        }}
      />
    </Alert>
  );
};

export const ToggleSimulatorButton = ({
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

  let buttonText = "Simulator disabled";
  if (enabled) {
    buttonText = "Simulator enabled";
  }

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
    <FormControl {...containerProps}>
      <FormLabel
        htmlFor="simulatorSwitch"
        fontSize="x-small"
        display="inline"
        padding={0}
      >
        {buttonText}
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
