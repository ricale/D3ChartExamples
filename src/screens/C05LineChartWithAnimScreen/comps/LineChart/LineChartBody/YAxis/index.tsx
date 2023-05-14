import { ScaleLinear } from 'd3';
import { G, Line } from 'react-native-svg';

import PaneBoundary from 'utils/PaneBoundary';

import { LinearAxisOptions } from '../../types';
import Ticks from './Ticks';

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

  showGridLines = true,
  gridLineWidth = 1,
  gridLineColor = 'lightgray',
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
          ticks={ticks}
          enabled={showTicks}
          tickLength={tickLength}
          tickWidth={tickWidth}
          tickColor={tickColor}
          tickLabelSize={tickLabelSize}
          tickLabelFont={tickLabelFont}
          tickLabelWeight={tickLabelWeight}
          tickLabelColor={tickLabelColor}
          tickLabelFormatter={tickLabelFormatter}
        />
      </G>
      <G>
        {showGridLines &&
          ticks.map(tick => (
            <Line
              key={`${tick}`}
              x1={paneBoundary.x1}
              x2={paneBoundary.x2}
              y1={scale(tick)}
              y2={scale(tick)}
              stroke={gridLineColor}
              strokeWidth={gridLineWidth}
            />
          ))}
      </G>
    </>
  );
}

export default YAxis;
