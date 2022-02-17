import { PixiMap, PixiMapProps, UsePixiRenderer } from "@/components/PixiMap";
import { connectionConfig } from "@/data/recoil";
import { useRecoilValue } from "recoil";

type Props = Omit<PixiMapProps, "useRenderer">;

const useRenderer: UsePixiRenderer = ({ scene, latLngToPixel, getBounds }) => {
  const config = useRecoilValue(connectionConfig);
  return {};
};

export const OfferMap = (props: Props) => {
  return <PixiMap {...props} useRenderer={useRenderer} />;
};
