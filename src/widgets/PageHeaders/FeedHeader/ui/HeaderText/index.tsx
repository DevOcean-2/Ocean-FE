import { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  children?: ReactNode;
}

const HeaderText = (props: Props) => {
  const { children } = props;

  return <Text style={styles.text}>{children}</Text>;
};

export default HeaderText;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 600,
  },
});
