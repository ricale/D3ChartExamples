import { useRef } from 'react';
import { Line } from 'react-native-svg';
import useAnimWithDelta from '../../useAnimWithDelta';

type GridLineProps = {
  x1: number;
  x2: number;
  y: number;
  lineColor: string;
  lineWidth?: number;
  visible: boolean;
  duration?: number;
};
function GridLine({
  x1,
  x2,
  y,
  lineColor,
  lineWidth,
  duration,
  visible,
}: GridLineProps) {
  const lineRef = useRef<Line>(null);

  useAnimWithDelta(
    y,
    (prev, current, delta) => {
      const calculated = (current - prev) * delta + prev;
      lineRef.current?.setNativeProps({
        y1: calculated,
        y2: calculated,
      } as any);
    },
    {
      duration,
      onFirst: () => {
        lineRef.current?.setNativeProps({ y1: y, y2: y } as any);
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
      x1={x1}
      x2={x2}
      // y1={y}
      // y2={y}
      stroke={lineColor}
      strokeWidth={lineWidth}
    />
  );
}

export default GridLine;
