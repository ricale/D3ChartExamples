import * as d3 from 'd3';
import { useEffect } from 'react';
import { Svg, SvgProps } from 'react-native-svg';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

import {
  TimeSeries,
  TimeAxisOptions,
  LinearAxisOptions,
  LinesOptions,
  PaneOptions,
} from './types';
import getTimeScale from './getTimeScale';
import getLinearScale from './getLinearScale';
import LineChartBody from './LineChartBody';
import { DEFAULT_X_AXIS_HEIGHT, DEFAULT_Y_AXIS_WIDTH } from './constants';

type LineChartProps = {
  series: TimeSeries[];
  width?: string | number;
  height?: string | number;
  xAxisOptions?: TimeAxisOptions;
  yAxisOptions?: LinearAxisOptions;
  linesOptions?: LinesOptions;
  paneOptions?: PaneOptions;
};
function LineChart({
  series,
  width = '100%',
  height = 200,
  xAxisOptions,
  yAxisOptions,
  linesOptions,
  paneOptions = {},
}: LineChartProps) {
  const [state, setState] = useImmer({
    width: 0,
    height: 0,
    paneBoundary: new PaneBoundary({ x1: 0, x2: 0, y1: 0, y2: 0 }),
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
        x2: dr.width - (marginRight ?? margin ?? 10),
        y1: dr.height - (marginBottom ?? margin ?? DEFAULT_X_AXIS_HEIGHT),
        y2: marginTop ?? margin ?? 10,
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

  const xScale = getTimeScale(series, state.paneBoundary.xs);
  const yScale = getLinearScale(series, state.paneBoundary.ys);
  const lineFunc =
    !xScale || !yScale
      ? null
      : d3
          .line<TimeSeries['data'][0]>()
          .defined(dt => !isNaN(dt.value))
          .x(dt => xScale(dt.date))
          .y(dt => yScale(dt.value));

  const loaded = xScale !== null && yScale !== null && lineFunc !== null;

  return (
    <Svg width={width} height={height} onLayout={onLayout}>
      {loaded && (
        <LineChartBody
          series={series}
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
  );
}

export default LineChart;
