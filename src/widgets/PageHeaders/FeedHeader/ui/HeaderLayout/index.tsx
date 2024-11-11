import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children?: ReactNode;
}

const HeaderLayout = (props: Props) => {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
};

export default HeaderLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
