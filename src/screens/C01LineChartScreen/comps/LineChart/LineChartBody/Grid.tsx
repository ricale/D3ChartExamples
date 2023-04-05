import { G, Line } from 'react-native-svg';

type GridProps = {
  yScale: d3.ScaleLinear<number, number, never>;
  x1: number;
  x2: number;
};
function Grid({ yScale, x1, x2 }: GridProps) {
  const ticks = yScale.ticks();
  return (
    <G>
      {ticks.map(tick => (
        <Line
          key={`${tick}`}
          x1={x1}
          x2={x2}
          y1={yScale(tick)}
          y2={yScale(tick)}
          stroke="lightgray"
          strokeWidth={1}
        />
      ))}
    </G>
  );
}

export default Grid;
