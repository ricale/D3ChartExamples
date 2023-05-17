import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { ScaleTime } from 'd3';
import { G, Line } from 'react-native-svg';

import dateFormat from 'utils/dateFormat';
import PaneBoundary from 'utils/PaneBoundary';

import { TimeAxisOptions } from '../../types';
import XTick from './XTick';
import VerticalLine from './VerticalLine';

const DEFAULT_TICK_LENGTH = 6;

type XAxisProps = TimeAxisOptions & {
  scale: ScaleTime<number, number, never>;
  paneBoundary: PaneBoundary;
};
function XAxis({
  scale,
  paneBoundary,
  x = 0,
  y = paneBoundary.y1,

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
  tickLabelFormatter = dateFormat,

  showGridLines = false,
  gridLineWidth = 1,
  gridLineColor = 'lightgray',

  animatable = true,
  animDuration = 300,
}: XAxisProps) {
  const range = scale.range();

  const [state, setState] = useImmer({
    ticks: [] as { value: Date; old: boolean }[],
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
        .filter(it => !ticks.find(tick => `${tick}` === `${it.value}`))
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
          x1={range[0]}
          x2={range[1]}
          stroke={lineColor}
          strokeWidth={lineWidth}
        />
        {showTicks &&
          state.ticks.map(({ value, old }) => (
            <XTick
              key={tickLabelFormatter(value)}
              x={scale(value)}
              y={tickLength}
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
            <VerticalLine
              key={`${value}`}
              x={scale(value)}
              y1={paneBoundary.y1}
              y2={paneBoundary.y2}
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

export default XAxis;
