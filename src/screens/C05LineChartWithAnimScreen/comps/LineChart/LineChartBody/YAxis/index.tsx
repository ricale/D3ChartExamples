import { useEffect } from 'react';
import { ScaleLinear } from 'd3';
import { G, Line } from 'react-native-svg';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

import { LinearAxisOptions } from '../../types';
import YTick from './YTick';
import HorizontalLine from './HorizontalLine';

const DEFAULT_TICK_LENGTH = 6;

type YAxisProps = LinearAxisOptions & {
  scale: ScaleLinear<number, number, never>;
  paneBoundary: PaneBoundary;
};
function YAxis({
  scale,
  paneBoundary,
  x = paneBoundary.x1,
  y = 0,

  enabled = true,

  lineColor = 'black',
  lineWidth = 1,

  showTicks = true,
  ticks: _ticks,
  tickLength = DEFAULT_TICK_LENGTH,
  tickWidth = 1,
  tickColor = 'black',

  tickLabelSize,
  tickLabelFont,
  tickLabelWeight,
  tickLabelColor = 'black',
  tickLabelFormatter = val => `${val}`,

  showGridLines = true,
  gridLineWidth = 1,
  gridLineColor = 'lightgray',

  animatable = true,
  animDuration = 300,
}: YAxisProps) {
  const range = scale.range();

  const [state, setState] = useImmer({
    ticks: [] as { value: number; old: boolean }[],
  });

  useEffect(() => {
    const ticks = !_ticks
      ? scale.ticks()
      : typeof _ticks === 'number'
      ? scale.ticks(_ticks)
      : typeof _ticks === 'function'
      ? _ticks(scale)
      : _ticks;

    setState(dr => {
      const oldTicks = dr.ticks
        .filter(it => !ticks.includes(it.value))
        .map(it => ({ ...it, old: true }));

      dr.ticks = [...ticks.map(value => ({ value, old: false }))];
      if (animatable) {
        dr.ticks = [...oldTicks, ...dr.ticks];
      }
    });

    if (animatable) {
      setTimeout(() => {
        setState(dr => {
          dr.ticks = dr.ticks.filter(it => !it.old);
        });
      }, animDuration);
    }
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
        {showTicks &&
          state.ticks.map(({ value, old }) => (
            <YTick
              key={`${value}`}
              x={-tickLength}
              y={scale(value)}
              lineColor={tickColor}
              lineWidth={tickWidth}
              labelColor={tickLabelColor}
              labelSize={tickLabelSize}
              labelFont={tickLabelFont}
              labelWeight={tickLabelWeight}
              label={tickLabelFormatter(value)}
              visible={!old}
              animatable={animatable}
              duration={animDuration}
            />
          ))}
      </G>
      <G>
        {showGridLines &&
          state.ticks.map(({ value, old }) => (
            <HorizontalLine
              key={`${value}`}
              x1={paneBoundary.x1}
              x2={paneBoundary.x2}
              y={scale(value)}
              lineColor={gridLineColor}
              lineWidth={gridLineWidth}
              visible={!old}
              animatable={animatable}
              duration={animDuration}
            />
          ))}
      </G>
    </>
  );
}

export default YAxis;
