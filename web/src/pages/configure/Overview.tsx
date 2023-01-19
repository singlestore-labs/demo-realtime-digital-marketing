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
import { useSimulationMonitor } from "@/data/useSimulationMonitor";
import { toISOStringNoTZ } from "@/datetime";
import { formatMs, formatNumber } from "@/format";
import {
  useNotificationsDataKey,
  useNotificationsRenderer,
} from "@/render/useNotificationsRenderer";
import { ScaleFactor } from "@/scalefactors";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Collapse,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useBoolean,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsCheckCircleFill, BsInfoCircleFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR, { useSWRConfig } from "swr";
import GraphicalBackground from "../../assets/graphical-background.svg";
import { CodeBlock } from "../../components/CodeBlock";
import { DatabaseConfigForm } from "../../components/DatabaseConfigForm";
import { IngestChart, useIngestChartData } from "../../components/IngestChart";
import { MarkdownText } from "../../components/MarkdownText";
import { OfferMap } from "../../components/OfferMap";
import { DEFAULT_CENTER, PixiMap } from "../../components/PixiMap";
import { ResetSchemaButton } from "../../components/ResetSchemaButton";
import { ConnectionConfig } from "../../data/client";
import {
  useConnectionState,
  useSchemaObjects,
  useTimer,
} from "../../data/Hooks/hooks";

