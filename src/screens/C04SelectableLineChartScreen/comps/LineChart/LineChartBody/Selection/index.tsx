import { ScaleLinear, ScaleTime } from 'd3';
import { G, Line } from 'react-native-svg';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

import { SelectedItem, SelectionOptions, TimeSeries } from '../../types';
import Dots from './Dots';
import Tooltip, { TooltipProps } from './Tooltip';

type SelectionProps = SelectionOptions & {
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  paneBoundary: PaneBoundary;
  selected: null | (SelectedItem | null)[];
  colors: string[];
  series: TimeSeries[];
};
function Selection({
  xScale,
  yScale,
  paneBoundary,
  selected: _selected,
  colors,
  series,

  enabled = true,

  lineColor = 'gray',
  lineWidth = 1,

  dot: dotOptions,
  tooltip: tooltipOptions,
}: SelectionProps) {
  const [state, setState] = useImmer({
    tooltip: {
      width: 0,
      height: 0,
    },
  });
  const selected =
    _selected
      ?.filter((it): it is SelectedItem => !!it)
      ?.sort((a, b) => b.value - a.value) ?? [];
  const firstItem = selected.find(it => !!it);
  const x = firstItem && xScale(firstItem.date);

  const onTooltipLayout: TooltipProps['onLayout'] = evt => {
    const { layout } = evt.nativeEvent;
    const newWidth = Math.floor(layout.width);
    const newHeight = Math.floor(layout.height);
    if (
      state.tooltip.width === newWidth &&
      state.tooltip.height === newHeight
    ) {
      return;
    }

    setState(dr => {
      dr.tooltip.width = newWidth;
      dr.tooltip.height = newHeight;
    });
  };

  if (x === undefined) {
    return null;
  }

  const tooltipX =
    state.tooltip.width === 0
      ? -1000
      : paneBoundary.x2 - state.tooltip.width > x + 10
      ? x + 10
      : x - state.tooltip.width - 10;

  if (!enabled) {
    return null;
  }

  return (
    <>
      <G>
        {lineWidth > 0 && (
          <Line
            x1={x}
            x2={x}
            y1={paneBoundary.y1}
            y2={paneBoundary.y2}
            stroke={lineColor}
            strokeWidth={lineWidth}
          />
        )}
        <Dots
          items={selected}
          xScale={xScale}
          yScale={yScale}
          colors={colors}
          {...dotOptions}
        />
      </G>
      <Tooltip
        x={tooltipX}
        y={paneBoundary.y2}
        items={selected}
        series={series}
        colors={colors}
        onLayout={onTooltipLayout}
        {...tooltipOptions}
      />
    </>
  );
}

export default Selection;
