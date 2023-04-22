import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';

import Pressable from '../../Pressable';
import { LinesOptions, TimeSeries } from '../types';
import { DEFAULT_COLORS } from '../constants';

type LegendProps = {
  series: TimeSeries[];
  linesOptions?: LinesOptions;
  onClickItem?: (sr: TimeSeries, idx: number) => void;
};
function Legend({ series, linesOptions, onClickItem }: LegendProps) {
  const colors = linesOptions?.colors ?? DEFAULT_COLORS;
  return (
    <View style={styles.container}>
      {series.map((sr, i) => (
        <Pressable
          key={i}
          style={styles.item}
          onPress={() => onClickItem?.(sr, i)}
        >
          <View
            style={{
              ...styles.rect,
              backgroundColor: sr.color ?? colors[i % colors.length],
            }}
          />
          <Text>{sr.name ?? `시리즈 ${i + 1}`}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
  },
  space: {
    width: 16,
  },
  rect: {
    width: 12,
    height: 12,
    marginRight: 4,
    borderRadius: 2,
  },
});

export default Legend;
