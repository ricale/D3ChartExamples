import { Circle, G } from 'react-native-svg';
import { ScaleLinear, ScaleTime } from 'd3';
import getColorWithAlpha from 'utils/getColorWithAlpha';
import { SelectedItem } from '../../types';

type DotsProps = {
  items: SelectedItem[];
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  colors: string[];
};
function Dots({ items, xScale, yScale, colors }: DotsProps) {
  return (
    <G>
      {items?.map(item => (
        <Circle
          key={item.seriesIndex}
          x={xScale(item.date)}
          y={yScale(item.value)}
          r={2}
          fill={colors[item.seriesIndex % colors.length]}
          stroke={getColorWithAlpha(
            colors[item.seriesIndex % colors.length],
            0.5
          )}
          strokeWidth={3}
        />
      ))}
    </G>
  );
}

export default Dots;
