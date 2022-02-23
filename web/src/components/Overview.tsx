import { DatabaseConfigForm } from "@/components/DatabaseConfigForm";
import { MarkdownText } from "@/components/MarkdownText";
import { OfferMap } from "@/components/OfferMap";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { useConnectionState, useSchemaObjects } from "@/data/hooks";
import {
  countOffers,
  ensurePipelinesExist,
  estimatedRowCount,
  insertSeedData,
  pipelineStatus,
} from "@/data/queries";
import {
  configScaleFactor,
  connectionConfig,
  connectionDatabase,
} from "@/data/recoil";
import { useTimeseries } from "@/data/useTimeseries";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconProps,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  useBoolean,
  useColorMode,
} from "@chakra-ui/react";
import {
  AnimatedLineSeries,
  Axis,
  darkTheme,
  lightTheme,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import { RenderTooltipParams } from "@visx/xychart/lib/components/Tooltip";
import { format } from "d3-format";
import { ReactNode, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";

const Section = (props: {
  completed: boolean;
  title: string;
  left: ReactNode;
  right: ReactNode;
}) => {
  const { completed, title, left, right } = props;
  const { colorMode } = useColorMode();

  const colorSuffix = colorMode === "light" ? ".300" : ".500";
  const textColor = completed ? "gray" + colorSuffix : undefined;
  const iconColor = (completed ? "green" : "gray") + colorSuffix;

  const iconProps: IconProps = {
    boxSize: 6,
    position: "relative",
    bottom: 0.5,
    mr: 2,
  };

  return (
    <>
      <GridItem>
        <Heading as="h2" size="lg" mb={4} color={textColor}>
          <CheckCircleIcon color={iconColor} {...iconProps} />
          {title}
        </Heading>
        {left}
      </GridItem>
      <GridItem>{right}</GridItem>
    </>
  );
};

const ConnectionSection = ({ connected }: { connected: boolean }) => {
  return (
    <Section
      completed={connected}
      title="Connect to SingleStore"
      left={
        <MarkdownText>
          {`
            This demo requires a connection to SingleStore's HTTP API. Please
            ensure the connection details on the right are correct.
            
            **Note**: The HTTP API may need to be enabled on your SingleStore
            cluster. To do so please see [our documentation][1] or contact
            support for assistance.
            
            [1]: https://docs.singlestore.com/docs/http-api/
          `}
        </MarkdownText>
      }
      right={<DatabaseConfigForm />}
    />
  );
};

const SchemaSection = ({ initialized }: { initialized: boolean }) => {
  const [database, setDatabase] = useRecoilState(connectionDatabase);
  const schemaObjs = useSchemaObjects();
  const { colorMode } = useColorMode();

  return (
    <Section
      completed={initialized}
      title="Setup the schema"
      left={
        <>
          <MarkdownText>
            {`
              Our schema includes the database and a set of tables and views we
              need to store all of our data. Use the controls below to set the
              database name and create the schema.
            `}
          </MarkdownText>
          <Divider mt={4} mb={6} />
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
                placeholder="s2cellular"
                value={database}
                size="sm"
                onChange={(e) => setDatabase(e.target.value)}
              />
            </FormControl>
            <Box flex={1} textAlign="center">
              <ResetSchemaButton
                colorScheme="blue"
                size="sm"
                disabled={initialized}
              >
                {initialized ? "Schema is setup" : "Setup schema"}
              </ResetSchemaButton>
            </Box>
          </HStack>
        </>
      }
      right={
        <SimpleGrid columns={[1, 2, 2]} gap={1}>
          {Object.keys(schemaObjs.data || {})
            .sort()
            .map((name) => (
              <GridItem
                key={name}
                bg={
                  (schemaObjs.data?.[name] ? "green" : "gray") +
                  (colorMode === "light" ? ".200" : ".600")
                }
                color={colorMode === "light" ? "gray.800" : "gray.100"}
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                borderRadius="md"
                px={2}
                py={1}
                textAlign="center"
              >
                {name}
              </GridItem>
            ))}
        </SimpleGrid>
      }
    />
  );
};

const PipelinesSection = () => {
  const { colorMode } = useColorMode();
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const pipelines = useSWR(["pipelineStatus", config, scaleFactor], () =>
    pipelineStatus(config, scaleFactor)
  );
  const completed = !!pipelines.data?.every((p) => !p.needsUpdate);

  const [working, workingCtrl] = useBoolean();

  const onEnsurePipelines = useCallback(async () => {
    workingCtrl.on();
    await ensurePipelinesExist(config, scaleFactor);
    pipelines.mutate();
    workingCtrl.off();
  }, [workingCtrl, config, scaleFactor, pipelines]);

  const data = useTimeseries({
    name: "estimatedRowCount",
    fetcher: useCallback(async () => {
      const counts = await estimatedRowCount(config, [
        "locations",
        "requests",
        "purchases",
      ]);

      return counts.reduce(
        (acc, { tableName, count }) => {
          acc[tableName] = count;
          return acc;
        },
        { locations: 0, requests: 0, purchases: 0 }
      );
    }, [config]),
    limit: 30,
    intervalMS: 1000,
  });

  const emptyChart = data.every(
    (d) => d.locations + d.purchases + d.requests === 0
  );

  const ensurePipelinesButton = (
    <Button
      colorScheme="blue"
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

  const renderTooltip = useCallback(
    ({ tooltipData, colorScale }: RenderTooltipParams<typeof data[0]>) => {
      if (!colorScale || !tooltipData) {
        return null;
      }
      return Object.keys(tooltipData.datumByKey)
        .sort(
          (a, b) =>
            // @ts-expect-error visx doesn't allow us to easily ensure that key matches here
            tooltipData.datumByKey[b].datum[b] -
            // @ts-expect-error visx doesn't allow us to easily ensure that key matches here
            tooltipData.datumByKey[a].datum[a]
        )
        .map((key) => {
          const { datum } = tooltipData.datumByKey[key];
          // @ts-expect-error visx doesn't allow us to easily ensure that key matches here
          const value = datum[key] as number;
          return (
            <Text mb={1} key={key} color={colorScale(key)} fontSize="sm">
              {key}: {format(".4~s")(value)}
            </Text>
          );
        });
    },
    []
  );

  const chart = (
    <XYChart
      height={300}
      xScale={{ type: "time" }}
      yScale={{ type: "log", base: 10, nice: true }}
      theme={colorMode === "light" ? lightTheme : darkTheme}
    >
      <Axis orientation="bottom" numTicks={3} />
      <Axis
        orientation="right"
        tickFormat={(v) => {
          const e = Math.log10(v);
          if (e !== Math.floor(e)) {
            // ignore non-exact power of ten
            return;
          }
          return format("~s")(v);
        }}
      />
      <AnimatedLineSeries
        dataKey="locations"
        data={data}
        xAccessor={(datum) => datum?.ts}
        yAccessor={(datum) => datum?.locations}
      />
      <AnimatedLineSeries
        dataKey="requests"
        data={data}
        xAccessor={(datum) => datum?.ts}
        yAccessor={(datum) => datum?.requests}
      />
      <AnimatedLineSeries
        dataKey="purchases"
        data={data}
        xAccessor={(datum) => datum?.ts}
        yAccessor={(datum) => datum?.purchases}
      />
      <Tooltip
        showVerticalCrosshair
        detectBounds={false}
        renderTooltip={renderTooltip}
      />
    </XYChart>
  );

  return (
    <Section
      completed={completed}
      title="Ingest data"
      left={
        <MarkdownText>
          {`
            S2 Cellular needs location, request, and purchase history from each
            of it's subscribers in real time. We will simulate these streams by
            using [SingleStore Pipelines][1] to ingest data from [AWS S3][2].

            [1]: https://docs.singlestore.com/managed-service/en/load-data/about-loading-data-with-pipelines/pipeline-concepts/overview-of-pipelines.html
            [2]: https://aws.amazon.com/s3/
          `}
        </MarkdownText>
      }
      right={
        emptyChart ? <Center h="100%">{ensurePipelinesButton}</Center> : chart
      }
    />
  );
};

const OffersSection = () => {
  const config = useRecoilValue(connectionConfig);
  const [working, workingCtrl] = useBoolean();
  const numOffers = useSWR(["countOffers", config], () => countOffers(config));

  const onSeedData = useCallback(async () => {
    workingCtrl.on();
    await insertSeedData(config);
    numOffers.mutate();
    workingCtrl.off();
  }, [config, numOffers, workingCtrl]);

  const done = !!numOffers.data;

  return (
    <Section
      // TODO: check offers exist
      completed={done}
      title="Offers"
      left={
        <>
          <MarkdownText>
            {`
              S2 Cellular allows any company to place offers. Each offer has a
              maximum bid price, activation zone, list of segments, and
              notification content. As subscribers move around, they are
              continuously matched to offers based on their location and
              whichever segments they are members of. If multiple offers match
              the offer with the highest bid price will be selected.
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
                boundary. There are ${numOffers.data} offers in the database.
            `}
          </MarkdownText>
        </>
      }
      right={
        !done ? (
          <Center h="100%">
            <Button onClick={onSeedData} disabled={working}>
              {working && <Spinner mr={2} />}
              {working ? "loading..." : done ? "loaded offers!" : "load offers"}
            </Button>
          </Center>
        ) : (
          <OfferMap height={300} defaultZoom={11} />
        )
      }
    />
  );
};

const SegmentationSection = () => {
  return (
    <Section
      // TODO: check segments exist
      completed={false}
      title="Segmentation"
      left={
        <MarkdownText>
          {`
          `}
        </MarkdownText>
      }
      right={<Box>Coming soon</Box>}
    />
  );
};

const MatchingSection = () => {
  return (
    <Section
      // TODO: check notifications exist
      completed={false}
      title="Matching"
      left={
        <MarkdownText>
          {`
          `}
        </MarkdownText>
      }
      right={<Box>Coming soon</Box>}
    />
  );
};

const Requires = (p: { r: boolean; children: ReactNode }) =>
  p.r ? <>{p.children}</> : null;

export const Overview = () => {
  const { connected, initialized } = useConnectionState();

  return (
    <Container maxW="container.lg" mt={10} mb={20}>
      <Box maxW="container.md" mb={10} px={0}>
        <MarkdownText>
          {`
            ## Welcome to S2 Cellular!

            S2 Cellular is a hypothetical telecom company which provides free
            cell-phone plans in exchange for delivering targeted ads to
            subscribers. To do this, S2 Cellular collects location, browser, and
            purchase history from devices and stores it in SingleStore. Before we
            can deliver ads, we need to place subscribers in segments via
            comparing their history against segments our advertisers care about.
            Finally, we use geospatial indexes along with segments to deliver ads
            to devices as they move around the world.

            This page will take you through the process of setting up the demo,
            explaining everything as we go. If you have any questions or issues, please
            file an issue on the [GitHub repo][1] or our [forums][2].

            [1]: https://github.com/singlestore-labs/demo-s2cellular
            [2]: https://www.singlestore.com/forum/
          `}
        </MarkdownText>
      </Box>
      <Grid
        columnGap={6}
        rowGap={10}
        templateColumns={["minmax(0, 1fr)", null, "repeat(2, minmax(0, 1fr))"]}
      >
        <ConnectionSection connected={connected} />
        <Requires r={connected}>
          <SchemaSection initialized={initialized} />
        </Requires>
        <Requires r={initialized}>
          <PipelinesSection />
          <OffersSection />
          <SegmentationSection />
          <MatchingSection />
        </Requires>
      </Grid>
    </Container>
  );
};
