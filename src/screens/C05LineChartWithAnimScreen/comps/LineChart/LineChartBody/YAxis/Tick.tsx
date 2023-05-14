import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { G, Line, Text } from 'react-native-svg';
import { LinearAxisOptions } from '../../types';

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
  const prevYRef = useRef<number>();
  const lineRef = useRef<Line>(null);
  const textGroupRef = useRef<G<any>>(null);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const prevY = prevYRef.current;
    prevYRef.current = y;

    if (prevY === undefined) {
      lineRef.current?.setNativeProps({ y1: y, y2: y } as any);
      textGroupRef.current?.setNativeProps({ x: x - 2, y: y });
      return;
    }

    const getValue = (delta: number) => (y - prevY) * delta + prevY;

    const listenerId = anim.addListener(({ value }) => {
      const calculated = getValue(value);
      lineRef.current?.setNativeProps({
        y1: calculated,
        y2: calculated,
      } as any);
      // textRef.current?.setNativeProps({
      //   y: calculated,
      // });
      textGroupRef.current?.setNativeProps({ x: x - 2, y: calculated });
    });

    const animated = Animated.timing(anim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });

    animated.start(() => {
      anim.removeListener(listenerId);
      anim.setValue(0);
    });

    return () => animated.stop();
  }, [y]);

  const firstRef = useRef(true);
  const visibleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      lineRef.current?.setNativeProps({ opacity: 0 } as any);
      textGroupRef.current?.setNativeProps({ opacity: 0 } as any);
      // return;
    }

    const listenerId = visibleAnim.addListener(({ value }) => {
      lineRef.current?.setNativeProps({ opacity: value } as any);
      textGroupRef.current?.setNativeProps({ opacity: value } as any);
    });

    const animated = Animated.timing(visibleAnim, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: true,
    });

    animated.start(() => {
      visibleAnim.removeListener(listenerId);
    });

    return () => animated.stop();
  }, [visible]);

  return (
    <>
      <Line
        ref={lineRef}
        x1={x}
        // y1={y}
        // y2={y}
        stroke={lineColor}
        strokeWidth={lineWidth}
      />
      <G
        ref={textGroupRef}
        // y={y}
        x={x - 2}
      >
        <Text
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
    </>
  );
}

export default Tick;
