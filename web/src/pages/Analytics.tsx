import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Progress,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { format } from "d3-format";
import { interpolateBuPu } from "d3-scale-chromatic";
import { Bounds } from "pigeon-maps";
import { useState } from "react";
import { BsGearFill } from "react-icons/bs";
import { HiBell, HiOfficeBuilding, HiRefresh } from "react-icons/hi";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { ConnectToSingleStoreButton } from "@/components/ConnectToSinglestoreButton";
import { Loader } from "@/components/customcomponents/loader/Loader";
import { EnableSimulatorButton } from "@/components/EnableSimulatorButton";
import { Heatmap } from "@/components/HeatMap";
import { SetupDatabaseButton } from "@/components/SetupDatabaseButton";
import {
  CustomerMetrics,
  customerMetrics,
  estimatedRowCountObj,
  overallConversionRate,
  ZoneMetrics,
  zoneMetrics,
} from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useConnectionState } from "@/view/hooks/hooks";
import { useSimulationMonitor } from "@/view/hooks/useSimulationMonitor";
import { useSimulator } from "@/view/hooks/useSimulator";

const formatPct = format(",.2%");
const formatStat = format(".4~s");

export const AnalyticsDashboard = () => {
  const { initialized, connected } = useConnectionState();
  const enabled = useRecoilValue(simulatorEnabled);
  useSimulationMonitor(enabled);
  useSimulator(enabled);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  const getContainerChild = () => {
    if (!connected) {
      return <ConnectToSingleStoreButton />;
    } else if (!initialized) {
      return <SetupDatabaseButton />;
    } else if (!enabled) {
      return <EnableSimulatorButton />;
    } else
      return (
        <Stack gap={10}>
          <Box>
            <Heading fontSize="md">Engagement</Heading>
            <Text overflowWrap="break-word">
              Conversion rate with subscribers
            </Text>
            <br />

            <Flex gap={5} direction={isSmallScreen ? "column" : "row"}>
              <Stack flex={2}>
                <StatGrid />
              </Stack>
              <Stack
                padding="17px"
                flex={4}
                borderRadius={10}
                border="1px solid grey"
                position="relative"
              >
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  width="100%"
                  gap={10}
                  alignItems="center"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    Offer conversion rates by Notification zone
                  </Text>
                  <Flex width="30%" direction="column">
                    <Box width="100%">
                      <Progress
                        colorScheme="transparent"
                        height={2}
                        bgGradient="linear(to-r, rgba(127, 17, 224, 1), white)"
                        value={90}
                      />
                    </Box>
                    <Flex width="100%" justifyContent="space-between">
                      <Text>
                        <small>High</small>
                      </Text>
                      <Text>
                        <small>Low</small>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <br />

                <Heatmap
                  height={400}
                  useCells={useConversionCells}
                  colorInterpolater={interpolateBuPu}
                  getCellConfig={({
                    conversionRate,
                    wktPolygon,
                  }: ZoneMetrics) => ({
                    value: conversionRate,
                    wktPolygon,
                  })}
                />
              </Stack>
            </Flex>
          </Box>
          <Box>
            <Heading fontSize="md">Top Performing Customers</Heading>
            <Text overflowWrap="break-word">
              Companies with the highest conversion rate
            </Text>
            <br />
            <ConversionTable />
          </Box>
        </Stack>
      );
  };
  return (
    <Container maxW={!isSmallScreen ? "75%" : undefined} mt={10} mb="30%">
      {getContainerChild()}
    </Container>
  );
};

