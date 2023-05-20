import { Path as RNSPath } from 'react-native-svg';
import AnimatedPath, { AnimatedPathProps } from './AnimatedPath';

export type PathProps = AnimatedPathProps & {
  animated?: boolean;
};
function Path({ animated, duration, interpolater, ...props }: PathProps) {
  if (animated === false) {
    return <RNSPath {...props} />;
  }

  return (
    <AnimatedPath duration={duration} interpolater={interpolater} {...props} />
  );
}

export default Path;
