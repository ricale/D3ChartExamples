import { ScrollView, StyleSheet, View } from 'react-native';

import ScreenContainer from 'components/ScreenContainer';
import Text from 'components/Text';

import LineChart from './comps/LineChart';
import dummySeries from './dummySeries';

function C05LineChartWithAnimScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>C05LineChartWithAnimScreen</Text>
        <Text style={styles.desc}>- 라인 차트 애니메이션 기능 구현</Text>
      </View>

      <ScrollView>
        <Text style={styles.subtitle}>애니메이션 활성화</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          xAxisOptions={{ showGridLines: true, ticks: 4 }}
          yAxisOptions={{ showGridLines: true, ticks: 4 }}
        />
        <Text style={styles.subtitle}>애니메이션 비활성화</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          xAxisOptions={{ showGridLines: true, ticks: 4, animatable: false }}
          yAxisOptions={{ showGridLines: true, ticks: 4, animatable: false }}
          linesOptions={{ animatable: false }}
        />
        <Text style={styles.subtitle}>애니메이션 컴포넌트가 많아서 느림</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          xAxisOptions={{ showGridLines: true }}
          yAxisOptions={{ showGridLines: true }}
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
export default C05LineChartWithAnimScreen;
