import { StyleSheet, View } from 'react-native';

import ScreenContainer from 'components/ScreenContainer';
import Text from 'components/Text';

import LineChart from './comps/LineChart';
import dummySeries from './dummySeries';

function C02LineChartWithOptionsScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>C02LineChartWithOptionsScreen</Text>
        <Text style={styles.subtitle}>- 라인 차트 옵션 기능 구현</Text>
      </View>

      <LineChart
        series={dummySeries}
        width="100%"
        height={250}
        xAxis={{
          enabled: true,
          lineColor: 'red',
          lineWidth: 2,
          tickLength: 15,
          tickWidth: 3,
          tickColor: 'green',
          tickLabelSize: 20,
          tickLabelWeight: 100,
          tickLabelFormatter: date =>
            `${date.getMonth() + 1}.${date.getDate()}`,

          showGridLines: true,
          gridLineWidth: 2,
          gridLineColor: 'rgba(0, 0, 0, 0.5)',
        }}
        yAxis={{
          enabled: true,
          lineColor: 'brown',
          lineWidth: 3,
          tickLength: 2,
          tickWidth: 3,
          tickColor: 'yellow',
          tickLabelSize: 8,
          tickLabelWeight: 700,
          tickLabelFormatter: val => val.toLocaleString(),

          showGridLines: false,
        }}
      />
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
  subtitle: {},
});
export default C02LineChartWithOptionsScreen;
