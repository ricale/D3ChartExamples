import StaticHorizontalLine, {
  StaticHorizontalLineProps,
} from './StaticHorizontalLine';
import TransitionY from '../../../TransitionY';

type HorizontalLineProps = Omit<StaticHorizontalLineProps, 'y'> & {
  y: NonNullable<StaticHorizontalLineProps['y']>;
  visible: boolean;
  animatable: boolean;
  duration: number;
};
function HorizontalLine({
  y,
  visible,
  animatable,
  duration,
  ...props
}: HorizontalLineProps) {
  if (!animatable) {
    return <StaticHorizontalLine y={y} {...props} />;
  }

  return (
    <TransitionY
      y={y}
      visible={visible}
      onAnimY={(prev, current, delta) => (current - prev) * delta + prev}
      onAnimVisible={(_, current, delta) => (current ? delta : 1 - delta)}
      duration={duration}
    >
      <StaticHorizontalLine {...props} />
    </TransitionY>
  );
}

export default HorizontalLine;
