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
  console.log(currentStep);
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepWrapper}>
          {/* Left Line */}
          {index > 0 && (
            <View
              style={[
                styles.line,
                {
                  backgroundColor: index <= currentStep ? activeColor : inactiveColor,
                },
              ]}
            />
          )}

          {/* Circle & Text Container */}
          <View style={styles.stepContainer}>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor:
                    index === currentStep
                      ? activeColor
                      : index < currentStep
                        ? activeColor
                        : '#fff',
                  borderWidth: index === currentStep ? 0 : 1,
                  borderColor: inactiveColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  {
                    color: index === currentStep || index < currentStep ? '#fff' : inactiveColor,
                  },
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {/* Step Text - Only show for current step */}
            {index === currentStep && <Text style={styles.stepText}>{step}</Text>}
          </View>

          {/* Right Line */}
          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                {
                  backgroundColor: index < currentStep ? activeColor : inactiveColor,
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
