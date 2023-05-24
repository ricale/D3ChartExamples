import { Line } from 'react-native-svg';

export type StaticHorizontalLineProps = {
  x1: number;
  x2: number;
  y?: number;
  lineColor: string;
  lineWidth?: number;
};
function StaticHorizontalLine({
  x1,
  x2,
  y,
  lineColor,
  lineWidth,
}: StaticHorizontalLineProps) {
  return (
    <Line
      x1={x1}
      x2={x2}
      y1={y}
      y2={y}
      stroke={lineColor}
      strokeWidth={lineWidth}
    />
  );
}

export default StaticHorizontalLine;
