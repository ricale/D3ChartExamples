import { G, Line, Text } from 'react-native-svg';
import { LinearAxisOptions } from '../../../types';

export type StaticYTickProps = {
  x: number;
  y?: number;
  lineColor: string;
  lineWidth: number;
  labelColor: string;
  labelSize?: number;
  labelFont?: string;
  labelWeight?: LinearAxisOptions['tickLabelWeight'];
  label: string;
};
function StaticYTick({
  x,
  y,
  lineColor,
  lineWidth,
  labelColor,
  labelSize,
  labelFont,
  labelWeight,
  label,
}: StaticYTickProps) {
  return (
    <G y={y}>
      <Line x1={x} stroke={lineColor} strokeWidth={lineWidth} />
      <Text
        x={x - 2}
        fill={labelColor}
        fontSize={labelSize}
        fontFamily={labelFont}
        fontWeight={labelWeight}
        textAnchor="end"
        alignmentBaseline="middle"
      >
        {label}
      </Text>
    </G>
  );
}

export default StaticYTick;
