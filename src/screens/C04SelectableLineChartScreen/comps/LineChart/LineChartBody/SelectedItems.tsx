import { ScaleLinear, ScaleTime } from 'd3';
import { Circle, G, Line } from 'react-native-svg';

import PaneBoundary from 'utils/PaneBoundary';
import getColorWithAlpha from 'utils/getColorWithAlpha';

import { SelectedItem } from '../types';

type SelectedItemsProps = {
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  paneBoundary: PaneBoundary;
  selected: null | (SelectedItem | null)[];
  colors: string[];
};
function SelectedItems({
  xScale,
  yScale,
  paneBoundary,
  selected,
  colors,
}: SelectedItemsProps) {
  const firstItem = selected?.find(it => !!it);
  if (!firstItem) {
    return null;
  }

  return (
    <G>
      <Line
        x1={xScale(firstItem.date)}
        x2={xScale(firstItem.date)}
        y1={paneBoundary.y1}
        y2={paneBoundary.y2}
        stroke="gray"
      />
      {selected?.map(item =>
        !item ? null : (
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
        )
      )}
    </G>
  );
}

export default SelectedItems;
