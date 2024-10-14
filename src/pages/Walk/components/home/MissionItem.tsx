import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

interface MissionItemProps {
  mission: string;
}

export const MissionItem = ({ mission }: MissionItemProps) => (
  <View style={styles.missionItem}>
    <Text style={styles.missionLabel}>진행중인 미션</Text>
    <Text style={styles.missionText}>{mission}</Text>
  </View>
);

const styles = StyleSheet.create({
  missionItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  missionLabel: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
    marginBottom: 8,
  },
  missionText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
