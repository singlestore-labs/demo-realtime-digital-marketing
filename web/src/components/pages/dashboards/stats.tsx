import { estimatedRowCountObj } from "@/data/queries";
import { connectionConfig, tickDurationMs } from "@/data/recoil";
import { formatMs } from "@/format";
import {
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
  } from "@chakra-ui/react";
import { format } from "d3-format";
import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import useSWR from "swr";


  export const Stats = () => {
    const config = useRecoilValue(connectionConfig);const matchingDuration = useRecoilValue(tickDurationMs("SimulatorMatcher"));
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

    const StatWrapper = (props: {statLabel: string, statNumber: string}) => {
        return <Stat padding={"20px"} background="#ECE8FD" borderRadius={"15px"}>
            <StatLabel>{props.statLabel}</StatLabel>
            <StatNumber color="#4F34C7">{props.statNumber}</StatNumber>
        </Stat>
    }

    return tableCounts.data ? (
        <SimpleGrid spacing={2} minChildWidth="25%">
          <StatWrapper statLabel="offeres" statNumber={formatStat(tableCounts.data.offers)} />
          <StatWrapper statLabel="Cities" statNumber={formatStat(tableCounts.data.cities)} />
          <StatWrapper statLabel="Subscribers" statNumber={formatStat(tableCounts.data.subscribers)} />
          <StatWrapper statLabel="Segments" statNumber={formatStat(tableCounts.data.segments)} />
          <StatWrapper statLabel="Segmentation" statNumber={formatMs(updateSegmentsDuration)} />
          <StatWrapper statLabel="Matching" statNumber={formatMs(matchingDuration)} />
        </SimpleGrid>
      ) : null;
  }