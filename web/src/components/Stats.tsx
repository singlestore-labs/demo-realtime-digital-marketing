import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "d3-format";
import * as React from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { estimatedRowCountObj } from "@/data/queries";
import { connectionConfig, tickDurationMs } from "@/data/recoil";
import { formatMs } from "@/format";

import { Loader } from "./customcomponents/loader/Loader";

const StatWrapper = ({
  statLabel,
  statNumber,
}: {
  statLabel: string;
  statNumber: string;
}) => {
  return (
    <Stat
      padding="20px"
      background={useColorModeValue("#ECE8FD", "#360061")}
      borderRadius="15px"
    >
      <StatLabel>{statLabel}</StatLabel>
      <StatNumber color={useColorModeValue("#820DDF", "#D199FF")}>
        {statNumber}
      </StatNumber>
    </Stat>
  );
};

export const Stats = () => {
  const config = useRecoilValue(connectionConfig);
  const matchingDuration = useRecoilValue(tickDurationMs("SimulatorMatcher"));
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

  if (!tableCounts.data) {
    return <Loader size="small" centered />;
  }

  return (
    <SimpleGrid spacing={2} minChildWidth="25%">
      <StatWrapper
        statLabel="Ad Campaigns"
        statNumber={formatStat(tableCounts.data.offers)}
      />
      <StatWrapper
        statLabel="Cities"
        statNumber={formatStat(tableCounts.data.cities)}
      />
      <StatWrapper
        statLabel="Audience Segments"
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
  );
};
