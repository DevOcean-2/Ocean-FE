import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Tab {
  key: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  selectedKey: string;
  onSelect: (key: string) => void;
}

export function FilterTabs({ tabs, selectedKey, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, selectedKey === tab.key && styles.selectedTab]}
          onPress={() => onSelect(tab.key)}
        >
          <Text style={[styles.tabText, selectedKey === tab.key && styles.selectedTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#C5CEE0',
    backgroundColor: '#FFFFFF',
  },
  selectedTab: {
    borderWidth: 1,
    borderColor: '#04C755',
    backgroundColor: '#F1FFF2',
  },
  tabText: {
    color: '#8F9BB3',
    fontWeight: '600',
    fontSize: 12,
  },
  selectedTabText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
});
