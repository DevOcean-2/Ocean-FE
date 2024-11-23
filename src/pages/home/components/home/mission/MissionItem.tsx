import { StyleSheet } from 'react-native';
import { View, Text, ProgressBar, TouchableOpacity } from 'react-native-ui-lib';

interface MissionItemProps {
  percent: string;
  missionId: number;
  missionProgressType: 'READY' | 'PROGRESS' | 'COMPLETE';
  missionType: string;
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
  const handlePress = () => {
    if (onPress) {
      onPress?.();
    } else if (missionProgressType === 'COMPLETE') {
      return;
    } else {
      console.log('미션 진행');
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
