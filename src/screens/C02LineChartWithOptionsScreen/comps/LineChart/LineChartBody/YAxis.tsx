import { G, Line, Text } from 'react-native-svg';
import { LinearAxisOptions } from '../types';

const DEFAULT_TICK_LENGTH = 6;

type YAxisProps = LinearAxisOptions & {
  scale: d3.ScaleLinear<number, number, never>;
};
function YAxis({
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
  tickLabelFormatter = val => `${val}`,
}: YAxisProps) {
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
        x1={x}
        x2={x}
        y1={range[0] + y}
        y2={range[1] + y}
        stroke={lineColor}
        strokeWidth={lineWidth}
      />
      {showTicks && (
        <>
          {ticks.map(tick => (
            <Line
              key={`${tick}`}
              x1={x - tickLength}
              x2={x}
              y1={scale(tick)}
              y2={scale(tick)}
              stroke={tickColor}
              strokeWidth={tickWidth}
            />
          ))}
          {ticks.map(tick => (
            <Text
              key={`${tick}`}
              x={x - tickLength - 2}
              y={scale(tick)}
              fill={tickLabelColor}
              fontSize={tickLabelSize}
              fontFamily={tickLabelFont}
              fontWeight={tickLabelWeight}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {tickLabelFormatter(tick)}
            </Text>
          ))}
        </>
      )}
    </G>
  );
}

export default YAxis;
