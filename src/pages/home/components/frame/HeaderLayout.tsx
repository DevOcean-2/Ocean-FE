import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children?: ReactNode;
  headerBackgroundColor?: string;
}

export const HeaderLayout = (props: Props) => {
  const { children, headerBackgroundColor } = props;
  const backgroundColor =
    headerBackgroundColor === undefined ? 'transparent' : headerBackgroundColor;

  return <View style={{ ...styles.container, backgroundColor }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
