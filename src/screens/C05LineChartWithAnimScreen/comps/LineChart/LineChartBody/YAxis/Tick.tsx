import { useRef } from 'react';
import { G, Line, Text } from 'react-native-svg';

import { LinearAxisOptions } from '../../types';
import useAnimWithDelta from '../../useAnimWithDelta';

type TickProps = {
  x: number;
  y: number;
  lineColor: string;
  lineWidth: number;
  labelColor: string;
  labelSize?: number;
  labelFont?: string;
  labelWeight?: LinearAxisOptions['tickLabelWeight'];
  label: string;
  visible: boolean;
  duration?: number;
};
function Tick({
  x,
  y,
  lineColor,
  lineWidth,
  labelColor,
  labelSize,
  labelFont,
  labelWeight,
  label,
  visible,
  duration = 300,
}: TickProps) {
  const containerRef = useRef<G<any>>(null);

  useAnimWithDelta(
    y,
    (prev, current, delta) => {
      containerRef.current?.setNativeProps({
        y: (current - prev) * delta + prev,
      });
    },
    {
      duration,
      onFirst: () => {
        containerRef.current?.setNativeProps({ y });
      },
    }
  );

  useAnimWithDelta(
    visible,
    (_, current, delta) => {
      containerRef.current?.setNativeProps({
        opacity: current ? delta : 1 - delta,
      } as any);
    },
    {
      duration,
      initialValue: false,
      onFirst: () => {
        containerRef.current?.setNativeProps({ opacity: 0 } as any);
      },
    }
  );

  return (
    <G ref={containerRef}>
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

export default Tick;
