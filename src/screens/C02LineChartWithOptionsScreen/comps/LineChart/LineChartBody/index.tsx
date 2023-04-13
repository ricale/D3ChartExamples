import { Fragment } from 'react';

import PaneBoundary from 'utils/PaneBoundary';

import { TimeSeries, TimeAxisOptions } from '../types';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Grid from './Grid';
import Lines from './Lines';

type LineChartBodyProps = {
  series: TimeSeries[];
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  lineFunc: d3.Line<TimeSeries['data'][0]>;
  paneBoundary: PaneBoundary;

  xAxisOptions?: TimeAxisOptions;
};
function LineChartBody({
  series,
  xScale,
  yScale,
  lineFunc,
  paneBoundary,
  xAxisOptions,
}: LineChartBodyProps) {
  return (
    <Fragment>
      <XAxis scale={xScale} y={paneBoundary.y1} {...xAxisOptions} />
      <YAxis scale={yScale} x={paneBoundary.x1} y={0} />
      <Grid yScale={yScale} x1={paneBoundary.x1} x2={paneBoundary.x2} />
      <Lines series={series} lineFunc={lineFunc} />
    </Fragment>
  );
}

export default LineChartBody;
