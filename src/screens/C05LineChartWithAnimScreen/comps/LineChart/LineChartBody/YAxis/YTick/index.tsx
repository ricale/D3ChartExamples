import StaticYTick, { StaticYTickProps } from './StaticYTick';
import TransitionY from '../../../TransitionY';

type TickProps = Omit<StaticYTickProps, 'y'> & {
  y: NonNullable<StaticYTickProps['y']>;
  visible: boolean;
  animatable: boolean;
  duration: number;
};
function Tick({ y, visible, animatable, duration, ...props }: TickProps) {
  if (!animatable) {
    return <StaticYTick y={y} {...props} />;
  }

  return (
    <TransitionY
      y={y}
      visible={visible}
      onAnimY={(prev, current, delta) => (current - prev) * delta + prev}
      onAnimVisible={(_, current, delta) => (current ? delta : 1 - delta)}
      duration={duration}
    >
      <StaticYTick {...props} />
    </TransitionY>
  );
}

export default Tick;
