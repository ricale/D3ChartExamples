import StaticXTick, { StaticXTickProps } from './StaticXTick';
import TransitionX from '../../../TransitionX';

type XTickProps = Omit<StaticXTickProps, 'x'> & {
  x: NonNullable<StaticXTickProps['x']>;
  visible: boolean;
  animatable: boolean;
  duration: number;
};
function XTick({ x, visible, animatable, duration, ...props }: XTickProps) {
  if (!animatable) {
    return <StaticXTick x={x} {...props} />;
  }

  return (
    <TransitionX
      x={x}
      visible={visible}
      onAnimX={(prev, current, delta) => (current - prev) * delta + prev}
      onAnimVisible={(_, current, delta) => (current ? delta : 1 - delta)}
      duration={duration}
    >
      <StaticXTick {...props} />
    </TransitionX>
  );
}

export default XTick;
