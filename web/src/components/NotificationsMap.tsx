import { EnableSimulatorButton } from "@/components/EnableSimulatorButton";
import { IngestChart, useIngestChartData } from "@/components/IngestChart";
import { MarkdownText } from "@/components/MarkdownText";
import { PixiMap } from "@/components/PixiMap";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { useConnectionState } from "@/data/hooks";
import { estimatedRowCountObj } from "@/data/queries";
import {
  connectionConfig,
  simulatorEnabled,
  tickDurationMs,
} from "@/data/recoil";
import { useSimulationMonitor } from "@/data/useSimulationMonitor";
import { useSimulator } from "@/data/useSimulator";
import { formatMs } from "@/format";
import { useNotificationsRenderer } from "@/render/useNotificationsRenderer";
import {
  Box,
  Flex,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { format } from "d3-format";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

const Stats = () => {
  const config = useRecoilValue(connectionConfig);

  const ingestData = useIngestChartData(
    config,
    "locations",
    "requests",
    "purchases",
    "notifications",
    "subscriber_segments"
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

  const matchingDuration = useRecoilValue(tickDurationMs("SimulatorMatcher"));
  const updateSegmentsDuration = useRecoilValue(
    tickDurationMs("SimulatorUpdateSegments")
  );

  const formatStat = format(".4~s");
  const stats = tableCounts.data ? (
    <SimpleGrid spacing={2} minChildWidth="120px">
      <Stat>
        <StatLabel>Offers</StatLabel>
        <StatNumber>{formatStat(tableCounts.data.offers)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Cities</StatLabel>
        <StatNumber>{formatStat(tableCounts.data.cities)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Subscribers</StatLabel>
        <StatNumber>{formatStat(tableCounts.data.subscribers)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Segments</StatLabel>
        <StatNumber>{formatStat(tableCounts.data.segments)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Segmentation</StatLabel>
        <StatNumber>{formatMs(updateSegmentsDuration)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Matching</StatLabel>
        <StatNumber>{formatMs(matchingDuration)}</StatNumber>
      </Stat>
    </SimpleGrid>
  ) : null;

  return (
    <>
      <MarkdownText>
        {`
          The map on this page displays notifications as they are delivered to
          subscribers in realtime. Below, you will find some key statistics
          about the demo.
        `}
      </MarkdownText>
      {stats}
      <Box>
        <Text fontSize="sm" fontWeight="medium">
          Row count / time
        </Text>
        <IngestChart data={ingestData} yAxisLabel="total rows" height={150} />
      </Box>
    </>
  );
};

export const NotificationsMap = () => {
  const { connected, initialized } = useConnectionState();
  const enabled = useRecoilValue(simulatorEnabled);
  useSimulationMonitor(enabled && connected && initialized);
  useSimulator(enabled && connected && initialized);

  return (
    <Flex
      gap={4}
      justifyContent="space-between"
      direction={["column", "column", "row"]}
      height="100%"
    >
      <Stack spacing={4} flex="2 2 0" minHeight="200px" maxHeight="100%">
        <PixiMap useRenderer={useNotificationsRenderer} options={{}} />
      </Stack>
      <Stack spacing={4} flex="1 1 0" minWidth="0">
        <MarkdownText>
          {`

            This application is a demo of how to use SingleStore to serve ads to
            users based on their behavior and realtime location. The demo is
            based on location, purchase, and request history from millions of
            simulated subscribers for a hypothetical service company. To learn
            about how this works please visit the [overview page](overview).
          `}
        </MarkdownText>
        {connected && !initialized ? (
          <ResetSchemaButton colorScheme="blue" size="sm">
            Setup database
          </ResetSchemaButton>
        ) : enabled ? (
          <Stats />
        ) : (
          <EnableSimulatorButton />
        )}
      </Stack>
    </Flex>
  );
};
