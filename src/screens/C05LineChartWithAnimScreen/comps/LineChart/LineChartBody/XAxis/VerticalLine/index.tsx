import StaticVerticalLine, {
  StaticVerticalLineProps,
} from './StaticVerticalLine';
import TransitionX from '../../../TransitionX';

type VerticalLineProps = Omit<StaticVerticalLineProps, 'x'> & {
  x: NonNullable<StaticVerticalLineProps['x']>;
  visible: boolean;
  animatable: boolean;
  duration: number;
};
function VerticalLine({
  x,
  visible,
  animatable,
  duration,
  ...props
}: VerticalLineProps) {
  if (!animatable) {
    return <StaticVerticalLine x={x} {...props} />;
  }

  return (
    <TransitionX
      x={x}
      visible={visible}
      onAnimX={(prev, current, delta) => (current - prev) * delta + prev}
      onAnimVisible={(_, current, delta) => (current ? delta : 1 - delta)}
      duration={duration}
    >
      <StaticVerticalLine {...props} />
    </TransitionX>
  );
}

export default VerticalLine;
