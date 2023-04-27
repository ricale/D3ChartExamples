import { ScrollView, StyleSheet, View } from 'react-native';

import ScreenContainer from 'components/ScreenContainer';
import Text from 'components/Text';

import LineChart from './comps/LineChart';
import dummySeries from './dummySeries';

function C04SelectableLineChartScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>C04SelectableLineChartScreen</Text>
        <Text style={styles.desc}>- 라인 차트 특정 아이템 선택 기능 구현</Text>
      </View>

      <ScrollView>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          xAxisOptions={{ showGridLines: true }}
        />

        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          legendOptions={{ enabled: false }}
          selectionOptions={{
            lineWidth: 0,
            dot: {
              radius: 3,
              borderWidth: 0,
            },
            tooltip: {
              padding: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderWidth: 2,
              itemNameColor: seriesColor => seriesColor,
              itemNameFormatter: (item, series) =>
                series[item.seriesIndex].name ?? '',
              itemNameSize: 14,
              itemNameWeight: '100',
              titleHeight: 24,
              titleSize: 20,
              itemValueColor: seriesColor => seriesColor,
              itemValueFormatter: item => item.value.toLocaleString(),
              itemValueWeight: '900',
              itemValueSize: 14,
              itemHeight: 18,
              itemCircleNameGap: 0,
              itemNameValueGap: 0,
            },
          }}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  title: {
    fontSize: 20,
  },
  desc: {},
  subtitle: {
    marginTop: 16,
    fontSize: 16,
  },
});
export default C04SelectableLineChartScreen;
