import { ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons";
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
  Tooltip,
  Tr,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { format } from "d3-format";
import { interpolateRgb } from "d3-interpolate";
import { Bounds } from "pigeon-maps";
import * as React from "react";
import { IconType } from "react-icons";
import { BsGearFill } from "react-icons/bs";
import { HiBell, HiOfficeBuilding, HiRefresh } from "react-icons/hi";
import { MdAttachMoney, MdMonetizationOn } from "react-icons/md";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { AskAuraButton } from "@/components/AskAuraButton";
import { Loader } from "@/components/customcomponents/loader/Loader";
import { EnableSimulatorWarning } from "@/components/EnableSimulatorButton";
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
const formatCurrency = format("$,.2f");
const formatROAS = format(".2f");

const NotificationZoneMap = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  return (
    <Flex gap={5} direction={isSmallScreen ? "column" : "row"}>
      <Stack flex={2}>
        <StatGrid />
      </Stack>
      <Box
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
          <Text fontWeight="bold" fontSize="sm" textTransform="uppercase">
            Campaign conversion rates by Notification zone
          </Text>
          <Flex width="30%" direction="column">
            <Box width="100%">
              <Progress
                colorScheme="transparent"
                height={2}
                bgGradient="linear(to-r, #360061 0%, #D199FF 100%)"
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
          colorInterpolater={interpolateRgb("#D199FF", "#360061")}
          getCellConfig={({ conversionRate, wktPolygon }: ZoneMetrics) => ({
            value: conversionRate,
            wktPolygon,
          })}
        />
      </Box>
    </Flex>
  );
};

