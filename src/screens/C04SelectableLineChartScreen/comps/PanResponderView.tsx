import { useMemo, useRef } from 'react';
import { NativeTouchEvent, PanResponder, View, ViewProps } from 'react-native';

export type PanResponderViewOnTouchStart = (
  touches: NativeTouchEvent[]
) => void;
export type PanResponderViewOnTouchEnd = () => void;
export type PanResponderViewProps = Omit<
  ViewProps,
  'onTouchStart' | 'onTouchEnd'
> & {
  onTouchStart?: PanResponderViewOnTouchStart;
  onTouchEnd?: PanResponderViewOnTouchEnd;
};
function PanResponderView({
  onTouchStart,
  onTouchEnd,
  ...props
}: PanResponderViewProps) {
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (evt, _gestureState) => {
          const { touches } = evt.nativeEvent;
          onTouchStart?.(touches);
        },
        onPanResponderMove: (evt, _gestureState) => {
          const { touches } = evt.nativeEvent;
          onTouchStart?.(touches);
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_evt, _gestureState) => {
          onTouchEnd?.();
        },
        onPanResponderTerminate: () => {},
        onShouldBlockNativeResponder: () => true,
      }),
    [onTouchStart, onTouchEnd]
  );

  return <View {...props} {...panResponder.panHandlers} />;
}

export default PanResponderView;
