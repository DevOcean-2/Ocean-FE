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
  const stepCurrent = currentStep - 1;
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepWrapper}>
          {index > 0 && (
            <View
              style={[
                styles.line,
                {
                  backgroundColor: index <= stepCurrent ? activeColor : inactiveColor,
                },
              ]}
            />
          )}

          <View style={styles.stepContainer}>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor:
                    index === stepCurrent
                      ? activeColor
                      : index < stepCurrent
                        ? activeColor
                        : '#fff',
                  borderWidth: index === stepCurrent ? 0 : 1,
                  borderColor: inactiveColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  {
                    color: index === stepCurrent || index < stepCurrent ? '#fff' : inactiveColor,
                  },
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {index === stepCurrent && <Text style={styles.stepText}>{step}</Text>}
          </View>

          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                {
                  backgroundColor: index < stepCurrent ? activeColor : inactiveColor,
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
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  stepWrapper: {
    flex: 1,
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34C759',
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: '600',
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  line: {
    flex: 1,
    height: 1,
  },
});

export default ProgressSteps;
