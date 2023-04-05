import { Fragment } from 'react';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Grid from './Grid';
import { TimeSeries, TimeSeriesDatum } from '../types';
import Lines from './Lines';
import PaneBoundary from '../../../../../utils/PaneBoundary';

type LineChartBodyProps = {
  series: TimeSeries[];
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  lineFunc: d3.Line<TimeSeriesDatum>;
  paneBoundary: PaneBoundary;
};
function LineChartBody({
  series,
  xScale,
  yScale,
  lineFunc,
  paneBoundary,
}: LineChartBodyProps) {
  return (
    <Fragment>
      <XAxis
        scale={xScale}
        y={paneBoundary.y1}
        x1={paneBoundary.x1}
        x2={paneBoundary.x2}
      />
      <YAxis scale={yScale} x={paneBoundary.x1} y={0} />
      <Grid yScale={yScale} x1={paneBoundary.x1} x2={paneBoundary.x2} />
      <Lines series={series} lineFunc={lineFunc} />
    </Fragment>
  );
}

export default LineChartBody;
