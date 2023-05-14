import { ScaleLinear } from 'd3';
import { G } from 'react-native-svg';
import { LinearAxisOptions } from '../../types';
import GridLine from './GridLine';

type GridLinesProps = Pick<
  LinearAxisOptions,
  'gridLineColor' | 'gridLineWidth'
> & {
  scale: ScaleLinear<number, number, never>;
  ticks: { value: number; old: boolean }[];
  x1: number;
  x2: number;
  enabled?: LinearAxisOptions['showGridLines'];
  duration?: number;
};
function GridLines({
  scale,
  ticks,
  x1,
  x2,
  enabled = true,
  gridLineColor = 'lightgray',
  gridLineWidth = 1,
  duration,
}: GridLinesProps) {
  if (!enabled) {
    return null;
  }
  return (
    <G>
      {ticks.map(({ value, old }) => (
        <GridLine
          key={`${value}`}
          x1={x1}
          x2={x2}
          y={scale(value)}
          lineColor={gridLineColor}
          lineWidth={gridLineWidth}
          visible={!old}
          duration={duration}
        />
      ))}
    </G>
  );
}

export default GridLines;
