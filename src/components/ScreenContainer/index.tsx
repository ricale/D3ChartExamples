import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

type ScreenContainerProps = {
  children: ReactNode;
};
function ScreenContainer({children}: ScreenContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenContainer;
