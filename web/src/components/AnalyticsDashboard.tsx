import { MarkdownText } from "@/components/MarkdownText";
import { overallConversionRate } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { Container, Grid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { format } from "d3-format";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

export const AnalyticsDashboard = () => {
  const config = useRecoilValue(connectionConfig);
  const overallRate = useSWR(
    ["overallConversionRate", config],
    () => overallConversionRate(config),
    { refreshInterval: 1000 }
  );
  const formatPct = format(",.2%");

  return (
    <Container maxW="container.lg" mt={10} mb="30vh">
      <Container maxW="container.md" mb={10}>
        <MarkdownText>
          {`
            ## Analytics

            This page showcases some useful business analytics.
          `}
        </MarkdownText>
      </Container>
      <Grid
        templateColumns="repeat(auto-fit, minmax(100px, 1fr))"
        columnGap={2}
        rowGap={2}
      >
        <Stat>
          <StatLabel>Overall Rate</StatLabel>
          <StatNumber>
            {formatPct(overallRate.data?.conversionRate || 0)}
          </StatNumber>
        </Stat>
      </Grid>
    </Container>
  );
};
