import { ScrollView, StyleSheet, View } from 'react-native';

import ScreenContainer from 'components/ScreenContainer';
import Text from 'components/Text';

import LineChart from './comps/LineChart';
import dummySeries from './dummySeries';

const dummySeriesWithCustom = [...dummySeries.map(sr => ({ ...sr }))];
dummySeriesWithCustom[0].color = 'black';
dummySeriesWithCustom[0].lineWidth = 4;

function C02LineChartWithOptionsScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>C02LineChartWithOptionsScreen</Text>
        <Text style={styles.desc}>- 라인 차트 옵션 기능 구현</Text>
      </View>

      <ScrollView>
        <Text style={styles.subtitle}>옵션 적용 안 함</Text>
        <LineChart series={dummySeries} width="100%" height={200} />

        <Text style={styles.subtitle}>X 축 옵션 적용</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          xAxisOptions={{
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
          }}
        />

        <Text style={styles.subtitle}>Y 축 옵션 적용</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          yAxisOptions={{
            enabled: true,
            lineColor: 'brown',
            lineWidth: 3,
            tickLength: 2,
            tickWidth: 3,
            tickColor: 'yellow',
            tickLabelSize: 8,
            tickLabelWeight: 700,
            tickLabelFormatter: val => val.toLocaleString(),
          }}
        />

        <Text style={styles.subtitle}>그리드라인 옵션 적용</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          xAxisOptions={{
            showGridLines: true,
            gridLineWidth: 2,
            gridLineColor: 'rgba(0, 0, 0, 0.2)',
          }}
          yAxisOptions={{
            showGridLines: false,
          }}
        />

        <Text style={styles.subtitle}>라인 옵션 적용</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          xAxisOptions={{ showTicks: false, showGridLines: true }}
          yAxisOptions={{ showTicks: false, showGridLines: true }}
          linesOptions={{
            colors: ['red', 'orange', 'green', 'blue'],
            lineWidth: 2,
          }}
        />

        <Text style={styles.subtitle}>series 에 직접 라인 옵션 적용</Text>
        <LineChart
          series={dummySeriesWithCustom}
          width="100%"
          height={200}
          xAxisOptions={{ showTicks: false, showGridLines: true }}
          yAxisOptions={{ showTicks: false, showGridLines: true }}
          linesOptions={{
            colors: ['red', 'orange', 'green', 'blue'],
            lineWidth: 2,
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
export default C02LineChartWithOptionsScreen;
