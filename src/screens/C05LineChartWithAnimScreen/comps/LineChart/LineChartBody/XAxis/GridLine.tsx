import { useRef } from 'react';
import { Line } from 'react-native-svg';
import useAnimWithDelta from '../../useAnimWithDelta';

type GridLineProps = {
  x: number;
  y1: number;
  y2: number;
  lineColor: string;
  lineWidth?: number;
  visible: boolean;
  duration: number;
};
function GridLine({
  x,
  y1,
  y2,
  lineColor,
  lineWidth,
  duration,
  visible,
}: GridLineProps) {
  const lineRef = useRef<Line>(null);

  useAnimWithDelta(
    x,
    (prev, current, delta) => {
      const calculated = (current - prev) * delta + prev;
      lineRef.current?.setNativeProps({
        x1: calculated,
        x2: calculated,
      } as any);
    },
    {
      duration,
      onFirst: () => {
        lineRef.current?.setNativeProps({ x1: x, x2: x } as any);
      },
    }
  );

  useAnimWithDelta(
    visible,
    (_, current, delta) => {
      lineRef.current?.setNativeProps({
        opacity: current ? delta : 1 - delta,
      } as any);
    },
    {
      duration,
      initialValue: false,
      onFirst: () => {
        lineRef.current?.setNativeProps({ opacity: 0 } as any);
      },
    }
  );

  return (
    <Line
      ref={lineRef}
      y1={y1}
      y2={y2}
      stroke={lineColor}
      strokeWidth={lineWidth}
    />
  );
}

export default GridLine;
