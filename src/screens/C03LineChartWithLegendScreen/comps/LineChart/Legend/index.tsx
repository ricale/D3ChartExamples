import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';

import Pressable from '../../Pressable';
import { LegendOptions, LinesOptions, TimeSeries } from '../types';
import { DEFAULT_COLORS } from '../constants';

const NOT_VISIBLE_COLOR = 'gainsboro';

type LegendProps = LegendOptions & {
  series: TimeSeries[];
  linesOptions?: LinesOptions;
  onClickItem?: (sr: TimeSeries, idx: number) => void;
};
function Legend({
  series,
  linesOptions,
  onClickItem,

  enabled = true,

  // position,
  direction = 'row',
  align = 'center',

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
      style={[
        styles.container,
        {
          flexDirection: direction,
          flexWrap: direction === 'row' ? 'wrap' : undefined,
          justifyContent: direction === 'row' ? align : 'center',
          alignItems: direction === 'column' ? align : 'center',
        },
      ]}
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
  container: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Legend;
