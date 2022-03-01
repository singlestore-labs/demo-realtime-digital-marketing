import { ConnectionConfig } from "@/data/client";
import { estimatedRowCountObj } from "@/data/queries";
import { useTimeseries } from "@/data/useTimeseries";
import { Center, Spinner, Text, useColorMode } from "@chakra-ui/react";
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
import { useCallback } from "react";

type Props<TableName extends string> = {
  data: { data: { [name in TableName]: number }; ts: Date }[];
  width?: number;
  height: number;
};

export const useIngestChartData = <TableName extends string>(
  config: ConnectionConfig,
  ...tables: TableName[]
) =>
  useTimeseries({
    name: "estimatedRowCount",
    deps: tables,
    fetcher: useCallback(
      () => estimatedRowCountObj(config, ...tables),
      [config, tables]
    ),
    limit: 30,
    intervalMS: 1000,
  });

export const IngestChart = <T extends string>({ data, ...props }: Props<T>) => {
  const { colorMode } = useColorMode();

  const renderTooltip = useCallback(
    ({ tooltipData, colorScale }: RenderTooltipParams<typeof data[0]>) => {
      if (!colorScale || !tooltipData) {
        return null;
      }
      return Object.keys(tooltipData.datumByKey)
        .sort(
          (a, b) =>
            // @ts-expect-error visx doesn't allow us to easily ensure that key matches here
            tooltipData.datumByKey[b].datum.data[b] -
            // @ts-expect-error visx doesn't allow us to easily ensure that key matches here
            tooltipData.datumByKey[a].datum.data[a]
        )
        .map((key) => {
          const { datum } = tooltipData.datumByKey[key];
          // @ts-expect-error visx doesn't allow us to easily ensure that key matches here
          const value = datum.data[key] as number;
          return (
            <Text mb={1} key={key} color={colorScale(key)} fontSize="sm">
              {key}: {format(".4~s")(value)}
            </Text>
          );
        });
    },
    []
  );

  if (data.length < 2) {
    return (
      <Center height={props.height}>
        <Spinner size="md" />
      </Center>
    );
  }

  const lines =
    data.length > 0
      ? Object.keys(data[0].data)
          .filter((key) => key !== "ts")
          .map((key) => (
            <AnimatedLineSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={(datum) => datum?.ts}
              yAccessor={
                // @ts-expect-error visx doesn't allow us to easily ensure that key matches here
                (datum) => datum?.data[key]
              }
            />
          ))
      : null;

  return (
    <XYChart
      xScale={{ type: "time" }}
      yScale={{ type: "sqrt", nice: true, zero: false, clamp: true }}
      theme={colorMode === "light" ? lightTheme : darkTheme}
      margin={{ left: 0, right: 40, top: 10, bottom: 20 }}
      {...props}
    >
      <Axis orientation="bottom" numTicks={5} />
      <Axis
        orientation="right"
        numTicks={props.height < 250 ? 3 : 5}
        tickFormat={format("~s")}
      />
      {lines}
      <Tooltip
        showVerticalCrosshair
        detectBounds={false}
        offsetLeft={-175}
        offsetTop={20}
        renderTooltip={renderTooltip}
      />
    </XYChart>
  );
};
