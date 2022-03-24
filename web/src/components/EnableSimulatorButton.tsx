import { simulatorEnabled } from "@/data/recoil";
import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

export const EnableSimulatorButton = () => {
  const setEnabled = useSetRecoilState(simulatorEnabled);
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
        onClick={() => setEnabled(true)}
      >
        Enable simulator
      </Button>
    </Alert>
  );
};
