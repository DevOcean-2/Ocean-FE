import { StyleSheet } from 'react-native';
import { View, Text, ProgressBar, TouchableOpacity } from 'react-native-ui-lib';
import { useCompleteFeedMission } from '../../../hooks';
import { useRouter } from 'expo-router';
import { FeedEntryLink } from '@/src/shared/constants';

interface MissionItemProps {
  percent: string;
  missionId: number;
  missionProgressType: 'READY' | 'PROGRESS' | 'COMPLETE';
  missionType: 'TREASURE_HUNT' | 'LANDMARK' | 'FEED';
  mission: string;
  onPress?: () => void;
}

const getProgressText = (type: MissionItemProps['missionProgressType']) => {
  switch (type) {
    case 'READY':
      return '준비중인 미션';
    case 'PROGRESS':
      return '진행중인 미션';
    case 'COMPLETE':
      return '완료';
  }
};

export const MissionItem = ({
  mission,
  missionProgressType,
  missionId,
  missionType,
  percent,
  onPress,
}: MissionItemProps) => {
  const { mutate: completeFeedMission } = useCompleteFeedMission();
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress?.();
    } else if (missionProgressType === 'COMPLETE') {
      return;
    } else if (missionType === 'FEED') {
      // 피드 업로드
      router.push(FeedEntryLink.feedUpload);

      // 완료
      completeFeedMission(0);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.missionItem}>
        <Text style={styles.missionLabel}>{getProgressText(missionProgressType)}</Text>
        <Text style={styles.missionText}>{mission}</Text>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <ProgressBar
            style={{ flexGrow: 1 }}
            progress={Number(percent) ?? 0}
            progressColor="#04C755"
          />
          <Text
            style={{
              color: '#222B45',
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 16,
            }}
          >
            {percent} %
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  missionItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  missionLabel: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: 8,
    color: '#8F9BB3',
  },
  missionText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
