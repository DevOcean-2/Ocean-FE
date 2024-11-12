import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children?: ReactNode;
}

const HeaderIconContainer = (props: Props) => {
  const { children } = props;

  return <View style={styles.iconContainer}>{children}</View>;
};

export default HeaderIconContainer;

const styles = StyleSheet.create({
  iconContainer: {
    gap: 20,
    flexDirection: 'row',
  },
});
