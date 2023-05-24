import { Line } from 'react-native-svg';

export type StaticVerticalLineProps = {
  x?: number;
  y1: number;
  y2: number;
  lineColor: string;
  lineWidth?: number;
};
function StaticVerticalLine({
  x,
  y1,
  y2,
  lineColor,
  lineWidth,
}: StaticVerticalLineProps) {
  return (
    <Line
      x1={x}
      x2={x}
      y1={y1}
      y2={y2}
      stroke={lineColor}
      strokeWidth={lineWidth}
    />
  );
}

export default StaticVerticalLine;
