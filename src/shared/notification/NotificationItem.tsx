import React, { useRef } from 'react';
import { StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';
import { NotificationHistory } from './types/NotificationHistory';
import { getTimeAgo } from './utils/getTimeAgo';
import { ICON_SUCCESS_MARK, ICON_WARNING_MARK } from '@/assets/svgs';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface Props {
  notification: NotificationHistory;
  onPress: () => void;
}

export function NotificationItem({ notification, onPress }: Props) {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (gesture.dx < 0) {
        position.setValue({ x: gesture.dx, y: 0 });
      }
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx < -SWIPE_THRESHOLD) {
        Animated.timing(position, {
          toValue: { x: -SCREEN_WIDTH, y: 0 },
          duration: 250,
          useNativeDriver: false,
        }).start(onPress);
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const itemStyle = {
    transform: position.getTranslateTransform(),
  };

  return (
    <View style={styles.containerWrapper}>
      {/* 삭제 영역 */}
      <View style={styles.deleteAction} />

      {/* 알림 내용 */}
      <Animated.View
        style={[styles.container, !notification.isRead && styles.unread, itemStyle]}
        {...panResponder.panHandlers}
      >
        <View style={styles.iconContainer}>
          {notification.status === 'SUCCESS' ? <ICON_SUCCESS_MARK /> : <ICON_WARNING_MARK />}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.body}>{notification.body}</Text>
          <Text style={styles.time}>{getTimeAgo(notification.sentAt)}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
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
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    borderRadius: 12,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
});
