import * as d3 from 'd3';
import { Svg, SvgProps } from 'react-native-svg';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

import { TimeSeries, TimeAxisOptions, LinearAxisOptions } from './types';
import getTimeScale from './getTimeScale';
import getLinearScale from './getLinearScale';
import LineChartBody from './LineChartBody';
import { DEFAULT_X_AXIS_HEIGHT, DEFAULT_Y_AXIS_WIDTH } from './constants';

type LineChartProps = {
  series: TimeSeries[];
  width?: string | number;
  height?: string | number;
  xAxis?: TimeAxisOptions;
  yAxis?: LinearAxisOptions;
};
function LineChart({
  series,
  width = '100%',
  height = 200,
  xAxis: xAxisOptions,
  yAxis: yAxisOptions,
}: LineChartProps) {
  const [state, setState] = useImmer({
    width: 0,
    height: 0,
    paneBoundary: new PaneBoundary({ x1: 0, x2: 0, y1: 0, y2: 0 }),
  });

  const onLayout: SvgProps['onLayout'] = evt => {
    const { layout } = evt.nativeEvent;
    setState(dr => {
      dr.width = Math.round(layout.width);
      dr.height = Math.round(layout.height);

      const marginTop = 10;
      const marginLeft = DEFAULT_Y_AXIS_WIDTH;
      const marginRight = 10;
      const marginBottom = DEFAULT_X_AXIS_HEIGHT;

      dr.paneBoundary = new PaneBoundary({
        x1: marginLeft,
        x2: dr.width - marginRight,
        y1: dr.height - marginBottom,
        y2: marginTop,
      });
    });
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
        />
      )}
    </Svg>
  );
}

export default LineChart;
