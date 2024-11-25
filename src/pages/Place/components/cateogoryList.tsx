import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SortingComponent from './sortedComponent';
import {
  ICON_BEVERAGE,
  ICON_CAMPING,
  ICON_CROISSANT,
  ICON_DOG_FACE,
  ICON_FORK,
  ICON_RIBBORN,
} from '@/assets/svgs';

const CategoryList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>두식이와 함께 갈 수 있는 장소</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        <View style={styles.chip}>
          <ICON_FORK />
          <Text style={styles.chipText}>음식점</Text>
        </View>
        <View style={styles.chip}>
          <ICON_BEVERAGE />
          <Text style={styles.chipText}>까페</Text>
        </View>
        <View style={styles.chip}>
          <ICON_CROISSANT />
          <Text style={styles.chipText}>베이커리</Text>
        </View>
        <View style={styles.chip}>
          <ICON_DOG_FACE />
          <Text style={styles.chipText}>동물병원</Text>
        </View>
        <View style={styles.chip}>
          <ICON_CAMPING />
          <Text style={styles.chipText}>공원</Text>
        </View>
        <View style={styles.chip}>
          <ICON_RIBBORN />
          <Text style={styles.chipText}>기타</Text>
        </View>
      </ScrollView>
      <SortingComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    overflow: 'scroll',
    flexWrap: 'nowrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderColor: '#EDF1F7',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    color: '#101828',
    fontWeight: '400',
    marginLeft: 3,
  },
});

export default CategoryList;
