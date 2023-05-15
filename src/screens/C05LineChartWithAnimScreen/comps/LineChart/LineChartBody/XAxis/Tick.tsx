import { G, Line, Text } from 'react-native-svg';

import { LinearAxisOptions } from '../../types';
import { useRef } from 'react';
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
  duration: number;
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
  duration,
}: TickProps) {
  const containerRef = useRef<G<any>>(null);

  useAnimWithDelta(
    x,
    (prev, current, delta) => {
      containerRef.current?.setNativeProps({
        x: (current - prev) * delta + prev,
      });
    },
    {
      duration,
      onFirst: () => {
        containerRef.current?.setNativeProps({ x });
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
      <Line y2={y} stroke={lineColor} strokeWidth={lineWidth} />
      <Text
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
    </G>
  );
}

export default Tick;
