import { StyleSheet } from 'react-native';
import { View, Text, ProgressBar } from 'react-native-ui-lib';

interface MissionItemProps {
  mission: string;
}

export const MissionItem = ({ mission }: MissionItemProps) => (
  <View style={styles.missionItem}>
    <Text style={styles.missionLabel}>진행중인 미션</Text>
    <Text style={styles.missionText}>{mission}</Text>
    <View
      style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}
    >
      <ProgressBar style={{ flexGrow: 1 }} progress={80} progressColor="#04C755" />
      <Text style={{
        color: '#222B45',
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 16,
      }}>80%</Text>
    </View>
  </View>
);

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
