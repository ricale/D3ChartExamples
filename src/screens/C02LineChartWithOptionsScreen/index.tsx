import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Text from '../../components/Text';
import LineChart from './comps/LineChart';
import dummy from './dummy';

function C02LineChartWithOptionsScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>C02LineChartWithOptionsScreen</Text>
        <Text style={styles.subtitle}>- 라인 차트 옵션 기능 구현</Text>
      </View>

      <LineChart series={[{ data: dummy }]} width="100%" height={250} />
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
