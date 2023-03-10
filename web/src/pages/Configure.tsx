import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Code,
  Collapse,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useBoolean,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR, { useSWRConfig } from "swr";

import GraphicalBackground from "@/assets/graphical-background.svg";
import { CodeBlock } from "@/components/CodeBlock";
import { PrimaryButton } from "@/components/customcomponents/Button";
import { Loader } from "@/components/customcomponents/loader/Loader";
import { DatabaseConfigForm } from "@/components/dataConfigForm/DatabaseConfigFormAutomatic";
import { IngestChart, useIngestChartData } from "@/components/IngestChart";
import { OfferMap } from "@/components/OfferMap";
import { DEFAULT_CENTER, PixiMap } from "@/components/PixiMap";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { ConnectionConfig } from "@/data/client";
import {
  checkPlans,
  ensurePipelinesExist,
  estimatedRowCountObj,
  getPipelineSQL,
  insertSeedData,
  PipelineName,
  pipelineNames,
  pipelineStatus,
  runMatchingProcess,
  runUpdateSegments,
} from "@/data/queries";
import {
  configScaleFactor,
  connectionConfig,
  connectionDatabase,
  resettingSchema,
} from "@/data/recoil";
import { findSchemaObjectByName } from "@/data/sql";
import { timeseriesIsEmpty } from "@/data/timeseries";
import { toISOStringNoTZ } from "@/datetime";
import { formatMs, formatNumber } from "@/format";
import {
  useNotificationsDataKey,
  useNotificationsRenderer,
} from "@/render/useNotificationsRenderer";
import { ScaleFactor } from "@/scalefactors";
import {
  useConnectionState,
  useSchemaObjects,
  useTimer,
} from "@/view/hooks/hooks";
import { useSimulationMonitor } from "@/view/hooks/useSimulationMonitor";

const CollapsibleSection = ({
  title,
  childComponent,
  disabled,
  buttonStyle,
  containerStyle,
  childContainerStyle,
}: {
  title: React.ReactNode;
  childComponent: React.ReactElement;
  disabled: boolean;
  buttonStyle: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  childContainerStyle?: React.CSSProperties;
}) => {
  const [sectionOpen, setSectionOpen] = React.useState(!disabled);
  let accordionIcon = <ChevronDownIcon />;
  if (sectionOpen) {
    accordionIcon = <ChevronUpIcon />;
  }

  React.useEffect(() => {
    setSectionOpen(!disabled);
  }, [disabled]);

  return (
    <div style={containerStyle}>
      <Button
        justifyContent="space-between"
        size="sm"
        width="100%"
        style={buttonStyle}
        onClick={() => setSectionOpen(!sectionOpen)}
      >
        {title}
        {accordionIcon}
      </Button>
      <div style={childContainerStyle}>
        <Collapse in={sectionOpen}>{childComponent}</Collapse>
      </div>
    </div>
  );
};

