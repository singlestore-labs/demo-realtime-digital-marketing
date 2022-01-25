import { testConnection } from "@/data/client";
import { connectionConfig } from "@/data/recoil";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

export const useConnected = () => {
  const config = useRecoilValue(connectionConfig);
  const { data } = useSWR(["connected", config], () => testConnection(config));
  return !!data;
};
