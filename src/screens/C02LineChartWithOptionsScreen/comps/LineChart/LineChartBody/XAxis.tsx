import * as d3 from 'd3';
import { G, Line, Text } from 'react-native-svg';

import dateFormat from 'utils/dateFormat';

import { TimeAxisOptions } from '../types';

const DEFAULT_TICK_LENGTH = 6;

type XAxisProps = TimeAxisOptions & {
  scale: d3.ScaleTime<number, number, never>;
};
function XAxis({
  scale,
  x = 0,
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
  tickLabelFormatter = dateFormat,
}: XAxisProps) {
  const range = scale.range();
  const ticks = !_ticks
    ? scale.ticks()
    : typeof _ticks === 'function'
    ? _ticks(scale)
    : _ticks;

  if (!enabled) {
    return null;
  }
  return (
    <G>
      <Line
        x1={range[0] + x}
        x2={range[1] + x}
        y1={y}
        y2={y}
        stroke={lineColor}
        strokeWidth={lineWidth}
      />

      {showTicks && (
        <>
          {ticks.map(tick => (
            <Line
              key={`${tick}`}
              x1={scale(tick)}
              x2={scale(tick)}
              y1={y}
              y2={y + tickLength}
              stroke={tickColor}
              strokeWidth={tickWidth}
            />
          ))}
          {ticks.map(tick => (
            <Text
              key={`${tick}`}
              x={scale(tick)}
              y={y + tickLength + 2}
              fill={tickLabelColor}
              fontSize={tickLabelSize}
              fontFamily={tickLabelFont}
              fontWeight={tickLabelWeight}
              textAnchor="middle"
              alignmentBaseline="hanging"
            >
              {tickLabelFormatter(tick)}
            </Text>
          ))}
        </>
      )}
    </G>
  );
}

export default XAxis;
