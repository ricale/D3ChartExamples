import { useEffect, useRef } from 'react';
import { Path, PathProps } from 'react-native-svg';
import { Animated } from 'react-native';
import { interpolatePath as d3InterpolatePath } from 'd3-interpolate-path';

const INITIAL_PATH = 'M 0 0 Z';

export type AnimatedPathProps = PathProps & {
  initialPrevD?: string;
  duration?: number;
  interpolater?: (delta: number) => string;
};
function AnimatedPath({
  d,
  duration = 300,
  initialPrevD = INITIAL_PATH,
  interpolater,
  ...props
}: AnimatedPathProps) {
  const anim = useRef(new Animated.Value(0)).current;
  const prevDRef = useRef<string>();
  const pathRef = useRef<Path>(null);

  useEffect(() => {
    const prevD = prevDRef.current ?? initialPrevD;
    prevDRef.current = d;

    if (prevD === undefined || d === undefined) {
      return;
    }

    const interpolatePath = interpolater ?? d3InterpolatePath(prevD, d);

    const listenerId = anim.addListener(({ value }) => {
      const path = interpolatePath(value);
      // NOTE: `setNativeProps` 의 인자 타입에 `d` 가 포함되어있지 않아 어쩔 수 없이 `any` 로 형변환.
      pathRef.current?.setNativeProps({ d: path } as any);
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
  }, [d]);

  return <Path ref={pathRef} d={INITIAL_PATH} {...props} />;
}

export default AnimatedPath;
