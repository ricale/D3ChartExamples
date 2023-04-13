import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';

type TextProps = RNTextProps;

function Text({ style, ...props }: TextProps) {
  return <RNText {...props} style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});

export default Text;
