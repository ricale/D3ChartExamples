import { Circle, G, GProps, Rect, TSpan, Text } from 'react-native-svg';
import { useImmer } from 'use-immer';
import { SelectedItem, TimeSeries } from '../../types';

export type TooltipProps = {
  items: SelectedItem[];
  series: TimeSeries[];
  colors: string[];
  x?: number;
  y?: number;
  onLayout?: GProps['onLayout'];
};
function Tooltip({
  items,
  series,
  colors,
  x = 0,
  y = 0,
  onLayout: _onLayout,
}: TooltipProps) {
  const [state, setState] = useImmer({
    width: 0,
    height: 0,
  });

  const onLayout: GProps['onLayout'] = evt => {
    const { layout } = evt.nativeEvent;
    if (layout.width === 0 || layout.height === 0) {
      return;
    }
    _onLayout?.(evt);
  };

  const onContentLayout: GProps['onLayout'] = evt => {
    const { layout } = evt.nativeEvent;
    const newWidth = Math.floor(layout.width);
    const newHeight = Math.floor(layout.height);
    if (state.width === newWidth && state.height === newHeight) {
      return;
    }
    setState(dr => {
      dr.width = newWidth;
      dr.height = newHeight;
    });
  };

  const loaded = state.width !== 0 && state.height !== 0;

  return (
    <G x={x} y={y} opacity={loaded ? 1 : 0}>
      {loaded && (
        <Rect
          width={state.width + 20}
          height={state.height + 20}
          fill="white"
          stroke="darkgray"
          onLayout={onLayout}
        />
      )}
      <G x={10} y={10} onLayout={onContentLayout}>
        {items.map((item, i) => (
          <G key={item.seriesIndex} y={i * 14}>
            <Circle
              x={2}
              y={5}
              r={2}
              fill={colors[item.seriesIndex % colors.length]}
            />
            <Text dx={8} alignmentBaseline="hanging">
              <TSpan>{`${series[item.seriesIndex].name}:`}</TSpan>
              <TSpan dx={5} fontWeight="600">
                {item.value}
              </TSpan>
            </Text>
          </G>
        ))}
      </G>
    </G>
  );
}

export default Tooltip;
