import { useRef } from 'react';
import { Path, PathProps } from 'react-native-svg';
import { interpolatePath as d3InterpolatePath } from 'd3-interpolate-path';
import useAnimWithDelta from '../useAnimWithDelta';

export type AnimatedPathProps = PathProps & {
  duration?: number;
  interpolater?: (prev: string, current: string) => (delta: number) => string;
  visible?: boolean;
};
function AnimatedPath({
  d,
  duration = 300,
  interpolater = d3InterpolatePath,
  visible,
  ...props
}: AnimatedPathProps) {
  const pathRef = useRef<Path>(null);

  useAnimWithDelta(
    d,
    (prev, current, delta) => {
      const interpolate = interpolater(prev, current);
      pathRef.current?.setNativeProps({ d: interpolate(delta) } as any);
    },
    { initialValue: d }
  );

  useAnimWithDelta(
    visible,
    (_, current, delta) => {
      const pathLength = pathRef.current?.getTotalLength() ?? 1;
      pathRef.current?.setNativeProps({
        strokeDasharray: [pathLength, pathLength],
        strokeDashoffset: pathLength * (current ? 1 - delta : -delta),
        opacity: Math.min((current ? delta : 1 - delta) * 5, 1),
      } as any);
    },
    {
      duration: duration * 1.5,
      initialValue: false,
      onFirst: () => {
        pathRef.current?.setNativeProps({
          opacity: 0,
        } as any);
      },
    }
  );

  return <Path ref={pathRef} {...props} />;
}

export default AnimatedPath;
