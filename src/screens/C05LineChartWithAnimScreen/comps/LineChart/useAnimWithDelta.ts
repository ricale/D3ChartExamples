import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type UseSvgCompAnimOptions<T> = {
  initialValue?: T;
  onFirst?: (value: T) => void;
  duration?: number;
};
type DeltaListener<T> = (
  prev: NonNullable<T>,
  current: NonNullable<T>,
  delta: number
) => void;

function useAnimWithDelta<T>(
  value: T,
  onChangeDelta: DeltaListener<T>,
  options: UseSvgCompAnimOptions<T> = {}
) {
  const firstRef = useRef(true);
  const prevValueRef = useRef<T | undefined>(options.initialValue);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const prevValue = prevValueRef.current;
    prevValueRef.current = value;

    if (firstRef.current) {
      firstRef.current = false;
      options.onFirst?.(value);
    }

    if (
      prevValue === undefined ||
      prevValue === null ||
      value === undefined ||
      value === null
    ) {
      return;
    }

    const listener = (delta: number) => onChangeDelta(prevValue, value, delta);

    const listenerId = anim.addListener(({ value: delta }) => {
      listener(delta);
    });

    const animated = Animated.timing(anim, {
      toValue: 1,
      duration: options.duration ?? 300,
      useNativeDriver: true,
    });

    animated.start(() => {
      anim.removeListener(listenerId);
      anim.setValue(0);
    });

    return () => animated.stop();
  }, [value]);
}

export default useAnimWithDelta;
