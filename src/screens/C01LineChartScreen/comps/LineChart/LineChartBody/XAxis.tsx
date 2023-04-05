import * as d3 from 'd3';
import { G, Line, Text } from 'react-native-svg';
import dateFormat from '../../../../../utils/dateFormat';

const TICK_HEIGHT = 6;

type XAxisProps = {
  scale: d3.ScaleTime<number, number, never>;
  x?: number;
  y?: number;
  x1?: number;
  x2?: number;
};
function XAxis({ scale, x = 0, y = 0, x1, x2 }: XAxisProps) {
  const range = scale.range();
  const ticks = scale.ticks();
  return (
    <G>
      <Line
        x1={x1 ?? range[0] + x}
        x2={x2 ?? range[1] + x}
        y1={y}
        y2={y}
        stroke="black"
        strokeWidth={1}
      />
      {ticks.map(tick => (
        <Line
          key={`${tick}`}
          x1={scale(tick)}
          x2={scale(tick)}
          y1={y}
          y2={y + TICK_HEIGHT}
          stroke="black"
        />
      ))}
      {ticks.map(tick => (
        <Text
          key={`${tick}`}
          x={scale(tick)}
          y={y + TICK_HEIGHT + 2}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="hanging"
        >
          {`${dateFormat(tick)}`}
        </Text>
      ))}
    </G>
  );
}

export default XAxis;
