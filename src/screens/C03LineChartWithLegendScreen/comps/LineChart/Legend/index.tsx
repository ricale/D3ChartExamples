import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';

import { LinesOptions, TimeSeries } from '../types';
import { DEFAULT_COLORS } from '../constants';
import { Fragment } from 'react';

type LegendProps = {
  series: TimeSeries[];
  linesOptions?: LinesOptions;
};
function Legend({ series, linesOptions }: LegendProps) {
  const colors = linesOptions?.colors ?? DEFAULT_COLORS;
  return (
    <View style={styles.container}>
      {series.map((sr, i) => (
        <View key={i} style={styles.item}>
          <View
            style={{
              ...styles.rect,
              backgroundColor: sr.color ?? colors[i % colors.length],
            }}
          />
          <Text>{sr.name ?? `시리즈 ${i + 1}`}</Text>
        </View>
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
    marginLeft: 8,
    marginRight: 8,
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