const CollapsibleSection = (props: {
  title: string | ReactElement;
  childComponent: ReactElement;
  disabled: boolean;
  buttonStyle: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  childContainerStyle?: React.CSSProperties;
}) => {
  const [sectionOpen, setSectionOpen] = useState(!props.disabled);

  useEffect(() => {
    setSectionOpen(!props.disabled);
  }, [props.disabled]);

  return (
    <div style={props.containerStyle}>
      <Button
        justifyContent={"space-between"}
        size={"sm"}
        width={"100%"}
        style={props.buttonStyle}
        onClick={() => setSectionOpen(!sectionOpen)}
      >
        {props.title}
        {sectionOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      <div style={props.childContainerStyle}>
        <Collapse in={sectionOpen}>{props.childComponent}</Collapse>
      </div>
    </div>
  );
};

const Section = (props: {
  completed: boolean;
  previousStepCompleted: boolean;
  title: string;
  left: ReactNode;
  right: ReactNode;
}) => {
  const { title, left, right } = props;
  const { colorMode } = useColorMode();

  return (
    <CollapsibleSection
      disabled={!props.completed && !props.previousStepCompleted}
      title={
        <Flex width={"100%"} alignItems={"center"} gap={1.5}>
          {props.completed ? (
            <Icon as={BsCheckCircleFill} />
          ) : (
            <Icon as={BsInfoCircleFill} />
          )}
          {title}
        </Flex>
      }
      childComponent={
        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
          <GridItem>{left}</GridItem>
          <GridItem>{right}</GridItem>
        </Grid>
      }
      buttonStyle={{
        border:
          !props.completed && !props.previousStepCompleted
            ? `1px solid ${
                colorMode === "light" ? "#ECE8FD" : "rgba(85, 58, 207, 0.5)"
              }`
            : undefined,
        background: props.completed
          ? colorMode === "light"
            ? "#ECE8FD"
            : "#CCC3F9"
          : props.previousStepCompleted
          ? "#2F206E"
          : "transparent",
        color: props.completed
          ? "#553ACF"
          : props.previousStepCompleted
          ? "#ECE8FD"
          : "rgba(119, 117, 130, 0.8)",
      }}
      containerStyle={{
        marginTop: "30px",
        marginBottom: "30px",
      }}
      childContainerStyle={{
        padding: "10px",
        opacity: props.previousStepCompleted ? 1 : 0.5,
        pointerEvents: props.previousStepCompleted ? undefined : "none",
      }}
    />
  );
};

const ConnectionSection = ({ connected }: { connected: boolean }) => {
  return (
    <>
      <Section
        completed={connected}
        title="Connect to SingleStore"
        previousStepCompleted={true}
        left={
          <MarkdownText>
            {`
            Please enter the host and port number for the specific Workspace you want to connect to. Then enter the Workspace Group username and password credentials.
            
            [Know more](https://docs.singlestore.com/managed-service/en/reference/data-api.html)
          `}
          </MarkdownText>
        }
        right={<DatabaseConfigForm />}
      />
    </>
  );
};

const SchemaObjectModal = ({
  onClose,
  schemaObjectName,
}: {
  onClose: () => void;
  schemaObjectName: string;
}) => {
  const obj = findSchemaObjectByName(schemaObjectName);
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
        <ModalHeader>Create statement for {obj.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CodeBlock mb={4}>{obj.statement}</CodeBlock>
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
  const { colorMode } = useColorMode();

  return (
    <GridItem
      key={name}
      bg={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
      fontSize="xs"
      color={colorMode === "light" ? "#553ACF" : "#ECE8FD"}
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

const SchemaSection = ({
  initialized,
  previousStepCompleted,
}: {
  initialized: boolean;
  previousStepCompleted: boolean;
}) => {
  const [database, setDatabase] = useRecoilState(connectionDatabase);
  const schemaObjs = useSchemaObjects();
  const [selectedSchemaObj, setSelectedSchemaObj] = useState<null | string>();
  const { colorMode } = useColorMode();

  return (
    <>
      {!!selectedSchemaObj && (
        <SchemaObjectModal
          onClose={() => setSelectedSchemaObj(null)}
          schemaObjectName={selectedSchemaObj}
        />
      )}
      <Section
        completed={initialized}
        previousStepCompleted={previousStepCompleted}
        title="Setup the schema"
        left={
          <>
            <MarkdownText>
              {`
                A schema includes a database, tables and views to store all the data. Use the tags to create the schema.
              `}
            </MarkdownText>
            {initialized ? undefined : (
              <HStack alignItems="flex-end">
                <FormControl flex={1}>
                  <FormLabel
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
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
                    background={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
                    color={colorMode === "light" ? "#553ACF" : "#ECE8FD"}
                    size="sm"
                    skipSeedData
                  >
                    Setup schema
                  </ResetSchemaButton>
                </Box>
              </HStack>
            )}
          </>
        }
        right={
          <Flex direction={"column"} gap={3}>
            <Heading size={"sm"}>Tags</Heading>
            <SimpleGrid columns={[1, 3, 3]} gap={1}>
              {Object.keys(schemaObjs.data || {})
                .sort()
                .map((name) => (
                  <SchemaItem
                    key={name}
                    name={name}
                    onClick={() => setSelectedSchemaObj(name)}
                  />
                ))}
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
  const completed = pipelines.data?.length
    ? pipelines.data.every((p) => !p.needsUpdate)
    : false;
  return { pipelines, completed };
};

const PipelinesSection = (props: { previousStepCompleted: boolean }) => {
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const { pipelines, completed } = usePipelineStatus(config, scaleFactor);
  const isResettingSchema = useRecoilValue(resettingSchema);
  const { colorMode } = useColorMode();
  useSimulationMonitor(completed && !isResettingSchema);

  const [selectedPipeline, setSelectedPipeline] =
    useState<null | PipelineName>();

  const [working, workingCtrl] = useBoolean();

  const onEnsurePipelines = useCallback(async () => {
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

  const ensurePipelinesButton = (
    <Button
      background={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
      color={colorMode === "light" ? "#553ACF" : "#ECE8FD"}
      size="sm"
      onClick={onEnsurePipelines}
      disabled={completed}
    >
      {(working || completed) && <Spinner mr={2} />}
      {working
        ? "Creating Pipelines"
        : completed
        ? "...waiting for data"
        : "Create pipelines"}
    </Button>
  );

  return (
    <>
      {!!selectedPipeline && (
        <ShowPipelineModal
          onClose={() => setSelectedPipeline(null)}
          name={selectedPipeline}
          scaleFactor={scaleFactor}
        />
      )}
      <Section
        completed={completed}
        title="Ingest data"
        previousStepCompleted={props.previousStepCompleted}
        left={
          <>
            <MarkdownText>
              {`
                The application simulates streams for location, request and purchase history from simulated subscribers
                using [SingleStore](https://docs.singlestore.com/managed-service/en/load-data/about-loading-data-with-pipelines/pipeline-concepts/overview-of-pipelines.html) Pipelines and [AWS S3](https://aws.amazon.com/s3/).
                
                You can view the schema of each pipeline via the following buttons:
              `}
            </MarkdownText>
            <SimpleGrid columns={[1, 3, 3]} gap={1}>
              {pipelineNames.map((name) => (
                <SchemaItem
                  key={name}
                  name={name}
                  onClick={() => setSelectedPipeline(name)}
                />
              ))}
            </SimpleGrid>
          </>
        }
        right={
          emptyChart || !completed ? (
            <Center h={220}>{ensurePipelinesButton}</Center>
          ) : (
            <Flex
              direction={"column"}
              gap={4}
              padding={"15px"}
              border={"1px solid"}
              borderRadius={"15px"}
              borderColor={"#777582"}
            >
              <IngestChart data={data} yAxisLabel="total rows" height={200} />
            </Flex>
          )
        }
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

const OffersSection = (props: { previousStepCompleted: boolean }) => {
  const config = useRecoilValue(connectionConfig);
  const [working, workingCtrl] = useBoolean();
  const tableCounts = useTableCounts(config);

  const onSeedData = useCallback(async () => {
    workingCtrl.on();
    await insertSeedData(config);
    tableCounts.mutate();
    workingCtrl.off();
  }, [config, tableCounts, workingCtrl]);

  const done = !!tableCounts.data?.offers;
  const { colorMode } = useColorMode();

  return (
    <Section
      completed={done}
      title="Offers"
      previousStepCompleted={props.previousStepCompleted}
      left={
        <>
          <MarkdownText>
            {`
              Companies submit offers with a maximum bid price, notification zone, list of segments and notification content.
              As subscribers travel, they are matched with offers based on their location and segments.
              If multiple offers match to a subscriber, the highest bid price is selected.There are 200 simulated offers in the database.
            `}
            {!done &&
              `
                Press the "load offers" button on the right to create some
                sample offers in New York City.
            `}
            {done &&
              `
                The map to your right displays a polygon representing each
                offer's activation zone. Hover over a polygon to see it's exact
                boundary. There are ${tableCounts.data?.offers} offers in the
                database.
            `}
          </MarkdownText>
          {!done ? (
            <Button
              background={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
              color={colorMode === "light" ? "#553ACF" : "#ECE8FD"}
              onClick={onSeedData}
              disabled={working}
            >
              {working && <Spinner mr={2} />}
              {working ? "loading..." : done ? "loaded offers!" : "load offers"}
            </Button>
          ) : undefined}
        </>
      }
      right={
        <Flex
          direction={"column"}
          gap={4}
          padding={"15px"}
          border={"1px solid"}
          borderRadius={"15px"}
          borderColor={"#777582"}
        >
          <Heading size={"xs"}>NOTIFICATION ZONE FOR NEW YORK</Heading>
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

const SegmentationSection = (props: { previousStepCompleted: boolean }) => {
  const config = useRecoilValue(connectionConfig);
  const tableCounts = useTableCounts(config);
  const { elapsed, isRunning, startTimer, stopTimer } = useTimer();
  const [warmingUp, setWarmingUp] = useState(false);
  const timestampCursor = useRef(toISOStringNoTZ(new Date()));
  const { colorMode } = useColorMode();

  const done = !!tableCounts.data?.subscriber_segments;

  const onClick = useCallback(async () => {
    startTimer();
    timestampCursor.current = await runUpdateSegments(
      config,
      timestampCursor.current
    );
    stopTimer();

    tableCounts.mutate();

    setWarmingUp((elapsed || 0) > 1000 && (await checkPlans(config)));
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
      <MarkdownText>
        {`
          The last update evaluated ${estRows} rows against ${seg} segments
          producing ${memberships} segment memberships.
          
          **This process took ${durationFormatted}**.
        `}
      </MarkdownText>
    );
  }

  return (
    <Section
      completed={done}
      title="Segmentation"
      previousStepCompleted={props.previousStepCompleted}
      left={
        <>
          <MarkdownText>
            {`
            A segment is defined by a simple rule, such as “bought a coffee in the last day” or “visited the grocery store in the last week”.
            While segments could be evaluated dynamically when matching offers to subscribers, this would waste compute time since segment
            memberships rarely change. Instead SingleStore periodically caches the mapping between subscribers and segments for faster results.

            Click the button to run the update interactively, or run the following query in your favorite SQL client:
          `}
          </MarkdownText>

          <Button
            background={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
            color={colorMode === "light" ? "#553ACF" : "#ECE8FD"}
            disabled={isRunning}
            onClick={onClick}
          >
            {isRunning && <Spinner mr={2} />}
            {isRunning ? "...running" : "Match subscribers to segments"}
          </Button>
          {workEstimate}
          {warmingUp && (
            <Alert status="warning">
              <AlertIcon />
              Queries are still warming up. Please wait for a little bit and
              then try again.
            </Alert>
          )}
        </>
      }
      right={
        <Flex direction={"column"} gap={4} padding={"10px"}>
          <MarkdownText>
            {`    select count(*) from dynamic_subscriber_segments(date_sub_dynamic(now(), "minute"), now());`}
          </MarkdownText>
        </Flex>
      }
    />
  );
};

const MatchingSection = (props: { previousStepCompleted: boolean }) => {
  const config = useRecoilValue(connectionConfig);
  const tableCounts = useTableCounts(config);
  const notificationsDataKey = useNotificationsDataKey();
  const { mutate: swrMutate } = useSWRConfig();
  const { colorMode } = useColorMode();

  const { elapsed, isRunning, startTimer, stopTimer } = useTimer();
  const [sentNotifications, setSentNotifications] = useState(0);
  const [warmingUp, setWarmingUp] = useState(false);

  const done = !!tableCounts.data?.notifications;

  const onClick = useCallback(async () => {
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

    setWarmingUp((elapsed || 0) > 1000 && (await checkPlans(config)));
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
      <MarkdownText>
        {`
          The last update evaluated up to ${estRows} notification opportunities
          against ${memberships} segment memberships generating ${sentNotifs}
          notifications. This process took ${durationFormatted}.
        `}
      </MarkdownText>
    );
  }

  return (
    <Section
      completed={done}
      title="Matching"
      previousStepCompleted={props.previousStepCompleted}
      left={
        <>
          <MarkdownText>
            {`
            Now that we have offers and have assigned subscribers to segments,
            we are finally able to deliver ads to subscribers as push
            notifications. In this demo, rather than actually sending
            notifications we will insert them into a table called
            "notifications".

            Click the button to generate notifications interactively, or run the
            following query in your favorite SQL client:

          `}
          </MarkdownText>
          <br />
          <Button
            background={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
            color={colorMode === "light" ? "#553ACF" : "#ECE8FD"}
            disabled={isRunning}
            onClick={onClick}
          >
            {isRunning && <Spinner mr={2} />}
            {isRunning ? "...running" : "Generate notifications"}
          </Button>
        </>
      }
      right={
        <Flex direction={"column"} gap={4} padding={"10px"}>
          <MarkdownText>{`    select * from match_offers_to_subscribers("second");`}</MarkdownText>
          <Flex
            direction={"column"}
            gap={4}
            padding={"15px"}
            border={"1px solid"}
            borderRadius={"15px"}
            borderColor={"#777582"}
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
          {warmingUp && (
            <Alert status="warning">
              <AlertIcon />
              Queries are still warming up. Please wait for a little bit and
              then try again.
            </Alert>
          )}
        </Flex>
      }
    />
  );
};

export const Overview = () => {
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const { connected, initialized } = useConnectionState();
  const database = useRecoilValue(connectionDatabase);
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
      completed: tableCounts ? tableCounts.offers > 0 : false,
      component: (
        <OffersSection
          key="offers"
          previousStepCompleted={pipelinesCompleted}
        />
      ),
    },
    {
      completed: tableCounts ? tableCounts.subscriber_segments > 0 : false,
      component: (
        <SegmentationSection
          key="segmentation"
          previousStepCompleted={tableCounts ? tableCounts.offers > 0 : false}
        />
      ),
    },
    {
      completed: tableCounts ? tableCounts.notifications > 0 : false,
      component: (
        <MatchingSection
          key="matching"
          previousStepCompleted={
            tableCounts ? tableCounts.subscriber_segments > 0 : false
          }
        />
      ),
    },
  ];

  const sections = [];
  for (const { component } of sectionDefinitions) {
    sections.push(component);
  }

  return (
    <Container
      maxW="75%"
      mt={10}
      mb="30vh"
      paddingBottom={0}
      marginBottom={"50px"}
    >
      <Flex gap={5} justifyContent={"space-between"} marginBottom={"50px"}>
        <Box>
          <Heading fontSize={"md"}>Application set up</Heading>
          <Text size="xs" overflowWrap={"break-word"}>
            Connect to a SingleStoreDB workspace to see how SingleStoreDB can
            power the Realtime Digital Marketing applications. If you have any
            questions or issues, please file an issue on the GitHub repo or on
            our forums.
          </Text>
        </Box>
        <Box>
          <ResetSchemaButton
            colorScheme="red"
            size="sm"
            skipSeedData
            resetDataOnly
          >
            Reset application
          </ResetSchemaButton>
        </Box>
      </Flex>
      {sections}

      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        backgroundImage={GraphicalBackground}
        backgroundSize={"110% 110%"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        minHeight="300px"
      >
        {tableCounts ? (
          <Flex
            maxWidth={"50%"}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            margin={"50px"}
            padding={"20px 25px 10px 10px"}
            gap={5}
            borderRadius={"10px"}
            background={"#4F34C7"}
            color={"white"}
          >
            <CheckCircleIcon margin={"15px"} fontSize={"lg"} />
            <Box
              color={"white"}
              style={{ lineHeight: "28px", fontWeight: 400, fontSize: "16px" }}
            >
              <Heading size={"sm"}>Great Job!</Heading>

              <p>
                The applications is up and running. Explore it further by:
                <ul style={{ listStylePosition: "inside" }}>
                  <li>
                    Adding or removing location from{" "}
                    <a
                      href="/"
                      color="white"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    Inspect engagement under{" "}
                    <a
                      href="/analytics"
                      color="white"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Analytics
                    </a>
                  </li>
                  <li>
                    Explore the{" "}
                    <a
                      href="/https://portal.singlestore.com"
                      color="white"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {database}
                    </a>{" "}
                    database in SingleStore Studio
                  </li>
                </ul>
              </p>
            </Box>
          </Flex>
        ) : undefined}
      </Flex>
    </Container>
  );
};