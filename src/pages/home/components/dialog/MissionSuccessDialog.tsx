import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Dialog, Button, Text, View } from 'react-native-ui-lib';

interface MissionSuccessDialogProps {
  isVisible: boolean;
  onDismiss: () => void;
  missionType: 'FEED' | 'TREASURE_HUNT' | 'LANDMARK';
  reward?: {
    point?: number;
    exp?: number;
  };
}

const getMissionTypeText = (type: 'FEED' | 'TREASURE_HUNT' | 'LANDMARK') => {
  switch (type) {
    case 'FEED':
      return '피드';
    case 'TREASURE_HUNT':
      return '보물찾기';
    case 'LANDMARK':
      return '랜드마크';
    default:
      return '미션';
  }
};

export const MissionSuccessDialog = ({
  isVisible,
  onDismiss,
  missionType,
  reward,
}: MissionSuccessDialogProps) => {
  return (
    <Dialog visible={isVisible} onDismiss={onDismiss} containerStyle={styles.container} center>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.congratsText}>💎 축하합니다!</Text>
          <Text style={styles.missionText}>
            {getMissionTypeText(missionType)} 미션을 완료했어요
          </Text>
        </View>

        {reward && (
          <View style={styles.rewardContainer}>
            {reward.point && (
              <View style={styles.rewardItem}>
                <Text style={styles.rewardLabel}>포인트</Text>
                <Text style={styles.rewardValue}>+{reward.point}P</Text>
              </View>
            )}
            {reward.exp && (
              <View style={styles.rewardItem}>
                <Text style={styles.rewardLabel}>경험치</Text>
                <Text style={styles.rewardValue}>+{reward.exp}EXP</Text>
              </View>
            )}
          </View>
        )}

        <Button
          label="확인"
          size={Button.sizes.large}
          backgroundColor="#04C755"
          style={styles.button}
          onPress={onDismiss}
        />
      </View>
    </Dialog>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: windowWidth * 0.85, // 화면 너비의 85%
    position: 'absolute',
    top: '50%',  // 상단에서 50% 위치
    left: '50%', // 왼쪽에서 50% 위치
    transform: [  // 정중앙 정렬을 위한 변환
      { translateX: -(windowWidth * 0.85) / 2 },
      { translateY: -windowHeight / 4 }
    ],
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#101426',
    marginBottom: 8,
  },
  missionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#101426',
  },
  rewardContainer: {
    width: '100%',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rewardLabel: {
    fontSize: 14,
    color: '#8F9BB3',
    fontWeight: '500',
  },
  rewardValue: {
    fontSize: 16,
    color: '#101426',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 8,
  },
});
