import { ReactNode, useRef } from 'react';
import { G } from 'react-native-svg';
import useAnimWithDelta from './useAnimWithDelta';

type OnAnimListener<T> = (prev: T, current: T, delta: number) => number;
type TransitionXProps = {
  x: number;
  y?: number;
  visible?: boolean;
  duration?: number;
  onAnimX: OnAnimListener<number>;
  onAnimVisible: OnAnimListener<boolean>;
  children: ReactNode;
};
function TransitionX({
  x,
  y,
  visible = true,
  onAnimX,
  onAnimVisible,
  duration = 300,
  children,
}: TransitionXProps) {
  const gRef = useRef<G<any>>(null);

  useAnimWithDelta(
    x,
    (prev, current, delta) => {
      gRef.current?.setNativeProps({ x: onAnimX(prev, current, delta) });
    },
    {
      duration,
      onFirst: () => {
        gRef.current?.setNativeProps({ x });
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
    <G ref={gRef} y={y}>
      {children}
    </G>
  );
}

export default TransitionX;
