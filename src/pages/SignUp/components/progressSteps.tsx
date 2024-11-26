import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  activeColor = '#34C759',
  inactiveColor = '#E5E5EA',
}) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor: index + 1 <= currentStep ? activeColor : inactiveColor,
              },
            ]}
          >
            <Text style={styles.stepNumber}>{index + 1}</Text>
          </View>

          <Text
            style={[
              styles.stepText,
              {
                color: index + 1 <= currentStep ? '#000' : '#8E8E93',
              },
            ]}
          >
            {step}
          </Text>

          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                {
                  backgroundColor: index + 1 < currentStep ? activeColor : inactiveColor,
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  stepText: {
    marginTop: 8,
    fontSize: 12,
  },
  line: {
    position: 'absolute',
    top: 12,
    width: '100%',
    right: '-50%',
    height: 2,
    zIndex: -1,
  },
});

export default ProgressSteps;
