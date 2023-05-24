import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from 'components/Button';
import ScreenContainer from 'components/ScreenContainer';
import Text from 'components/Text';
import useNavigation from 'navigation/useNavigation';
import { RootStackParamsList } from 'navigation/types';

const buttons: { title: string; screenName: keyof RootStackParamsList }[] = [
  { title: 'C01 - 라인차트 기본', screenName: 'C01LineChart' },
  {
    title: 'C02 - 라인차트 옵션',
    screenName: 'C02LineChartWithOptions',
  },
  {
    title: 'C03 - 라인차트 레전드',
    screenName: 'C03LineChartWithLegend',
  },
  {
    title: 'C04 - 라인차트 특정 아이템 선택 기능',
    screenName: 'C04SelectableLineChart',
  },
  {
    title: 'C05 - 라인차트 애니메이션 기능',
    screenName: 'C05LineChartWithAnim',
  },
];

function HomeScreen() {
  const nav = useNavigation();
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text>화면 목록</Text>
      </View>
      {buttons.map((btn, i) => (
        <Fragment key={i}>
          {i !== 0 && <View style={styles.separator} />}
          <Button
            title={btn.title}
            onPress={() => nav.navigate(btn.screenName)}
          />
        </Fragment>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
});

export default HomeScreen;
