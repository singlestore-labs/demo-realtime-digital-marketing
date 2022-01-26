import { connectionState } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

export const useConnectionState = () => {
  const config = useRecoilValue(connectionConfig);
  const { data, mutate } = useSWR(["connectionState", config], () =>
    connectionState(config)
  );
  return {
    connected: false,
    initialized: false,
    reset: mutate,
    ...data,
  };
};
