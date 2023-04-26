import { Fragment } from 'react';
import { ScaleLinear, ScaleTime, Line as D3Line } from 'd3';

import PaneBoundary from 'utils/PaneBoundary';

import {
  TimeSeries,
  TimeAxisOptions,
  LinearAxisOptions,
  LinesOptions,
  SelectedItem,
} from '../types';
import { DEFAULT_COLORS } from '../constants';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Lines from './Lines';
import SelectedItems from './SelectedItems';

type LineChartBodyProps = {
  series: TimeSeries[];
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  lineFunc: D3Line<TimeSeries['data'][0]>;
  paneBoundary: PaneBoundary;
  selected: null | (SelectedItem | null)[];

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
  selected,
  xAxisOptions,
  yAxisOptions,
  linesOptions,
}: LineChartBodyProps) {
  return (
    <Fragment>
      <XAxis scale={xScale} paneBoundary={paneBoundary} {...xAxisOptions} />
      <YAxis scale={yScale} paneBoundary={paneBoundary} {...yAxisOptions} />
      <Lines series={series} lineFunc={lineFunc} {...linesOptions} />
      <SelectedItems
        xScale={xScale}
        yScale={yScale}
        paneBoundary={paneBoundary}
        selected={selected}
        colors={linesOptions?.colors ?? DEFAULT_COLORS}
      />
    </Fragment>
  );
}

export default LineChartBody;
