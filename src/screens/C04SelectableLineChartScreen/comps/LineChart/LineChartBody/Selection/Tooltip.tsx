import { Circle, G, GProps, Rect, TSpan, Text } from 'react-native-svg';
import { useImmer } from 'use-immer';

import dateFormat from 'utils/dateFormat';

import { SelectedItem, SelectionOptions, TimeSeries } from '../../types';

export type TooltipProps = SelectionOptions['tooltip'] & {
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

  enabled = true,

  padding = 10,
  paddingTop: _paddingTop,
  paddingLeft: _paddingLeft,
  paddingRight: _paddingRight,
  paddingBottom: _paddingBottom,

  backgroundColor = 'white',
  borderColor = 'darkgray',
  borderWidth,

  titleFormatter = items => dateFormat(items[0].date),
  titleSize,
  titleFont,
  titleWeight,
  titleColor,

  itemCircleRadius = 2,
  itemCircleColor = seriesColor => seriesColor,

  itemNameFormatter = (item, series) =>
    `${series[item.seriesIndex].name ?? `시리즈 ${item.seriesIndex}`}:`,
  itemNameSize,
  itemNameFont,
  itemNameWeight,
  itemNameColor,

  itemValueFormatter = item => `${item.value}`,
  itemValueSize,
  itemValueFont,
  itemValueWeight = '600',
  itemValueColor,

  titleHeight = 14,
  itemHeight = 14,
  itemCircleNameGap = 8,
  itemNameValueGap = 5,
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

  const paddingTop = _paddingTop ?? padding;
  const paddingLeft = _paddingLeft ?? padding;
  const paddingRight = _paddingRight ?? padding;
  const paddingBottom = _paddingBottom ?? padding;

  const loaded = state.width !== 0 && state.height !== 0;

  if (!enabled) {
    return null;
  }

  return (
    <G x={x} y={y} opacity={loaded ? 1 : 0}>
      {loaded && (
        <Rect
          width={state.width + paddingLeft + paddingRight}
          height={state.height + paddingTop + paddingBottom}
          fill={backgroundColor}
          stroke={borderColor}
          strokeWidth={borderWidth}
          onLayout={onLayout}
        />
      )}
      <G x={paddingLeft} y={paddingTop} onLayout={onContentLayout}>
        <G>
          <Text
            alignmentBaseline="hanging"
            fontSize={titleSize}
            fontFamily={titleFont}
            fontWeight={titleWeight}
            fill={titleColor}
          >
            {titleFormatter(items)}
          </Text>
        </G>
        {items.map((item, i) => (
          <G key={i} y={titleHeight + i * itemHeight}>
            <Circle
              x={2}
              y={5}
              r={itemCircleRadius}
              fill={
                typeof itemCircleColor === 'function'
                  ? itemCircleColor(colors[item.seriesIndex % colors.length])
                  : itemCircleColor
              }
            />
            <Text
              dx={itemCircleRadius * 2 + itemCircleNameGap}
              alignmentBaseline="hanging"
            >
              <TSpan
                fill={
                  typeof itemNameColor === 'function'
                    ? itemNameColor(colors[item.seriesIndex % colors.length])
                    : itemNameColor
                }
                fontSize={itemNameSize}
                fontFamily={itemNameFont}
                fontWeight={itemNameWeight}
              >
                {itemNameFormatter(item, series)}
              </TSpan>
              <TSpan
                dx={itemNameValueGap}
                fill={
                  typeof itemValueColor === 'function'
                    ? itemValueColor(colors[item.seriesIndex % colors.length])
                    : itemValueColor
                }
                fontSize={itemValueSize}
                fontFamily={itemValueFont}
                fontWeight={itemValueWeight}
              >
                {itemValueFormatter(item)}
              </TSpan>
            </Text>
          </G>
        ))}
      </G>
    </G>
  );
}

export default Tooltip;
