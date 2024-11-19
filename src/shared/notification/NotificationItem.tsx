import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';
import { NotificationHistory } from './types/NotificationHistory';
import { getTimeAgo } from './utils/getTimeAgo';
import { ICON_SUCCESS_MARK, ICON_WARNING_MARK } from '@/assets/svgs';

interface Props {
  notification: NotificationHistory;
  onPress: () => void;
}

export function NotificationItem({ notification, onPress }: Props) {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <Animated.View
        style={[
          {
            transform: [{ translateX: trans }],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={{ width: 10, height: '100%' }} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={40}
      onSwipeableOpen={(direction: any) => {
        if (direction === 'right') {
          onPress();
        }
      }}
    >
      <View style={[styles.container, !notification.isRead && styles.unread]}>
        <View style={styles.iconContainer}>
          {notification.status === 'SUCCESS' ? <ICON_SUCCESS_MARK /> : <ICON_WARNING_MARK />}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.body}>{notification.body}</Text>
          <Text style={styles.time}>{getTimeAgo(notification.sentAt)}</Text>
        </View>
      </View>
    </Swipeable>
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
    justifyContent: 'flex-start',
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
  deleteAction: {
    width: 100,
    height: '100%',
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
    padding: 20,
  },
});
