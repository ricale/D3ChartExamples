import { G, Line, Text } from 'react-native-svg';
import { LinearAxisOptions } from '../../../types';

export type StaticXTickProps = {
  x?: number;
  y: number;
  lineColor: string;
  lineWidth: number;
  labelColor: string;
  labelSize?: number;
  labelFont?: string;
  labelWeight?: LinearAxisOptions['tickLabelWeight'];
  label: string;
};
function StaticXTick({
  x,
  y,
  lineColor,
  lineWidth,
  labelColor,
  labelSize,
  labelFont,
  labelWeight,
  label,
}: StaticXTickProps) {
  return (
    <>
      <Line x={x} y2={y} stroke={lineColor} strokeWidth={lineWidth} />
      <Text
        x={x}
        y={y + 2}
        fill={labelColor}
        fontSize={labelSize}
        fontFamily={labelFont}
        fontWeight={labelWeight}
        textAnchor="middle"
        alignmentBaseline="hanging"
      >
        {label}
      </Text>
    </>
  );
}

export default StaticXTick;
