import Button from '../../components/Button';
import ScreenContainer from '../../components/ScreenContainer';
import Text from '../../components/Text';
import useNavigation from '../../navigation/useNavigation';

function HomeScreen() {
  const nav = useNavigation();
  return (
    <ScreenContainer>
      <Text>HomeScreen</Text>
      <Button
        title="C01 - 라인차트"
        onPress={() => nav.navigate('C01LineChart')}
      />
    </ScreenContainer>
  );
}

export default HomeScreen;
