import { ReactNode, useRef } from 'react';
import { G } from 'react-native-svg';
import useAnimWithDelta from './useAnimWithDelta';

type OnAnimListener<T> = (prev: T, current: T, delta: number) => number;
type TransitionYProps = {
  x?: number;
  y: number;
  visible?: boolean;
  duration?: number;
  onAnimY: OnAnimListener<number>;
  onAnimVisible: OnAnimListener<boolean>;
  children: ReactNode;
};
function TransitionY({
  x,
  y,
  visible = true,
  onAnimY,
  onAnimVisible,
  duration = 300,
  children,
}: TransitionYProps) {
  const gRef = useRef<G<any>>(null);

  useAnimWithDelta(
    y,
    (prev, current, delta) => {
      gRef.current?.setNativeProps({ y: onAnimY(prev, current, delta) });
    },
    {
      duration,
      onFirst: () => {
        gRef.current?.setNativeProps({ y });
      },
    }
  );

  useAnimWithDelta(
    visible,
    (prev, current, delta) => {
      gRef.current?.setNativeProps({
        opacity: onAnimVisible(prev, current, delta),
      } as any);
    },
    {
      duration,
      initialValue: false,
      onFirst: () => {
        gRef.current?.setNativeProps({ opacity: 0 } as any);
      },
    }
  );

  return (
    <G ref={gRef} x={x}>
      {children}
    </G>
  );
}

export default TransitionY;
