import { EnableSimulatorButton } from "@/components/EnableSimulatorButton";
import { IngestChart, useIngestChartData } from "@/components/IngestChart";
import { MarkdownText } from "@/components/MarkdownText";
import { PixiMap } from "@/components/shared/PixiMap";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { useConnectionState } from "@/data/hooks";
import {
  connectionConfig,
  simulatorEnabled,
} from "@/data/recoil";
import { useSimulationMonitor } from "@/data/useSimulationMonitor";
import { useSimulator } from "@/data/useSimulator";
import { useNotificationsRenderer } from "@/render/useNotificationsRenderer";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Stats } from "./stats";
import { BsCircle, BsCircleFill, BsInfoCircleFill } from "react-icons/bs";

const StatsWrapper = () => {
  const config = useRecoilValue(connectionConfig);

  const ingestData = useIngestChartData(
    config,
    "locations",
    "requests",
    "purchases",
    "notifications",
    "subscriber_segments"
  );

  return (
    <>
      <Stack spacing={3}>
        <Heading as={"h4"} size={"md"}>Key Metrics</Heading>
          <Text size="md">Serving ads real-time to sumulate Subscribers</Text>
        <Stats />
      </Stack>
      <Stack border="1px solid silver" borderRadius="10px" padding="15px">
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize="sm" fontWeight="bold">
            INGESTED DATA
          </Text>
          <Flex justifyContent={"space-between"} gap={2} fontSize={"xs"} alignItems={"center"} color={"#4F34C7"} >
            <Icon as={BsInfoCircleFill} /> <Text>Hover over graph for schema details</Text>
          </Flex>
        </Flex>
        <IngestChart data={ingestData} yAxisLabel="total rows" height={150} />
      </Stack>
    </>
  );
};

export const NotificationsMap = () => {
  const { connected, initialized } = useConnectionState();
  const enabled = useRecoilValue(simulatorEnabled);
  useSimulationMonitor(enabled && connected && initialized);
  useSimulator(enabled && connected && initialized);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  let inner;
  if (!connected) {
    inner = (
      <Button
        size="sm"
        onClick={() => window.open('/configure', "_self")}
        colorScheme="green"
      >
        <SettingsIcon />
        <Text pl={2}>Connect to SingleStore</Text>
      </Button>
    );
  } else if (!initialized) {
    inner = (
      <ResetSchemaButton colorScheme="blue" size="sm">
        Setup database
      </ResetSchemaButton>
    );
  } else if (!enabled) {
    inner = <EnableSimulatorButton />;
  } else {
    inner = <StatsWrapper />;
  }

  return (
    <Flex
      gap={4}
      justifyContent="space-between"
      direction={["column", "column", "row"]}
      margin={0}
      padding={0}
      position={"relative"}
      height="100%"
    >
       <Stack
          spacing={4}
          position={isSmallScreen ? 'relative' : 'absolute' }
          boxShadow={"0px 3px 2px 0px #ddddde"}
          background={"white"}
          zIndex={4}
          left={0}
          top={0}
          width={isSmallScreen ? "100%" : "30%"}
          height={isSmallScreen ? "auto": "100%"}
          borderBottomRightRadius={"10px"}
          padding={"40px 30px"}
      >
        <MarkdownText>
          {`

            This application is a demo of how to use SingleStore to serve ads to
            users based on their behavior and realtime location. The demo is
            based on location, purchase, and request history from millions of
            simulated subscribers for a hypothetical service company. To learn
            about how this works please visit the [overview page](overview).
          `}
        </MarkdownText>
        {inner}
      </Stack>
      <Stack zIndex={1} spacing={2} width={"100%"} height="100%">
        <PixiMap useRenderer={useNotificationsRenderer} options={{}} />
      </Stack>
     
    </Flex>
  );
};
