import {ReactNode} from 'react';
import {Pressable, PressableProps, StyleSheet} from 'react-native';
import Text from './Text';

type ButtonProps = {
  title?: string;
  children?: ReactNode;
} & PressableProps;
function Button({title, children, ...props}: ButtonProps) {
  return (
    <Pressable style={styles.container} {...props}>
      {children}
      {!!title && <Text style={styles.title}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    backgroundColor: 'darkblue',
  },
  title: {
    color: 'white',
  },
});

export default Button;
