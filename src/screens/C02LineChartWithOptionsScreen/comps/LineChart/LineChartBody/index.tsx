import { Fragment } from 'react';

import PaneBoundary from 'utils/PaneBoundary';

import {
  TimeSeries,
  TimeAxisOptions,
  LinearAxisOptions,
  LinesOptions,
} from '../types';
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
  linesOptions?: LinesOptions;
};
function LineChartBody({
  series,
  xScale,
  yScale,
  lineFunc,
  paneBoundary,
  xAxisOptions,
  yAxisOptions,
  linesOptions,
}: LineChartBodyProps) {
  return (
    <Fragment>
      <XAxis scale={xScale} paneBoundary={paneBoundary} {...xAxisOptions} />
      <YAxis scale={yScale} paneBoundary={paneBoundary} {...yAxisOptions} />
      <Lines series={series} lineFunc={lineFunc} {...linesOptions} />
    </Fragment>
  );
}

export default LineChartBody;