const DashboardContainerChild = () => {
  const { initialized, connected } = useConnectionState();
  const enabled = useRecoilValue(simulatorEnabled);
  useSimulationMonitor(enabled);
  useSimulator(enabled);

  if (!connected) {
    window.location.href = "/";
  }

  if (!initialized) {
    return <SetupDatabaseButton />;
  } else if (!enabled) {
    return <EnableSimulatorWarning />;
  }
  return (
    <Stack gap={10}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Heading fontSize="xl">Campaign Performance</Heading>
          <Text overflowWrap="break-word">
            Real-time targeting and audience responsiveness metrics
          </Text>
        </Stack>
        <NotificationZoneMap />
      </Stack>
      <Stack spacing={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Stack spacing={2}>
            <Heading fontSize="xl">Top Performing Customers</Heading>
            <Text overflowWrap="break-word">
              Companies with the highest conversion rate
            </Text>
          </Stack>
        </Flex>
        <ConversionTable />
      </Stack>
    </Stack>
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
    return <Loader size="small" centered />;
  }

  return (
    <Grid gap={2} templateColumns="repeat(2, 1fr)">
      <StatWrapper
        statLabel="Ad Campaigns"
        statNumber={formatStat(tableCounts.data.offers)}
        colSpan={2}
        askAuraQuestion="How many active ad campaigns are running and which customers have the most campaigns?"
      />
      <StatWrapper
        statLabel="Audience Segments"
        statNumber={formatStat(tableCounts.data.subscribers)}
        askAuraQuestion="What are the largest audience segments and how are subscribers distributed across them?"
      />
      <StatWrapper
        statLabel="Notifications"
        statNumber={formatStat(tableCounts.data.notifications)}
        askAuraQuestion="What's the trend in notifications over time and which campaigns are generating the most?"
      />
      <StatWrapper
        statLabel="Conversion Rate"
        statNumber={formatPct(overallRateRequests.data?.conversionRate || 0)}
        helpText="Requests"
        askAuraQuestion="What's the conversion rate trend and which campaigns have the highest conversion rates?"
      />
      <StatWrapper
        statLabel="Conversion Rate"
        statNumber={formatPct(overallRatePurchases.data?.conversionRate || 0)}
        helpText="Purchases"
        askAuraQuestion="How does purchase conversion rate vary by campaign and market?"
      />
    </Grid>
  );
};

const ConversionTable = () => {
  const config = useRecoilValue(connectionConfig);
  const [sortColumn, setSortColumn] =
    React.useState<keyof CustomerMetrics>("conversionRate");
  const [lastUpdate, setLastUpdate] = React.useState(new Date());

  const metricsTableData = useSWR(
    ["customerMetrics", config, sortColumn],
    () => customerMetrics(config, "purchases", sortColumn, 10),
    {
      refreshInterval: 1000,
      onSuccess: () => {
        setLastUpdate(new Date());
      },
    }
  );
  const activeColor = useColorModeValue("#820DDF", "#D199FF");
  const cellLeftPadding = "10px";

  const getTableBody = () => {
    if (metricsTableData.isValidating && !metricsTableData.data) {
      return (
        <Tr>
          <Td colSpan={6}>
            <Loader size="small" centered />
          </Td>
        </Tr>
      );
    } else if (!metricsTableData.data) {
      return (
        <Tr>
          <Td colSpan={6}>
            <Text display="flex" justifyContent="center" width="100%">
              No data
            </Text>
          </Td>
        </Tr>
      );
    }

    return metricsTableData.data?.map((c) => (
      <Tr key={c.customer}>
        <Td>{c.customer}</Td>
        <Td paddingLeft={cellLeftPadding}>
          {formatStat(c.totalNotifications)}
        </Td>
        <Td paddingLeft={cellLeftPadding}>{formatStat(c.totalConversions)}</Td>
        <Td paddingLeft={cellLeftPadding}>
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
              background={`rgba(79, 52, 199, ${c.conversionRate + 0.03})`}
              color="rgba(0,0,0,1)"
            >
              {formatPct(c.conversionRate)}
            </Box>
          </Box>
        </Td>
        <Td paddingLeft={cellLeftPadding}>{formatROAS(c.roas)}x</Td>
        <Td paddingLeft={cellLeftPadding}>{formatCurrency(c.totalSpend)}</Td>
      </Tr>
    ));
  };

  const THContentWrapper = ({
    sortColumnValue,
    icon,
    title,
  }: {
    sortColumnValue: React.SetStateAction<keyof CustomerMetrics>;
    icon: IconType;
    title: string;
  }) => {
    return (
      <Th
        onClick={() => setSortColumn(sortColumnValue)}
        _hover={{ color: activeColor }}
        padding={0}
        color={sortColumnValue === sortColumn ? activeColor : undefined}
        cursor="pointer"
      >
        <Box
          justifyContent="left"
          gap={2}
          alignItems="center"
          padding={cellLeftPadding}
          display="flex"
        >
          <Icon as={icon} />
          {title}
          {sortColumnValue === sortColumn ? <ChevronDownIcon /> : undefined}
        </Box>
      </Th>
    );
  };

  const timeSinceUpdate = React.useMemo(() => {
    const seconds = Math.floor((new Date().getTime() - lastUpdate.getTime()) / 1000);
    return seconds;
  }, [lastUpdate]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render every second to update "updated X seconds ago"
      setLastUpdate((prev) => new Date(prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box overflowX="auto">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Tooltip
          label={`Auto-refreshing every second. Last updated ${timeSinceUpdate}s ago`}
          hasArrow
        >
          <Flex alignItems="center" gap={2} fontSize="sm" color="gray.500">
            <Icon
              as={RepeatIcon}
              animation={metricsTableData.isValidating ? "spin 1s linear infinite" : undefined}
              sx={{
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
            <Text>Live updates</Text>
          </Flex>
        </Tooltip>
      </Flex>
      <TableContainer>
        <Table size="sm" variant="striped">
          <Thead background={useColorModeValue("#ECE8FD", "#360061")}>
            <Tr>
              <THContentWrapper
                sortColumnValue="customer"
                icon={HiOfficeBuilding}
                title="Company"
              />
              <THContentWrapper
                sortColumnValue="totalNotifications"
                icon={HiBell}
                title="Impressions"
              />
              <THContentWrapper
                sortColumnValue="totalConversions"
                icon={HiRefresh}
                title="Conversions"
              />
              <THContentWrapper
                sortColumnValue="conversionRate"
                icon={BsGearFill}
                title="Conversion Rate"
              />
              <THContentWrapper
                sortColumnValue="roas"
                icon={MdMonetizationOn}
                title="ROAS"
              />
              <THContentWrapper
                sortColumnValue="totalSpend"
                icon={MdAttachMoney}
                title="Total Spend"
              />
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
  callback: (cells: Array<ZoneMetrics>) => void
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

export const AnalyticsDashboard = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  return (
    <Container maxW={isSmallScreen ? undefined : "75%"} mt={10} mb="5%">
      <DashboardContainerChild />
    </Container>
  );
};

const StatWrapper = ({
  statLabel,
  statNumber,
  helpText,
  colSpan,
  askAuraQuestion,
}: {
  statLabel: string;
  statNumber: string;
  helpText?: string;
  colSpan?: number;
  askAuraQuestion?: string;
}) => {
  let helpTextContainer;
  if (helpText) {
    helpTextContainer = <StatHelpText>{helpText}</StatHelpText>;
  }

  return (
    <GridItem
      padding="20px"
      background={useColorModeValue("#ECE8FD", "#360061")}
      borderRadius="15px"
      colSpan={colSpan || 1}
      position="relative"
      className="chart-container"
    >
      {askAuraQuestion && <AskAuraButton question={askAuraQuestion} />}
      <Stat>
        <StatLabel>{statLabel}</StatLabel>
        <StatNumber color={useColorModeValue("#820DDF", "#D199FF")}>
          {statNumber}
        </StatNumber>
        {helpTextContainer}
      </Stat>
    </GridItem>
  );
};
