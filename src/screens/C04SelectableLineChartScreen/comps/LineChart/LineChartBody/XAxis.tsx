import { ScaleTime } from 'd3';
import { G, Line, Text } from 'react-native-svg';

import dateFormat from 'utils/dateFormat';
import PaneBoundary from 'utils/PaneBoundary';

import { TimeAxisOptions } from '../types';

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
    <>
      <G x={x} y={y}>
        <Line
          x1={range[0]}
          x2={range[1]}
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
                y2={tickLength}
                stroke={tickColor}
                strokeWidth={tickWidth}
              />
            ))}
            {ticks.map(tick => (
              <Text
                key={`${tick}`}
                x={scale(tick)}
                y={tickLength + 2}
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
      <G>
        {showGridLines &&
          ticks.map(tick => (
            <Line
              key={`${tick}`}
              x1={scale(tick)}
              x2={scale(tick)}
              y1={paneBoundary.y1}
              y2={paneBoundary.y2}
              stroke={gridLineColor}
              strokeWidth={gridLineWidth}
            />
          ))}
      </G>
    </>
  );
}

export default XAxis;
