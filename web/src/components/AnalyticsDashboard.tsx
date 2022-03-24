import { EnableSimulatorButton } from "@/components/EnableSimulatorButton";
import { Heatmap } from "@/components/Heatmap";
import { MarkdownText } from "@/components/MarkdownText";
import { useConnectionState } from "@/data/hooks";
import {
  CustomerMetrics,
  customerMetrics,
  estimatedRowCountObj,
  overallConversionRate,
  ZoneMetrics,
  zoneMetrics,
} from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useSimulationMonitor } from "@/data/useSimulationMonitor";
import { useSimulator } from "@/data/useSimulator";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  SimpleGrid,
  Spinner,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import * as d3color from "d3-color";
import { format } from "d3-format";
import { interpolateGreens } from "d3-scale-chromatic";
import { Bounds } from "pigeon-maps";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

const formatPct = format(",.2%");
const formatStat = format(".4~s");

export const AnalyticsDashboard = () => {
  const { initialized } = useConnectionState();
  const enabled = useRecoilValue(simulatorEnabled);
  useSimulationMonitor(enabled);
  useSimulator(enabled);

  return (
    <Container maxW="container.lg" mt={10} mb="30vh">
      {!initialized ? (
        <LoadingIndicator />
      ) : enabled ? (
        <Stack gap={10}>
          <StatGrid />
          <ConversionTable />
          <ConversionMap />
        </Stack>
      ) : (
        <EnableSimulatorButton />
      )}
    </Container>
  );
};

const LoadingIndicator = () => (
  <Center>
    <Spinner
      size="xl"
      speed="0.85s"
      thickness="3px"
      emptyColor="gray.200"
      color="blue.500"
    />
  </Center>
);

const StatGrid = () => {
  const config = useRecoilValue(connectionConfig);

  const overallRateRequests = useSWR(
    ["overallConversionRateRequests", config],
    () => overallConversionRate(config, "requests"),
    { refreshInterval: 1000 }
  );
  const overallRatePurchases = useSWR(
    ["overallConversionRatePurchases", config],
    () => overallConversionRate(config, "purchases"),
    { refreshInterval: 1000 }
  );

  const tableCounts = useSWR(
    ["analyticsTableCounts", config],
    () =>
      estimatedRowCountObj(config, "offers", "subscribers", "notifications"),
    { refreshInterval: 1000 }
  );

  if (
    !tableCounts.data ||
    !overallRateRequests.data ||
    !overallRatePurchases.data
  ) {
    return <LoadingIndicator />;
  }

  return (
    <SimpleGrid spacing={2} minChildWidth="150px" flex={2}>
      <Stat>
        <StatLabel>Offers</StatLabel>
        <StatNumber>{formatStat(tableCounts.data.offers)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Subscribers</StatLabel>
        <StatNumber>{formatStat(tableCounts.data.subscribers)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Notifications</StatLabel>
        <StatNumber>{formatStat(tableCounts.data.notifications)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Conversion Rate</StatLabel>
        <StatNumber>
          {formatPct(overallRateRequests.data?.conversionRate || 0)}
        </StatNumber>
        <StatHelpText>Requests</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Conversion Rate</StatLabel>
        <StatNumber>
          {formatPct(overallRatePurchases.data?.conversionRate || 0)}
        </StatNumber>
        <StatHelpText>Purchases</StatHelpText>
      </Stat>
    </SimpleGrid>
  );
};

const ConversionTable = () => {
  const config = useRecoilValue(connectionConfig);
  const [sortColumn, setSortColumn] =
    useState<keyof CustomerMetrics>("conversionRate");

  const metricsTableData = useSWR(
    ["customerMetrics", config, sortColumn],
    () => customerMetrics(config, "purchases", sortColumn, 10),
    { refreshInterval: 1000 }
  );

  const activeColor = useColorModeValue("blue.500", "blue.200");

  return (
    <Box overflowX="auto">
      <Table size="sm" colorScheme="gray" variant="striped">
        <Thead>
          <Tr>
            <Th
              onClick={() => setSortColumn("customer")}
              _hover={{ color: activeColor }}
              color={sortColumn === "customer" ? activeColor : undefined}
              cursor="pointer"
            >
              Customer
              {sortColumn === "customer" && <ChevronDownIcon />}
            </Th>
            <Th
              onClick={() => setSortColumn("totalNotifications")}
              _hover={{ color: activeColor }}
              color={
                sortColumn === "totalNotifications" ? activeColor : undefined
              }
              isNumeric
              cursor="pointer"
            >
              Total Notifications
              {sortColumn === "totalNotifications" && <ChevronDownIcon />}
            </Th>
            <Th
              onClick={() => setSortColumn("totalConversions")}
              _hover={{ color: activeColor }}
              color={
                sortColumn === "totalConversions" ? activeColor : undefined
              }
              isNumeric
              cursor="pointer"
            >
              Total Conversions
              {sortColumn === "totalConversions" && <ChevronDownIcon />}
            </Th>
            <Th
              onClick={() => setSortColumn("conversionRate")}
              _hover={{ color: activeColor }}
              color={sortColumn === "conversionRate" ? activeColor : undefined}
              isNumeric
              cursor="pointer"
            >
              Conversion Rate
              {sortColumn === "conversionRate" && <ChevronDownIcon />}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {metricsTableData.data?.map((c) => (
            <Tr key={c.customer}>
              <Td>{c.customer}</Td>
              <Td isNumeric>{formatStat(c.totalNotifications)}</Td>
              <Td isNumeric>{formatStat(c.totalConversions)}</Td>
              <Td isNumeric>{formatPct(c.conversionRate)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const useConversionCells = (
  bounds: Bounds,
  callback: (cells: ZoneMetrics[]) => void
) => {
  const config = useRecoilValue(connectionConfig);

  useSWR(
    ["zoneMetrics", config, bounds],
    () => zoneMetrics(config, bounds, "purchases"),
    {
      refreshInterval: 1000,
      onSuccess: callback,
    }
  );
  return;
};

const colorToNumber = ({ r, g, b }: d3color.RGBColor) => {
  return (r << 16) | (g << 8) | b;
};
const interpolateConversionRate = (t: number) =>
  colorToNumber(
    d3color.rgb(interpolateGreens(0.3 + t)) || d3color.rgb(0, 0, 0)
  );

const ConversionMap = () => {
  return (
    <Stack direction={["column", "row"]} alignItems="top">
      <Box flex={1}>
        <MarkdownText>
          {`
            ### Conversion Map

            This map shows the total conversion rate for all offers in each
            notification zone. Each polygon is colored based on the rate.
          `}
        </MarkdownText>
      </Box>
      <Box flex={2}>
        <Heatmap
          height={400}
          defaultZoom={14}
          useCells={useConversionCells}
          getCellColor={(cell: ZoneMetrics) =>
            interpolateConversionRate(cell.conversionRate)
          }
          getCellWKTPolygon={(cell: ZoneMetrics) => cell.wktPolygon}
        />
      </Box>
    </Stack>
  );
};
