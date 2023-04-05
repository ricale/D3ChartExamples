import { StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import ScreenContainer from '../../components/ScreenContainer';
import Text from '../../components/Text';
import useNavigation from '../../navigation/useNavigation';

function HomeScreen() {
  const nav = useNavigation();
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text>화면 목록</Text>
      </View>
      <Button
        title="C01 - 라인차트 기본 기능 구현"
        onPress={() => nav.navigate('C01LineChart')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});

export default HomeScreen;
