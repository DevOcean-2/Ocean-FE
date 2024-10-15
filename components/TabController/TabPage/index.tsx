import { TabContextType, TabPageProps } from '@/components/TabController/type';
import { StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { TabContext } from '@/components/TabController/context';

const TabPage = (props: TabPageProps) => {
  const { currentIndex } = useContext<TabContextType>(TabContext);

  const { index, children } = props;

  return (
    <View style={index === currentIndex ? styles.fullScreen : styles.hideScreen}>{children}</View>
  );
};

export default TabPage;

const styles = StyleSheet.create({
  fullScreen: {},
  hideScreen: {
    display: 'none',
  },
});
