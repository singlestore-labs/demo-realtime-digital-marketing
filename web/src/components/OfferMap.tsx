import { Heatmap } from "@/components/Heatmap";
import { PixiMapProps } from "@/components/PixiMap";
import { useConnectionState } from "@/data/hooks";
import { Offer, queryOffersInBounds } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import * as d3color from "d3-color";
import { Omit } from "framer-motion/types/types";
import { Bounds } from "pigeon-maps";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

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
      getCellConfig={(cell: Offer) => {
        const color = d3color.rgb(0x04, 0xad, 0xff);
        return {
          color,
          hoverColor: color.brighter(1),
          wktPolygon: cell.notificationZone,
        };
      }}
    />
  );
};
