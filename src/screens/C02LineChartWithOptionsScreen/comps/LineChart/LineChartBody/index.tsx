import { Fragment } from 'react';

import PaneBoundary from 'utils/PaneBoundary';

import { TimeSeries, TimeAxisOptions, LinearAxisOptions } from '../types';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Lines from './Lines';

type LineChartBodyProps = {
  series: TimeSeries[];
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  lineFunc: d3.Line<TimeSeries['data'][0]>;
  paneBoundary: PaneBoundary;

  xAxisOptions?: TimeAxisOptions;
  yAxisOptions?: LinearAxisOptions;
};
function LineChartBody({
  series,
  xScale,
  yScale,
  lineFunc,
  paneBoundary,
  xAxisOptions,
  yAxisOptions,
}: LineChartBodyProps) {
  return (
    <Fragment>
      <XAxis
        scale={xScale}
        y={paneBoundary.y1}
        {...xAxisOptions}
        paneBoundary={paneBoundary}
      />
      <YAxis
        scale={yScale}
        x={paneBoundary.x1}
        {...yAxisOptions}
        paneBoundary={paneBoundary}
      />
      <Lines series={series} lineFunc={lineFunc} />
    </Fragment>
  );
}

export default LineChartBody;
