import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from 'components/Button';
import ScreenContainer from 'components/ScreenContainer';
import Text from 'components/Text';
import useNavigation from 'navigation/useNavigation';
import { RootStackParamsList } from 'navigation/types';

const buttons: { title: string; screenName: keyof RootStackParamsList }[] = [
  { title: 'C01 - 라인차트 기본 기능 구현', screenName: 'C01LineChart' },
  {
    title: 'C02 - 라인차트 옵션 기능 구현',
    screenName: 'C02LineChartWithOptions',
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
