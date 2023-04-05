import { G, Line, Text } from 'react-native-svg';

const TICK_WIDTH = 6;

type YAxisProps = {
  scale: d3.ScaleLinear<number, number, never>;
  x: number;
  y: number;
};
function YAxis({ scale, x, y }: YAxisProps) {
  const range = scale.range();
  const ticks = scale.ticks();

  return (
    <G>
      <Line
        x1={x}
        x2={x}
        y1={range[0] + y}
        y2={range[1] + y}
        stroke="black"
        strokeWidth={1}
      />
      {ticks.map(tick => (
        <Line
          key={`${tick}`}
          x1={x - TICK_WIDTH}
          x2={x}
          y1={scale(tick)}
          y2={scale(tick)}
          stroke="black"
          strokeWidth={1}
        />
      ))}
      {ticks.map(tick => (
        <Text
          key={`${tick}`}
          x={x - TICK_WIDTH - 2}
          y={scale(tick)}
          fill="black"
          textAnchor="end"
          alignmentBaseline="middle"
        >
          {`${tick}`}
        </Text>
      ))}
    </G>
  );
}

export default YAxis;
