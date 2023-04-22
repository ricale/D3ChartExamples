import * as d3 from 'd3';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Svg, SvgProps } from 'react-native-svg';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

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
import { DEFAULT_X_AXIS_HEIGHT, DEFAULT_Y_AXIS_WIDTH } from './constants';
import Legend from './Legend';

const DEFAULT_MARGIN = 4;

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
    width: 0,
    height: 0,
    paneBoundary: new PaneBoundary({ x1: 0, x2: 0, y1: 0, y2: 0 }),
    series: [] as TimeSeries[],
  });

  const { margin, marginTop, marginLeft, marginRight, marginBottom } =
    paneOptions || {};

  const updatePaneBoundary = (width?: number, height?: number) => {
    setState(dr => {
      if (width !== undefined) {
        dr.width = Math.round(width);
      }
      if (height !== undefined) {
        dr.height = Math.round(height);
      }

      dr.paneBoundary = new PaneBoundary({
        x1: marginLeft ?? margin ?? DEFAULT_Y_AXIS_WIDTH,
        x2: dr.width - (marginRight ?? margin ?? DEFAULT_MARGIN),
        y1: dr.height - (marginBottom ?? margin ?? DEFAULT_X_AXIS_HEIGHT),
        y2: marginTop ?? margin ?? DEFAULT_MARGIN,
      });
    });
  };

  useEffect(() => {
    if (!state.width || !state.height) {
      return;
    }
    updatePaneBoundary();
  }, [margin, marginTop, marginLeft, marginRight, marginBottom]);

  const onLayout: SvgProps['onLayout'] = evt => {
    const { layout } = evt.nativeEvent;
    updatePaneBoundary(layout.width, layout.height);
  };

  useEffect(() => {
    setState(dr => {
      dr.series = series.map(sr => ({
        ...sr,
        visible: sr.visible ?? true,
      }));
    });
  }, [series]);

  const xScale = getTimeScale(state.series, state.paneBoundary.xs);
  const yScale = getLinearScale(state.series, state.paneBoundary.ys);
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
          legendOptions?.position === 'top' ? 'column-reverse' : 'column',
      }}
    >
      <Svg width={width} height={height} onLayout={onLayout}>
        {loaded && (
          <LineChartBody
            series={state.series}
            xScale={xScale}
            yScale={yScale}
            lineFunc={lineFunc}
            paneBoundary={state.paneBoundary}
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
        {...legendOptions}
      />
    </View>
  );
}

export default LineChart;
