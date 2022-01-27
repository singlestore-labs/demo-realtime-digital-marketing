import { useSimulator } from "@/data/simulator";
import { ReactNode } from "react";

type Props = { children?: ReactNode };

export const SimulationManager = ({ children }: Props) => {
  useSimulator();
  return <>{children}</>;
};
