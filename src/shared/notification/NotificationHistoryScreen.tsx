import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from './hooks/useNotifications';
import { NotificationType } from './types/NotificationType';
import { FilterTabs } from './FilterTabs';
import { View } from 'react-native-ui-lib';

export function NotificationList() {
  const [selectedType, setSelectedType] = useState<NotificationType | 'ALL'>('ALL');
  const { notifications, markAsRead } = useNotifications(selectedType);

  const tabs = [
    { key: 'ALL', label: '전체' },
    { key: 'FEED', label: '피드 활동' },
    { key: 'MISSION', label: '미션' },
  ];

  return (
    <View style={styles.container}>
      <FilterTabs
        tabs={tabs}
        selectedKey={selectedType}
        onSelect={(key: any) => setSelectedType(key as NotificationType | 'ALL')}
      />
      <FlatList
        data={notifications}
        renderItem={({ item }: any) => (
          <NotificationItem notification={item} onPress={() => markAsRead(item.id)} />
        )}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    padding: 16,
  },
});
