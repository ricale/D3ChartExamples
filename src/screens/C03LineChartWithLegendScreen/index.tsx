import { ScrollView, StyleSheet, View } from 'react-native';

import ScreenContainer from 'components/ScreenContainer';
import Text from 'components/Text';

import LineChart from './comps/LineChart';
import dummySeries from './dummySeries';

function C03LineChartWithLegendScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>C03LineChartWithLegendScreen</Text>
        <Text style={styles.desc}>- 라인 차트 레전드 기능 구현</Text>
      </View>

      <ScrollView>
        <Text style={styles.subtitle}>옵션 적용 안 함</Text>
        <LineChart series={dummySeries} width="100%" height={200} />

        <Text style={styles.subtitle}>옵션 position: 'top'</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          legendOptions={{
            position: 'top',
            direction: 'column',
            align: 'flex-end',
            itemPadding: 0,
            itemPaddingLeft: 16,
            itemPaddingRight: 16,
            itemLabelSize: 10,
            itemGap: 0,
            itemNotVisibleColor: 'darkgray',
            itemRectBorderRadius: 20,
          }}
        />

        <Text style={styles.subtitle}>옵션 position: 'right'</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          legendOptions={{
            position: 'right',
          }}
        />

        <Text style={styles.subtitle}>옵션 position: 'left'</Text>
        <LineChart
          series={dummySeries}
          width="100%"
          height={200}
          legendOptions={{
            position: 'left',
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
export default C03LineChartWithLegendScreen;
