import * as d3 from 'd3';
import { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import { Svg, SvgProps } from 'react-native-svg';
import { useImmer } from 'use-immer';

import {
  TimeSeries,
  TimeAxisOptions,
  LinearAxisOptions,
  LinesOptions,
  PaneOptions,
  LegendOptions,
} from './types';
import getTimeScale from './getTimeScale';
import getLinearScale from './getLinearScale';
import LineChartBody from './LineChartBody';
import Legend, { LegendProps } from './Legend';
import useChartSize from './useChartSize';

type LineChartProps = {
  series: TimeSeries[];
  width?: string | number;
  height?: string | number;
  xAxisOptions?: TimeAxisOptions;
  yAxisOptions?: LinearAxisOptions;
  linesOptions?: LinesOptions;
  paneOptions?: PaneOptions;
  legendOptions?: LegendOptions;
};
function LineChart({
  series,
  width = '100%',
  height = 200,
  xAxisOptions,
  yAxisOptions,
  linesOptions,
  paneOptions = {},
  legendOptions,
}: LineChartProps) {
  const [state, setState] = useImmer({
    series: [] as TimeSeries[],
  });

  const [{ svgWidth, paneBoundary }, updateSize] = useChartSize(
    paneOptions,
    legendOptions
  );

  const onContainerLayout: ViewProps['onLayout'] = evt => {
    updateSize({ containerWidth: evt.nativeEvent.layout.width });
  };

  const onLayout: SvgProps['onLayout'] = evt => {
    updateSize({ svgHeight: evt.nativeEvent.layout.height });
  };

  const onLayoutLegend: LegendProps['onLayout'] = evt => {
    updateSize({ legendWidth: evt.nativeEvent.layout.width });
  };

  useEffect(() => {
    setState(dr => {
      dr.series = series.map(sr => ({
        ...sr,
        visible: sr.visible ?? true,
      }));
    });
  }, [series]);

  const xScale = getTimeScale(state.series, paneBoundary.xs);
  const yScale = getLinearScale(state.series, paneBoundary.ys);
  const lineFunc =
    !xScale || !yScale
      ? null
      : d3
          .line<TimeSeries['data'][0]>()
          .defined(dt => !isNaN(dt.value))
          .x(dt => xScale(dt.date))
          .y(dt => yScale(dt.value));

  const loaded = xScale !== null && yScale !== null && lineFunc !== null;

  const onClickLegendItem = (sr: TimeSeries, idx: number) => {
    setState(dr => {
      dr.series = dr.series.map((sr, i) =>
        i !== idx ? sr : { ...sr, visible: !sr.visible }
      );
    });
  };

  return (
    <View
      style={{
        flexDirection:
          legendOptions?.position === 'top'
            ? 'column-reverse'
            : legendOptions?.position === 'right'
            ? 'row'
            : legendOptions?.position === 'left'
            ? 'row-reverse'
            : 'column',
        width: width,
      }}
      onLayout={onContainerLayout}
    >
      <Svg width={svgWidth} height={height} onLayout={onLayout}>
        {loaded && (
          <LineChartBody
            series={state.series}
            xScale={xScale}
            yScale={yScale}
            lineFunc={lineFunc}
            paneBoundary={paneBoundary}
            xAxisOptions={xAxisOptions}
            yAxisOptions={yAxisOptions}
            linesOptions={linesOptions}
          />
        )}
      </Svg>
      <Legend
        series={state.series}
        linesOptions={linesOptions}
        onClickItem={onClickLegendItem}
        onLayout={onLayoutLegend}
        {...legendOptions}
      />
    </View>
  );
}

export default LineChart;
