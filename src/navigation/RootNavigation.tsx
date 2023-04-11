import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import C01LineChartScreen from '../screens/C01LineChartScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamsList } from './types';

const Stack = createNativeStackNavigator<RootStackParamsList>();

function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="C01LineChart"
          component={C01LineChartScreen}
          options={{ animation: 'none' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
