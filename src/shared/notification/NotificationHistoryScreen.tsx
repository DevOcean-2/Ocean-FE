import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from './hooks/useNotifications';
import { NotificationType } from './types/NotificationType';
import { FilterTabs } from './FilterTabs';
import { View, Text, Button } from 'react-native-ui-lib';
import { NotificationHeader } from './NotificationHeader';
import { MainLayout } from '@/src/pages/home/components/frame';
import { NotificationStorage } from './notification';

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
        <Button
          size="small"
          style={{
            marginLeft: 10,
            width: 30,
          }}
          label="TEST"
          onPress={async () => {
            await NotificationStorage.save({
              title: '알림 테스트',
              body: '알림 테스트입니다.',
              type: 'MISSION',
              status: 'SUCCESS',
            });
          }}
        />
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
