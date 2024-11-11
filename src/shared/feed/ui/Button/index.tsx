import React, { ReactNode } from 'react';
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  children?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const Button = (props: Props) => {
  const { children, style, onPress, ...restProps } = props;

  return (
    <Pressable style={[styles.baseStyle, style]} onPress={onPress} {...restProps}>
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  baseStyle: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#C5CEE0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
