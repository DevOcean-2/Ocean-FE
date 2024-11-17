import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NotificationHistory } from './types/NotificationHistory';
import { getTimeAgo } from './utils/getTimeAgo';
import { ICON_SUCCESS_MARK, ICON_WARNING_MARK } from '@/assets/svgs';

interface Props {
  notification: NotificationHistory;
  onPress: () => void;
}

export function NotificationItem({ notification, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, !notification.isRead && styles.unread]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {notification.status === 'SUCCESS' ? <ICON_SUCCESS_MARK /> : <ICON_WARNING_MARK />}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.body}>{notification.body}</Text>
        <Text style={styles.time}>{getTimeAgo(notification.sentAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
  },
  unread: {
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'start',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});
