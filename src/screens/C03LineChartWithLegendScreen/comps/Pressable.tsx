import { useState } from 'react';
import {
  Animated,
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
} from 'react-native';

type PressableProps = RNPressableProps & {};
function Pressable({
  onPressIn: _onPressIn,
  onPressOut: _onPressOut,
  style,
  ...props
}: PressableProps) {
  const [pressed, setPressed] = useState(false);
  const onPressIn: typeof _onPressIn = evt => {
    setPressed(true);
    _onPressIn?.(evt);
  };
  const onPressOut: typeof _onPressOut = evt => {
    setPressed(false);
    _onPressOut?.(evt);
  };
  return (
    <RNPressable
      {...props}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={
        Array.isArray(style)
          ? [...style, { opacity: pressed ? 0.2 : 1 }]
          : typeof style === 'object'
          ? { ...style, opacity: pressed ? 0.2 : 1 }
          : style
      }
    />
  );
}

export default Pressable;