const StatWrapper = ({
  statLabel,
  statNumber,
  helpText,
  colSpan,
}: {
  statLabel: string;
  statNumber: string;
  helpText?: string;
  colSpan?: number;
}) => {
  return (
    <GridItem
      padding="20px"
      background={useColorModeValue("#ECE8FD", "#2F206E")}
      borderRadius="15px"
      colSpan={colSpan || 1}
    >
      <Stat>
        <StatLabel>{statLabel}</StatLabel>
        <StatNumber color={useColorModeValue("#553ACF", "#CCC3F9")}>
          {statNumber}
        </StatNumber>
        {helpText ? <StatHelpText>{helpText}</StatHelpText> : undefined}
      </Stat>
    </GridItem>
  );
};

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
    return <Loader size="small" centered={true} />;
  }

  return (
    <Grid gap={2} templateColumns="repeat(2, 1fr)">
      <StatWrapper
        statLabel="offers"
        statNumber={formatStat(tableCounts.data.offers)}
        colSpan={2}
      />
      <StatWrapper
        statLabel="Subscribers"
        statNumber={formatStat(tableCounts.data.subscribers)}
      />
      <StatWrapper
        statLabel="Notifications"
        statNumber={formatStat(tableCounts.data.notifications)}
      />
      <StatWrapper
        statLabel="Conversion Rate"
        statNumber={formatPct(overallRateRequests.data?.conversionRate || 0)}
        helpText="Requests"
      />
      <StatWrapper
        statLabel="Conversion Rate"
        statNumber={formatPct(overallRatePurchases.data?.conversionRate || 0)}
        helpText="Purchases"
      />
    </Grid>
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
  const activeColor = useColorModeValue("#553ACF", "#CCC3F9");

  const getTableBody = () => {
    if (metricsTableData.isValidating && !metricsTableData.data) {
      return (
        <Tr>
          <Td colSpan={4}>
            <Loader size="small" centered={true} />
          </Td>
        </Tr>
      );
    }
    return metricsTableData.data?.map((c) => (
      <Tr key={c.customer}>
        <Td>{c.customer}</Td>
        <Td paddingLeft="10px">{formatStat(c.totalNotifications)}</Td>
        <Td paddingLeft="10px">{formatStat(c.totalConversions)}</Td>
        <Td paddingLeft="10px">
          <Box
            background="white"
            display="inline-block"
            borderRadius="5px"
            padding={0}
            margin={0}
          >
            <Box
              display="inline-block"
              borderRadius="5px"
              padding="4px"
              fontSize="xs"
              background={`rgba(0, 0, 0, ${c.conversionRate + 0.01})`}
              color="rgba(0,0,0,1)"
            >
              {formatPct(c.conversionRate)}
            </Box>
          </Box>
        </Td>
      </Tr>
    ));
  };

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table size="sm" variant="striped">
          <Thead background={useColorModeValue("#ECE8FD", "#2F206E")}>
            <Tr>
              <Th
                onClick={() => setSortColumn("customer")}
                _hover={{ color: activeColor }}
                color={sortColumn === "customer" ? activeColor : undefined}
                padding="10px 10px 10px 10px"
                cursor="pointer"
              >
                <Icon as={HiOfficeBuilding} /> Company
                {sortColumn === "customer" && <ChevronDownIcon />}
              </Th>
              <Th
                onClick={() => setSortColumn("totalNotifications")}
                _hover={{ color: activeColor }}
                color={
                  sortColumn === "totalNotifications" ? activeColor : undefined
                }
                cursor="pointer"
                padding="10px 10px 10px 0px"
              >
                <Icon as={HiBell} /> Total Notifications
                {sortColumn === "totalNotifications" && <ChevronDownIcon />}
              </Th>
              <Th
                onClick={() => setSortColumn("totalConversions")}
                _hover={{ color: activeColor }}
                color={
                  sortColumn === "totalConversions" ? activeColor : undefined
                }
                cursor="pointer"
                padding="10px 10px 10px 0px"
              >
                <Icon as={HiRefresh} /> Total Conversions
                {sortColumn === "totalConversions" && <ChevronDownIcon />}
              </Th>
              <Th
                onClick={() => setSortColumn("conversionRate")}
                _hover={{ color: activeColor }}
                color={
                  sortColumn === "conversionRate" ? activeColor : undefined
                }
                cursor="pointer"
                padding="10px 10px 10px 0px"
              >
                <Icon as={BsGearFill} /> Conversion Rate
                {sortColumn === "conversionRate" && <ChevronDownIcon />}
              </Th>
            </Tr>
          </Thead>
          <Tbody>{getTableBody()}</Tbody>
        </Table>
      </TableContainer>
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
};
