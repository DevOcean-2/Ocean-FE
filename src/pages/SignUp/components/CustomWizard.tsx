// SignUp/components/CustomWizard.tsx
import React from 'react';
import { Wizard } from 'react-native-ui-lib';
import { StyleSheet, View } from 'react-native';

interface CustomWizardProps {
  activeIndex: number;
  onActiveIndexChanged: (index: number) => void;
  getStepState: (index: number) => any;
}

export const CustomWizard: React.FC<CustomWizardProps> = ({
  activeIndex,
  onActiveIndexChanged,
  getStepState,
}) => (
  <View style={CustomWizardStyles.wizardContainer}>
    <Wizard
      activeIndex={activeIndex}
      containerStyle={CustomWizardStyles.wizardInnerContainer}
      onActiveIndexChanged={onActiveIndexChanged}
    >
      <Wizard.Step
        state={getStepState(0)}
        label="기본 정보"
        indexLabelStyle={CustomWizardStyles.wizardIndexLabel}
        labelStyle={CustomWizardStyles.wizardLabel}
        color="#04C755"
        circleColor="#ffffff"
        circleBackgroundColor="#04C755"
      />
      <Wizard.Step
        state={getStepState(1)}
        label="반려견 정보"
        color="#04C755"
        circleColor="#04C755"
        circleBackgroundColor="#D8F6EA"
      />
      <Wizard.Step
        state={getStepState(2)}
        label="추가 정보"
        color="#04C755"
        circleColor="#04C755"
        circleBackgroundColor="#D8F6EA"
      />
    </Wizard>
  </View>
);

const CustomWizardStyles = StyleSheet.create({
  wizardContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    elevation: 2,
  },
  wizardInnerContainer: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  wizardIndexLabel: {
    color: 'white',
    borderColor: 'white',
  },
  wizardLabel: {
    fontWeight: '600',
    fontSize: 14,
    color: '#101828',
  },
});
