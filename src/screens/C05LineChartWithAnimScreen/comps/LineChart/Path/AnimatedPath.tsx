import { useRef } from 'react';
import { Path, PathProps } from 'react-native-svg';
import { interpolatePath as d3InterpolatePath } from 'd3-interpolate-path';
import useAnimWithDelta from '../useAnimWithDelta';

const INITIAL_PATH = 'M 0 0 Z';

export type AnimatedPathProps = PathProps & {
  initialPrevD?: string;
  duration?: number;
  interpolater?: (delta: number) => string;
  visible?: boolean;
};
function AnimatedPath({
  d,
  duration = 300,
  initialPrevD = INITIAL_PATH,
  interpolater,
  visible,
  ...props
}: AnimatedPathProps) {
  const pathRef = useRef<Path>(null);

  useAnimWithDelta(
    d,
    (prev, current, delta) => {
      const interpolate = interpolater ?? d3InterpolatePath(prev, current);
      pathRef.current?.setNativeProps({ d: interpolate(delta) } as any);
    },
    { initialValue: initialPrevD }
  );

  useAnimWithDelta(
    visible,
    (_, current, delta) => {
      pathRef.current?.setNativeProps({
        opacity: current ? delta : 1 - delta,
      } as any);
    },
    {
      duration,
      initialValue: false,
      onFirst: () => {
        pathRef.current?.setNativeProps({ opacity: 0 } as any);
      },
    }
  );

  return <Path ref={pathRef} d={INITIAL_PATH} {...props} />;
}

export default AnimatedPath;
