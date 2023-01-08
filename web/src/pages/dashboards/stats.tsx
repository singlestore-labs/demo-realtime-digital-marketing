import { estimatedRowCountObj } from "@/data/queries";
import { connectionConfig, tickDurationMs } from "@/data/recoil";
import { formatMs } from "@/format";
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "d3-format";
import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

export const Stats = () => {
  const config = useRecoilValue(connectionConfig);
  const matchingDuration = useRecoilValue(tickDurationMs("SimulatorMatcher"));
  const { colorMode } = useColorMode();
  const updateSegmentsDuration = useRecoilValue(
    tickDurationMs("SimulatorUpdateSegments")
  );
  const tableCounts = useSWR(
    ["notificationsMapTableCounts", config],
    () =>
      estimatedRowCountObj(
        config,
        "offers",
        "subscribers",
        "cities",
        "segments"
      ),
    { refreshInterval: 1000 }
  );
  const formatStat = format(".4~s");

  const StatWrapper = (props: { statLabel: string; statNumber: string }) => {
    return (
      <Stat
        padding={"20px"}
        background={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
        borderRadius={"15px"}
      >
        <StatLabel>{props.statLabel}</StatLabel>
        <StatNumber color={useColorModeValue("#553ACF", "#CCC3F9")}>
          {props.statNumber}
        </StatNumber>
      </Stat>
    );
  };

  return tableCounts.data ? (
    <SimpleGrid spacing={2} minChildWidth="25%">
      <StatWrapper
        statLabel="offeres"
        statNumber={formatStat(tableCounts.data.offers)}
      />
      <StatWrapper
        statLabel="Cities"
        statNumber={formatStat(tableCounts.data.cities)}
      />
      <StatWrapper
        statLabel="Subscribers"
        statNumber={formatStat(tableCounts.data.subscribers)}
      />
      <StatWrapper
        statLabel="Segments"
        statNumber={formatStat(tableCounts.data.segments)}
      />
      <StatWrapper
        statLabel="Segmentation"
        statNumber={formatMs(updateSegmentsDuration)}
      />
      <StatWrapper
        statLabel="Matching"
        statNumber={formatMs(matchingDuration)}
      />
    </SimpleGrid>
  ) : null;
};