const Section = ({
  completed,
  previousStepCompleted,
  title,
  left,
  right,
}: {
  completed: boolean;
  previousStepCompleted: boolean;
  title: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) => {
  const { colorMode } = useColorMode();
  const activeSection = completed || previousStepCompleted;

  let sectionIcon = <CheckCircleIcon />;
  if (!completed) {
    sectionIcon = <WarningIcon />;
  }

  const collapsibleSectionStyle = {
    opacity: 1,
    border: "1px solid #553ACF",
    background: "transparent",
    color: "#E6E5EA",
  };
  if (colorMode === "light") {
    collapsibleSectionStyle.border = "1px solid #ECE8FD";
    if (completed) {
      collapsibleSectionStyle.background = "#553ACF";
      collapsibleSectionStyle.color = "white";
    } else if (previousStepCompleted) {
      collapsibleSectionStyle.background = "#F7F6FE";
      collapsibleSectionStyle.color = "#553ACF";
    } else {
      collapsibleSectionStyle.color = "#777582";
    }
  } else {
    if (completed) {
      collapsibleSectionStyle.background = "#CCC3F9";
      collapsibleSectionStyle.color = "#2F206E";
    } else if (previousStepCompleted) {
      collapsibleSectionStyle.background = "#2F206E";
      collapsibleSectionStyle.color = "#CCC3F9";
    }
  }

  if (!activeSection) {
    collapsibleSectionStyle.opacity = 0.4;
  }

  return (
    <CollapsibleSection
      disabled={!completed && !previousStepCompleted}
      title={
        <Flex width="100%" alignItems="center" gap={1.5}>
          {sectionIcon}
          {title}
        </Flex>
      }
      childComponent={
        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
          <GridItem>{left}</GridItem>
          <GridItem>{right}</GridItem>
        </Grid>
      }
      buttonStyle={collapsibleSectionStyle}
      containerStyle={{
        marginTop: "30px",
        marginBottom: "30px",
      }}
      childContainerStyle={{
        padding: "10px",
        opacity: activeSection ? 1 : 0.5,
        pointerEvents: activeSection ? undefined : "none",
      }}
    />
  );
};

const ConnectionSection = ({ connected }: { connected: boolean }) => {
  return (
    <Section
      completed={connected}
      title="Connect to SingleStoreDB"
      previousStepCompleted
      left={
        <Text>
          Please enter the host and port number for the specific Workspace you
          want to connect to. Then enter the Workspace Group username and
          password credentials.{" "}
          <Link
            href="https://docs.singlestore.com/managed-service/en/reference/data-api.html"
            isExternal
          >
            Know more
          </Link>
        </Text>
      }
      right={<DatabaseConfigForm />}
    />
  );
};

const SchemaObjectModal = ({
  onClose,
  schemaObjectName,
}: {
  onClose: () => void;
  schemaObjectName: string;
}) => {
  const { name, statement } = findSchemaObjectByName(schemaObjectName);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  return (
    <Modal
      isOpen
      onClose={onClose}
      size={isSmallScreen ? "full" : "4xl"}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create statement for {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CodeBlock mb={4}>{statement}</CodeBlock>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const SchemaItem = ({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) => {
  return (
    <GridItem
      key={name}
      bg={useColorModeValue("#ECE8FD", "#2F206E")}
      fontSize="xs"
      color={useColorModeValue("#553ACF", "#ECE8FD")}
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      overflow="hidden"
      borderRadius="md"
      px={2}
      py={1}
      textAlign="center"
      _hover={{
        fontWeight: "bold",
      }}
      cursor="pointer"
      onClick={onClick}
    >
      {name}
    </GridItem>
  );
};

const ConfigHeader = ({
  configInitialized,
}: {
  configInitialized: boolean;
}) => {
  const [database, setDatabase] = useRecoilState(connectionDatabase);
  const resetButtonBackground = useColorModeValue("#ECE8FD", "#2F206E");
  const resetButtonFontColor = useColorModeValue("#553ACF", "#ECE8FD");

  if (configInitialized) {
    return <></>;
  }

  return (
    <HStack alignItems="flex-end">
      <FormControl flex={1}>
        <FormLabel fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Database name
        </FormLabel>
        <Input
          placeholder="martech"
          value={database}
          size="sm"
          onChange={(e) => setDatabase(e.target.value)}
        />
      </FormControl>
      <Box flex={1}>
        <ResetSchemaButton
          background={resetButtonBackground}
          color={resetButtonFontColor}
          size="sm"
          skipSeedData
        >
          Setup schema
        </ResetSchemaButton>
      </Box>
    </HStack>
  );
};

const SchemaSection = ({
  initialized,
  previousStepCompleted,
}: {
  initialized: boolean;
  previousStepCompleted: boolean;
}) => {
  const schemaObjs = useSchemaObjects();
  const [selectedSchemaObj, setSelectedSchemaObj] = React.useState<
    undefined | string
  >(undefined);

  let schemaObjectModal;
  if (selectedSchemaObj) {
    schemaObjectModal = (
      <SchemaObjectModal
        onClose={() => setSelectedSchemaObj(undefined)}
        schemaObjectName={selectedSchemaObj}
      />
    );
  }

  let SchemaObjectComponent;
  if (schemaObjs.data) {
    SchemaObjectComponent = Object.keys(schemaObjs.data)
      .sort()
      .map((name) => (
        <SchemaItem
          key={name}
          name={name}
          onClick={() => setSelectedSchemaObj(name)}
        />
      ));
  }

  return (
    <>
      {schemaObjectModal}
      <Section
        completed={initialized}
        previousStepCompleted={previousStepCompleted}
        title="Setup the schema"
        left={
          <>
            <Text>
              A schema includes a database, tables and views to store all the
              data. Use the tags to create the schema.
            </Text>
            <br />
            <ConfigHeader configInitialized={initialized} />
          </>
        }
        right={
          <Flex direction="column" gap={3}>
            <Heading size="sm">Tags</Heading>
            <SimpleGrid columns={[1, 3, 3]} gap={1}>
              {SchemaObjectComponent}
            </SimpleGrid>
          </Flex>
        }
      />
    </>
  );
};

const ShowPipelineModal = ({
  onClose,
  name,
  scaleFactor,
}: {
  onClose: () => void;
  name: PipelineName;
  scaleFactor: ScaleFactor;
}) => {
  const sql = getPipelineSQL(name, scaleFactor, 8);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  return (
    <Modal
      isOpen
      onClose={onClose}
      size={isSmallScreen ? "full" : "4xl"}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create statement for pipeline {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CodeBlock mb={4}>{sql}</CodeBlock>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const usePipelineStatus = (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor,
  enabled = true
) => {
  const pipelines = useSWR(
    ["pipelineStatus", config, scaleFactor],
    () => pipelineStatus(config, scaleFactor),
    { isPaused: () => !enabled }
  );
  const completed =
    !!pipelines.data &&
    pipelines.data.length > 0 &&
    pipelines.data.every((p) => !p.needsUpdate);
  return { pipelines, completed };
};

const PipelinesSection = ({
  previousStepCompleted,
}: {
  previousStepCompleted: boolean;
}) => {
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const { pipelines, completed } = usePipelineStatus(config, scaleFactor);
  const isResettingSchema = useRecoilValue(resettingSchema);
  useSimulationMonitor(completed && !isResettingSchema);

  const [selectedPipeline, setSelectedPipeline] = React.useState<
    undefined | PipelineName
  >(undefined);

  const [working, workingCtrl] = useBoolean();

  const onEnsurePipelines = React.useCallback(async () => {
    workingCtrl.on();
    await ensurePipelinesExist(config, scaleFactor);
    pipelines.mutate();
    workingCtrl.off();
  }, [workingCtrl, config, scaleFactor, pipelines]);

  const tables = ["locations", "requests", "purchases"] as const;
  const data = useIngestChartData(config, ...tables);

  const emptyChart =
    tables.some((name) => data[name].length < 2) ||
    tables.every((name) => timeseriesIsEmpty(data[name]));

  let pipelineButtonLabel = <>Create Pipeline</>;
  if (working) {
    pipelineButtonLabel = (
      <>
        <Loader size="small" centered />
        &nbsp;Creating Pipeline
      </>
    );
  } else if (completed) {
    pipelineButtonLabel = (
      <>
        <Loader size="small" centered />
        &nbsp;Waiting for data...
      </>
    );
  }

  const ensurePipelinesButton = (
    <PrimaryButton size="sm" onClick={onEnsurePipelines} disabled={completed}>
      {pipelineButtonLabel}
    </PrimaryButton>
  );

  let sectionRight = (
    <Flex
      direction="column"
      gap={4}
      padding="15px"
      border="1px solid"
      borderRadius="15px"
      borderColor="#777582"
    >
      <IngestChart data={data} yAxisLabel="total rows" height={200} />
    </Flex>
  );
  if (emptyChart || !completed) {
    sectionRight = <Center h={220}>{ensurePipelinesButton}</Center>;
  }

  let showPipelineModal;
  if (selectedPipeline) {
    showPipelineModal = (
      <ShowPipelineModal
        onClose={() => setSelectedPipeline(undefined)}
        name={selectedPipeline}
        scaleFactor={scaleFactor}
      />
    );
  }

  const sectionLeft = (
    <>
      <Text>
        The application simulates streams for location, request and purchase
        history from simulated subscribers using{" "}
        <Link
          href="https://docs.singlestore.com/managed-service/en/load-data/about-loading-data-with-pipelines/pipeline-concepts/overview-of-pipelines.html"
          target="_blank"
        >
          {" "}
          SingleStoreDB Pipelines{" "}
        </Link>
        and{" "}
        <Link href="https://aws.amazon.com/s3/" target="_blank">
          AWS S3
        </Link>
        .
        <br />
        <br />
        View the pipelines for the following schemas:
      </Text>
      <br />
      <SimpleGrid columns={[1, 3, 3]} gap={3}>
        {pipelineNames.map((name) => (
          <SchemaItem
            key={name}
            name={name}
            onClick={() => setSelectedPipeline(name)}
          />
        ))}
      </SimpleGrid>
    </>
  );

  return (
    <>
      {showPipelineModal}
      <Section
        completed={completed}
        title="Ingest data"
        previousStepCompleted={previousStepCompleted}
        left={sectionLeft}
        right={sectionRight}
      />
    </>
  );
};

const useTableCounts = (config: ConnectionConfig, enabled = true) =>
  useSWR(
    ["overviewTableCounts", config],
    () =>
      estimatedRowCountObj(
        config,
        "locations",
        "notifications",
        "offers",
        "purchases",
        "requests",
        "segments",
        "subscriber_segments",
        "subscribers"
      ),
    { isPaused: () => !enabled }
  );

const OffersSection = ({
  previousStepCompleted,
}: {
  previousStepCompleted: boolean;
}) => {
  const config = useRecoilValue(connectionConfig);
  const [working, workingCtrl] = useBoolean();
  const tableCounts = useTableCounts(config);

  const onSeedData = React.useCallback(async () => {
    workingCtrl.on();
    await insertSeedData(config);
    tableCounts.mutate();
    workingCtrl.off();
  }, [config, tableCounts, workingCtrl]);

  const done = !!tableCounts.data?.offers;

  let loadButtonText = "Load offers";
  if (working) {
    loadButtonText = "Loading...";
  } else if (done) {
    loadButtonText = "Loaded offers!";
  }

  let loadOffersButton;
  let mapInfoContent;
  let loadButton;

  if (done) {
    mapInfoContent = (
      <Text>
        <br />
        The map to your right displays a polygon representing each offer's
        activation zone. Currently, There are ${tableCounts.data?.offers || 0} offers
        in the database.
      </Text>
    );
  } else {
    loadButton = (
      <PrimaryButton onClick={onSeedData} disabled={working} gap={2}>
        {working && <Loader size="small" />}
        {loadButtonText}
      </PrimaryButton>
    );
    loadOffersButton = (
      <Text>
        <br />
        Press the "Load offers" button to create some sample offers in New York
        City.
      </Text>
    );
  }

  return (
    <Section
      completed={done}
      title="Offers"
      previousStepCompleted={previousStepCompleted}
      left={
        <>
          <Text>
            Companies submit offers with a maximum bid price, notification zone,
            list of segments and notification content. As subscribers travel,
            they are matched with offers based on their location and segments.
            If multiple offers match to a subscriber, the highest bid price is
            selected. There are 200 simulated offers in the database.
          </Text>
          {loadOffersButton}
          {mapInfoContent}
          <br />
          {loadButton}
        </>
      }
      right={
        <Flex
          direction="column"
          gap={4}
          padding="15px"
          border="1px solid"
          borderRadius="15px"
          borderColor="#777582"
        >
          <Heading size="xs">NOTIFICATION ZONE FOR NEW YORK</Heading>
          <OfferMap
            defaultCenter={DEFAULT_CENTER}
            showCitySelectionDropDown={false}
            height={300}
          />
        </Flex>
      }
    />
  );
};

const SegmentationSection = ({
  previousStepCompleted,
}: {
  previousStepCompleted: boolean;
}) => {
  const config = useRecoilValue(connectionConfig);
  const tableCounts = useTableCounts(config);
  const { elapsed, isRunning, startTimer, stopTimer } = useTimer();
  const [warmingUp, setWarmingUp] = React.useState(false);
  const timestampCursor = React.useRef(toISOStringNoTZ(new Date()));

  const done = !!tableCounts.data?.subscriber_segments;

  const onClick = React.useCallback(async () => {
    startTimer();
    timestampCursor.current = await runUpdateSegments(
      config,
      timestampCursor.current
    );
    stopTimer();

    tableCounts.mutate();

    let isWarmingUp;
    if (elapsed && elapsed > 1000) {
      isWarmingUp = await checkPlans(config);
    }

    if (isWarmingUp) {
      setWarmingUp(isWarmingUp);
    }
  }, [startTimer, config, stopTimer, tableCounts, elapsed]);

  let workEstimate;
  if (elapsed && tableCounts.data) {
    const { segments, subscriber_segments, locations, requests, purchases } =
      tableCounts.data;
    const durationFormatted = formatMs(elapsed);
    const estRows = formatNumber(locations + requests + purchases);
    const seg = formatNumber(segments);
    const memberships = formatNumber(subscriber_segments);

    workEstimate = (
      <Text>
        The last update evaluated {estRows} rows against {seg} segments
        producing {memberships} segment memberships.
        <b>This process took {durationFormatted}.</b>
      </Text>
    );
  }

  let warmingAlert;
  if (warmingUp) {
    warmingAlert = (
      <Alert status="warning">
        <AlertIcon />
        Queries are still warming up. Please wait for a little bit and then try
        again.
      </Alert>
    );
  }

  let MatchingButtonText: React.ReactNode = "Match them";
  if (isRunning) {
    MatchingButtonText = (
      <>
        <Loader size="small" />
        &nbsp; running...
      </>
    );
  }

  return (
    <Section
      completed={done}
      title="Segmentation"
      previousStepCompleted={previousStepCompleted}
      left={
        <>
          <Text>
            A segment is defined by a simple rule, such as “bought a coffee in
            the last day” or “visited the grocery store in the last week”. While
            segments could be evaluated dynamically when matching offers to
            subscribers, this would waste compute time since segment memberships
            rarely change.
            <br />
            <br />
            Instead SingleStore periodically caches the mapping between
            subscribers and segments for faster results.
            <br />
            <br />
            Run the following query to match subscribers to segments.
          </Text>
          <br />
          <PrimaryButton disabled={isRunning} onClick={onClick}>
            {MatchingButtonText}
          </PrimaryButton>
          <br />
          <br />
          {workEstimate}
          <br />
          {warmingAlert}
        </>
      }
      right={
        <Flex direction="column" gap={4} padding="10px">
          <Code padding="5px">
            {`select count(*) from dynamic_subscriber_segments(date_sub_dynamic(now(), "minute"), now());`}
          </Code>
        </Flex>
      }
    />
  );
};

const MatchingSection = ({
  previousStepCompleted,
}: {
  previousStepCompleted: boolean;
}) => {
  const config = useRecoilValue(connectionConfig);
  const tableCounts = useTableCounts(config);
  const notificationsDataKey = useNotificationsDataKey();
  const { mutate: swrMutate } = useSWRConfig();

  const { elapsed, isRunning, startTimer, stopTimer } = useTimer();
  const [sentNotifications, setSentNotifications] = React.useState(0);
  const [warmingUp, setWarmingUp] = React.useState(false);

  const done = !!tableCounts.data?.notifications;

  const onClick = React.useCallback(async () => {
    let numSent = 0;
    let attempts = 0;

    while (numSent === 0 && attempts++ < 10) {
      startTimer();
      numSent = await runMatchingProcess(config, "second");
    }
    stopTimer();

    setSentNotifications(numSent);

    tableCounts.mutate();
    swrMutate(notificationsDataKey);

    let isWarmingUp;
    if (elapsed && elapsed > 1000) {
      isWarmingUp = await checkPlans(config);
    }

    if (isWarmingUp) {
      setWarmingUp(isWarmingUp);
    }
  }, [
    stopTimer,
    tableCounts,
    swrMutate,
    notificationsDataKey,
    elapsed,
    startTimer,
    config,
  ]);

  let workEstimate;
  if (elapsed && tableCounts.data) {
    const { offers, subscribers, subscriber_segments, notifications } =
      tableCounts.data;
    const estRows = formatNumber(offers * subscribers + notifications);
    const memberships = formatNumber(subscriber_segments);
    const durationFormatted = formatMs(elapsed);
    const sentNotifs = formatNumber(sentNotifications);
    workEstimate = (
      <Text>
        The last update evaluated up to {estRows} notification opportunities
        against {memberships} segment memberships generating {sentNotifs}
        notifications. This process took {durationFormatted}.
      </Text>
    );
  }

  let warmingAlert;
  if (warmingUp) {
    warmingAlert = (
      <Alert status="warning">
        <AlertIcon />
        Queries are still warming up. Please wait for a little bit and then try
        again.
      </Alert>
    );
  }

  let notificationButtonLabel = <>Generate notifications</>;
  if (isRunning) {
    notificationButtonLabel = (
      <>
        <Loader size="small" /> running...
      </>
    );
  }

  return (
    <Section
      completed={done}
      title="Matching"
      previousStepCompleted={previousStepCompleted}
      left={
        <>
          <Text>
            With offers and subscriber segments defined, let’s deliver ads as
            push notifications. For this demo, notifications are inserted into a
            table called “notifications”.
            <br />
            <br />
            Run the following query to generate notifications.
          </Text>
          <br />
          <PrimaryButton disabled={isRunning} onClick={onClick} gap={2}>
            {notificationButtonLabel}
          </PrimaryButton>
        </>
      }
      right={
        <Flex direction="column" gap={4} padding="10px">
          <Code padding="5px">{`select * from match_offers_to_subscribers("second");`}</Code>
          <Flex
            direction="column"
            gap={4}
            padding="15px"
            border="1px solid"
            borderRadius="15px"
            borderColor="#777582"
          >
            <PixiMap
              height={250}
              defaultCenter={DEFAULT_CENTER}
              showCitySelectionDropDown={false}
              useRenderer={useNotificationsRenderer}
              options={{}}
            />
          </Flex>
          {workEstimate}
          <br />
          {warmingAlert}
        </Flex>
      }
    />
  );
};

const CompleteToast = () => {
  const database = useRecoilValue(connectionDatabase);
  const navigate = useNavigate();
  const defaultFontTheme = useColorModeValue("white", "black");
  const linkStyle: React.CSSProperties = {
    fontWeight: "bold",
    color: defaultFontTheme,
    textDecoration: "underline",
    cursor: "pointer",
  };

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      backgroundImage={GraphicalBackground}
      backgroundSize="100% 100%"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      minHeight="250px"
    >
      <Flex
        maxWidth="50%"
        direction="row"
        justifyContent="center"
        alignItems="center"
        margin="50px"
        padding="20px 25px 10px 10px"
        gap={5}
        borderRadius="10px"
        background={useColorModeValue("#553ACF", "#CCC3F9")}
      >
        <CheckCircleIcon color={defaultFontTheme} margin="15px" fontSize="lg" />
        <Box
          color={defaultFontTheme}
          style={{ lineHeight: "28px", fontWeight: 400, fontSize: "16px" }}
        >
          <Heading size="sm">Great Job!</Heading>

          <Text>
            The applications is up and running. Explore it further by:
            <ul style={{ listStylePosition: "inside" }}>
              <li>
                Adding or removing location from{" "}
                <a onClick={() => navigate("/dashboard")} style={linkStyle}>
                  Dashboard
                </a>
              </li>
              <li>
                Inspect engagement under{" "}
                <a onClick={() => navigate("/analytics")} style={linkStyle}>
                  Analytics
                </a>
              </li>
              <li>
                Explore the{" "}
                <Link
                  href="https://portal.singlestore.com"
                  isExternal
                  style={linkStyle}
                >
                  {database}
                </Link>{" "}
                database in SingleStore Customer Portal
              </li>
            </ul>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export const Configure = () => {
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const { connected, initialized } = useConnectionState();

  const { completed: pipelinesCompleted } = usePipelineStatus(
    config,
    scaleFactor,
    connected && initialized
  );
  const { data: tableCounts } = useTableCounts(
    config,
    connected && initialized
  );

  const sectionDefinitions = [
    {
      completed: connected,
      component: <ConnectionSection key="connection" connected={connected} />,
    },
    {
      completed: initialized,
      component: (
        <SchemaSection
          key="schema"
          initialized={initialized}
          previousStepCompleted={connected}
        />
      ),
    },
    {
      completed: pipelinesCompleted,
      component: (
        <PipelinesSection key="pipelines" previousStepCompleted={initialized} />
      ),
    },
    {
      completed: (tableCounts && tableCounts.offers > 0) || false,
      component: (
        <OffersSection
          key="offers"
          previousStepCompleted={pipelinesCompleted}
        />
      ),
    },
    {
      completed: (tableCounts && tableCounts.subscriber_segments > 0) || false,
      component: (
        <SegmentationSection
          key="segmentation"
          previousStepCompleted={
            (tableCounts && tableCounts.offers > 0) || false
          }
        />
      ),
    },
    {
      completed: (tableCounts && tableCounts.notifications > 0) || false,
      component: (
        <MatchingSection
          key="matching"
          previousStepCompleted={
            (tableCounts && tableCounts.subscriber_segments > 0) || false
          }
        />
      ),
    },
  ];

  const sections = [];
  for (const { component } of sectionDefinitions) {
    sections.push(component);
  }

  let completeToast;
  if (tableCounts && !!tableCounts.notifications) {
    completeToast = <CompleteToast />;
  }

  return (
    <Container
      maxW="75%"
      mt={10}
      mb="30vh"
      paddingBottom={0}
      marginBottom="50px"
    >
      <Flex gap={5} justifyContent="space-between" marginBottom="50px">
        <Stack spacing={2}>
          <Heading fontSize="md">Setting up Your Application</Heading>
          <Text size="xs" overflowWrap="break-word">
            Connect to a SingleStoreDB workspace to see how we power the
            real-time Digital Marketing applications. If you have any questions
            or issues, please file an issue on the{" "}
            <Link
              href="https://github.com/singlestore-labs/demo-realtime-digital-marketing"
              isExternal
            >
              GitHub repo
            </Link>{" "}
            or on our forums.
          </Text>
        </Stack>
        <Box>
          <ResetSchemaButton
            background={useColorModeValue("#C53030", "#C41337")}
            color="white"
            size="sm"
            skipSeedData
            resetDataOnly
          >
            Reset application
          </ResetSchemaButton>
        </Box>
      </Flex>
      {sections}

      {completeToast}
    </Container>
  );
};
