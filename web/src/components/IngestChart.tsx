import { Center, Text, useColorMode } from "@chakra-ui/react";
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
import * as React from "react";
import useSWR from "swr";

import { Loader } from "@/components/customcomponents/loader/Loader";
import { ConnectionConfig } from "@/data/client";
import { estimatedRowCountObj } from "@/data/queries";
import { Timeseries, TimeseriesPoint } from "@/data/timeseries";

const SI_FORMAT = format("~s");

export const useIngestChartData = <TableName extends string>(
  config: ConnectionConfig,
  ...tables: Array<TableName>
) => {
  type ReturnType = { [name in TableName]: Timeseries };
  const emptyCache = React.useMemo(
    () => tables.reduce((a, n) => ({ ...a, [n]: [] }), {} as ReturnType),
    [tables]
  );
  const cache = React.useRef<ReturnType>(emptyCache);

  const { data } = useSWR(
    ["estimatedRowCount.timeseries", ...tables],
    async () => {
      const newData = await estimatedRowCountObj(config, ...tables);
      const now = new Date();

      cache.current = tables.reduce((memo, name) => {
        const ts = cache.current[name];

        // add new point
        ts.push([now, newData[name]]);

        // truncate to last 30 points
        memo[name] = ts.slice(-30);

        return memo;
      }, {} as ReturnType);

      return cache.current;
    },
    { refreshInterval: 1000 }
  );

  if (data) {
    return data;
  }

  return emptyCache;
};

type Props<TableName extends string> = {
  data: { [name in TableName]: Timeseries };
  yAxisLabel: string;
  width?: number;
  height: number;
};

export const IngestChart = <TableName extends string>({
  data,
  yAxisLabel,
  ...props
}: Props<TableName>) => {
  const { colorMode } = useColorMode();
  const tables = Object.keys(data) as Array<TableName>;

  const renderTooltip = React.useCallback(
    ({ tooltipData, colorScale }: RenderTooltipParams<TimeseriesPoint>) => {
      if (!colorScale || !tooltipData) {
        return null;
      }
      return tables
        .sort(
          (a, b) =>
            tooltipData.datumByKey[b].datum[1] -
            tooltipData.datumByKey[a].datum[1]
        )
        .map((name) => {
          const { datum } = tooltipData.datumByKey[name];
          return (
            <Text mb={1} key={name} color={colorScale(name)} fontSize="sm">
              {name}: {format(".4~s")(datum[1])}
            </Text>
          );
        });
    },
    [tables]
  );

  const yTickFormat = React.useCallback(
    (v: number) => SI_FORMAT(v).replace("G", "B"),
    []
  );

  if (tables.some((name) => data[name].length < 2)) {
    return (
      <Center height={props.height}>
        <Loader size="small" centered />
      </Center>
    );
  }

  const lines = tables.map((name) => (
    <AnimatedLineSeries
      key={name}
      dataKey={name}
      data={data[name]}
      xAccessor={(datum) => datum[0]}
      yAccessor={(datum) => datum[1]}
    />
  ));

  return (
    <XYChart
      xScale={{ type: "time" }}
      yScale={{ type: "sqrt", nice: true, zero: false, clamp: true }}
      theme={colorMode === "light" ? lightTheme : darkTheme}
      margin={{ left: 50, right: 0, top: 10, bottom: 40 }}
      {...props}
    >
      <Axis orientation="bottom" numTicks={5} label="time" labelOffset={10} />
      <Axis
        orientation="left"
        numTicks={props.height < 250 ? 3 : 5}
        tickFormat={yTickFormat}
        label={yAxisLabel}
        labelOffset={20}
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
