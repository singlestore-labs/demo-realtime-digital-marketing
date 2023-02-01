import { Omit } from "framer-motion/types/types";
import { Bounds } from "pigeon-maps";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { Heatmap } from "@/components/HeatMap";
import { PixiMapProps } from "@/components/PixiMap";
import { Offer, queryOffersInBounds } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { useConnectionState } from "@/view/hooks/hooks";

const MAX_OFFERS = 1000;

const useCells = (bounds: Bounds, callback: (cells: Offer[]) => void) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();

  useSWR(
    ["offers", config, initialized, bounds],
    () => queryOffersInBounds(config, MAX_OFFERS, bounds),
    {
      isPaused: () => !initialized,
      onSuccess: callback,
    }
  );
};

type Props = Omit<PixiMapProps<unknown>, "useRenderer" | "options">;

export const OfferMap = (props: Props) => {
  return (
    <Heatmap
      {...props}
      useCells={useCells}
      colorInterpolater={() => "#04adff"}
      getCellConfig={(cell: Offer) => {
        return {
          value: 1,
          wktPolygon: cell.notificationZone,
        };
      }}
    />
  );
};
