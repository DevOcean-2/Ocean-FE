import { StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const HeaderTextContainer = (props: Props) => {
  const { children } = props;

  return <View style={styles.textContainer}>{children}</View>;
};

export default HeaderTextContainer;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
