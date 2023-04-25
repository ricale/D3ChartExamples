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
        <LineChart series={dummySeries} width="100%" height={200} />
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
