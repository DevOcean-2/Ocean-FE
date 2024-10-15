import { useContext } from 'react';
import { TabContext } from '@/components/TabController/context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TabContextType } from '@/components/TabController/type';

const TabBar = () => {
  const { items, setCurrentIndex, currentIndex } = useContext<TabContextType>(TabContext);

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.itemWrapper}
            onPress={() => setCurrentIndex(index)}
          >
            <View style={styles.item}>
              <Text style={index !== currentIndex && styles.disabledText}>{item.label}</Text>
              {index === currentIndex && <View style={styles.underLine} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemWrapper: {
    flex: 1,
    height: '100%',
  },
  item: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  underLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    bottom: 0,
    borderRadius: 5,
    backgroundColor: '#04C755',
  },
  disabledText: {
    color: '#98A2B3',
  },
});
