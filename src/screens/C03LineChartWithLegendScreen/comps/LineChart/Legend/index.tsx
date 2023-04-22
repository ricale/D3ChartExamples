import { StyleSheet, View, ViewProps } from 'react-native';

import Text from 'components/Text';

import Pressable from '../../Pressable';
import { LegendOptions, LinesOptions, TimeSeries } from '../types';
import { DEFAULT_COLORS } from '../constants';
import getContainerStyle from './getContainerStyle';

const NOT_VISIBLE_COLOR = 'gainsboro';

export type LegendProps = LegendOptions & {
  series: TimeSeries[];
  linesOptions?: LinesOptions;
  onClickItem?: (sr: TimeSeries, idx: number) => void;
  onLayout?: ViewProps['onLayout'];
};
function Legend({
  series,
  linesOptions,
  onClickItem,
  onLayout,

  enabled = true,

  position,
  direction = 'row',
  align,

  itemGap = 4,
  itemNotVisibleColor = NOT_VISIBLE_COLOR,

  itemPadding,
  itemPaddingTop,
  itemPaddingLeft,
  itemPaddingRight,
  itemPaddingBottom,

  itemRectWidth = 12,
  itemRectHeight = 12,
  itemRectBorderRadius = 2,

  itemLabelSize,
  itemLabelFont,
  itemLabelWeight,
  itemLabelColor,
  itemLabelFormatter,
}: LegendProps) {
  const colors = linesOptions?.colors ?? DEFAULT_COLORS;

  if (!enabled) {
    return null;
  }
  return (
    <View
      onLayout={onLayout}
      style={getContainerStyle({ position, direction, align })}
    >
      {series.map((sr, i) => (
        <Pressable
          key={i}
          style={[
            styles.item,
            {
              paddingTop: itemPaddingTop ?? itemPadding ?? 2,
              paddingLeft: itemPaddingLeft ?? itemPadding ?? 8,
              paddingRight: itemPaddingRight ?? itemPadding ?? 8,
              paddingBottom: itemPaddingBottom ?? itemPadding ?? 2,
            },
          ]}
          onPress={() => onClickItem?.(sr, i)}
        >
          <View
            style={{
              width: itemRectWidth,
              height: itemRectHeight,
              marginRight: itemGap,
              borderRadius: itemRectBorderRadius,
              backgroundColor: !sr.visible
                ? itemNotVisibleColor
                : sr.color ?? colors[i % colors.length],
            }}
          />
          <Text
            style={{
              fontSize: itemLabelSize,
              fontFamily: itemLabelFont,
              fontWeight: itemLabelWeight,
              ...(!sr.visible
                ? { color: itemNotVisibleColor }
                : itemLabelColor
                ? { color: itemLabelColor }
                : {}),
            }}
          >
            {itemLabelFormatter?.(sr, i) ?? sr.name ?? `시리즈 ${i + 1}`}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Legend;
