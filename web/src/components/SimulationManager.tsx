import { useConnectionState } from "@/data/hooks";
import { connectionConfig } from "@/data/recoil";
import { Simulator } from "@/data/simulator";
import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";

type Props = { children?: ReactNode };

export const SimulationManager = ({ children }: Props) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();

  useEffect(
    () => (initialized ? Simulator(config) : undefined),
    [initialized, config]
  );

  return <>{children}</>;
};
