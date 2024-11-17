import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from './hooks/useNotifications';
import { NotificationType } from './types/NotificationType';
import { FilterTabs } from './FilterTabs';
import { TouchableOpacity, View, Text } from 'react-native-ui-lib';
import { NotificationHeader } from './NotificationHeader';
import { MainLayout } from '@/src/pages/home/components/frame';

export function NotificationList() {
  const [selectedType, setSelectedType] = useState<NotificationType | 'ALL'>('ALL');
  const { notifications, deleteNotification } = useNotifications(selectedType);

  const tabs = [
    { key: 'ALL', label: '전체' },
    { key: 'FEED', label: '피드 활동' },
    { key: 'MISSION', label: '미션' },
  ];

  return (
    <MainLayout header={<NotificationHeader />}>
      <View style={styles.container}>
        <FilterTabs
          tabs={tabs}
          selectedKey={selectedType}
          onSelect={(key: any) => setSelectedType(key as NotificationType | 'ALL')}
        />
        <FlatList
          data={notifications}
          renderItem={({ item }: any) => (
            <NotificationItem notification={item} onPress={() => deleteNotification(item.id)} />
          )}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1F7',
  },
  list: {
    padding: 16,
  },
});
