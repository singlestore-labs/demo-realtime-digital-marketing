import { CodeBlock } from "@/components/CodeBlock";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
import { useConnectionState } from "@/data/hooks";
import { TABLES } from "@/data/sql";
import { Container, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

export const Overview = () => {
  const { connected, initialized } = useConnectionState();

  return (
    <Container maxW="container.lg">
      <Grid
        columnGap={2}
        rowGap={6}
        templateColumns={["inherit", "inherit", "repeat(2, minmax(0, 1fr))"]}
      >
        <GridItem>
          <Heading as="h1" size="xl">
            Welcome to the S2 Cellular demo!
          </Heading>
          <Text>
            S2 Cellular is a hypothetical telecom company which provides free
            cell-phone plans in exchange for delivering targeted ads to
            subscribers. To do this, S2 Cellular collects location, browser, and
            purchase history from devices and stores it in SingleStore. Before
            we can deliver ads, we need to place subscribers in segments via
            comparing their history against segments our advertisers care about.
            Finally, we use geospatial indexes along with segments to deliver
            ads to devices as they move around the world.
          </Text>
        </GridItem>
        <GridItem />
        <GridItem>
          <Heading size="lg">Schema</Heading>
          <Text>Before we can start loading data, we need a schema.</Text>
          <ResetSchemaButton mt={2} colorScheme="green">
            {initialized ? "Reset schema" : "Setup schema"}
          </ResetSchemaButton>
        </GridItem>
        <GridItem>
          <CodeBlock maxH="400px">
            {TABLES.map((t) => t.createStmt).join("\n\n")}
          </CodeBlock>
        </GridItem>
        <GridItem>
          <Heading size="lg">Pipelines</Heading>
        </GridItem>
        <GridItem>
          <CodeBlock>pipelines</CodeBlock>
        </GridItem>
        <GridItem>
          <Heading size="lg">Segmentation</Heading>
        </GridItem>
        <GridItem>
          <CodeBlock>segmentation</CodeBlock>
        </GridItem>
        <GridItem>
          <Heading size="lg">Matching</Heading>
        </GridItem>
        <GridItem>
          <CodeBlock>matching</CodeBlock>
        </GridItem>
      </Grid>
    </Container>
  );
};
