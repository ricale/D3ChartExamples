import { useEffect } from 'react';
import { ScaleLinear } from 'd3';
import { G, Line } from 'react-native-svg';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

import { LinearAxisOptions } from '../../types';
import Ticks from './Ticks';
import GridLines from './GridLines';

type YAxisProps = LinearAxisOptions & {
  scale: ScaleLinear<number, number, never>;
  paneBoundary: PaneBoundary;
  duration?: number;
};
function YAxis({
  scale,
  paneBoundary,
  x = paneBoundary.x1,
  y = 0,

  enabled = true,

  lineColor = 'black',
  lineWidth = 1,

  showTicks,
  ticks: _ticks,
  tickLength,
  tickWidth,
  tickColor,

  tickLabelSize,
  tickLabelFont,
  tickLabelWeight,
  tickLabelColor,
  tickLabelFormatter,

  showGridLines,
  gridLineWidth,
  gridLineColor,

  duration = 300,
}: YAxisProps) {
  const range = scale.range();

  const [state, setState] = useImmer({
    ticks: [] as { value: number; old: boolean }[],
  });

  useEffect(() => {
    const ticks = !_ticks
      ? scale.ticks()
      : typeof _ticks === 'function'
      ? _ticks(scale)
      : _ticks;

    setState(dr => {
      dr.ticks = [
        ...dr.ticks
          .filter(it => !ticks.includes(it.value))
          .map(it => ({ ...it, old: true })),
        ...ticks.map(value => ({ value, old: false })),
      ];
    });
    setTimeout(() => {
      setState(dr => {
        dr.ticks = dr.ticks.filter(it => !it.old);
      });
    }, duration);
  }, [_ticks, scale]);

  if (!enabled) {
    return null;
  }
  return (
    <>
      <G x={x} y={y}>
        <Line
          y1={range[0]}
          y2={range[1]}
          stroke={lineColor}
          strokeWidth={lineWidth}
        />
        <Ticks
          scale={scale}
          ticks={state.ticks}
          enabled={showTicks}
          tickLength={tickLength}
          tickWidth={tickWidth}
          tickColor={tickColor}
          tickLabelSize={tickLabelSize}
          tickLabelFont={tickLabelFont}
          tickLabelWeight={tickLabelWeight}
          tickLabelColor={tickLabelColor}
          tickLabelFormatter={tickLabelFormatter}
          duration={duration}
        />
      </G>
      <G>
        <GridLines
          scale={scale}
          ticks={state.ticks}
          x1={paneBoundary.x1}
          x2={paneBoundary.x2}
          enabled={showGridLines}
          gridLineColor={gridLineColor}
          gridLineWidth={gridLineWidth}
          duration={duration}
        />
      </G>
    </>
  );
}

export default YAxis;
