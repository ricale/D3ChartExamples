import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from './types';

type RootStackNavigationProp<RouteKey extends keyof RootStackParamsList> =
  NativeStackNavigationProp<RootStackParamsList, RouteKey>;

function useNavigation<RouteKey extends keyof RootStackParamsList>() {
  const navigation = useRNNavigation<RootStackNavigationProp<RouteKey>>();
  return navigation;
}

export default useNavigation;
