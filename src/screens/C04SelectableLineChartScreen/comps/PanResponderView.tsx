import { useMemo, useRef } from 'react';
import { NativeTouchEvent, PanResponder, View, ViewProps } from 'react-native';

export type PanResponderViewProps = ViewProps;
export type PanResponderViewOnTouchStart = NonNullable<
  PanResponderViewProps['onTouchStart']
>;
export type PanResponderViewOnTouchMove = NonNullable<
  PanResponderViewProps['onTouchMove']
>;
export type PanResponderViewOnTouchEnd = NonNullable<
  PanResponderViewProps['onTouchEnd']
>;
function PanResponderView({
  onTouchStart,
  onTouchMove,
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
          onTouchStart?.(evt);
        },
        onPanResponderMove: (evt, _gestureState) => {
          onTouchMove?.(evt);
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (evt, _gestureState) => {
          onTouchEnd?.(evt);
        },
        onPanResponderTerminate: () => {},
        onShouldBlockNativeResponder: () => true,
      }),
    [onTouchStart, onTouchMove, onTouchEnd]
  );

  return <View {...props} {...panResponder.panHandlers} />;
}

export default PanResponderView;
