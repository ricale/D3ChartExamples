import { Circle, G } from 'react-native-svg';
import { ScaleLinear, ScaleTime } from 'd3';
import getColorWithAlpha from 'utils/getColorWithAlpha';
import { SelectedItem, SelectionOptions } from '../../types';

type DotsProps = SelectionOptions['dot'] & {
  items: SelectedItem[];
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  colors: string[];
};
function Dots({
  items,
  xScale,
  yScale,
  colors,

  enabled = true,
  color = seriesColor => seriesColor,
  radius = 2,
  borderColor = seriesColor => getColorWithAlpha(seriesColor, 0.5),
  borderWidth = 3,
}: DotsProps) {
  if (!enabled) {
    return null;
  }
  return (
    <G>
      {items.map(item => (
        <Circle
          key={item.seriesIndex}
          x={xScale(item.date)}
          y={yScale(item.value)}
          r={radius}
          fill={
            typeof color === 'function'
              ? color(colors[item.seriesIndex % colors.length])
              : color
          }
          stroke={
            typeof borderColor === 'function'
              ? borderColor(colors[item.seriesIndex % colors.length])
              : borderColor
          }
          strokeWidth={borderWidth}
        />
      ))}
    </G>
  );
}

export default Dots;
