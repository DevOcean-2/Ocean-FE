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
  <View style={activeIndex > 2 ? CustomWizardStyles.noWizardContainer: CustomWizardStyles.wizardContainer}>
    <Wizard
      activeIndex={activeIndex}
      containerStyle={CustomWizardStyles.wizardInnerContainer}
      onActiveIndexChanged={onActiveIndexChanged}
    >
      <Wizard.Step
        state={getStepState(0)}
        label="기본 정보"
        indexLabelStyle={activeIndex === 0 && CustomWizardStyles.wizardIndexLabel}
        labelStyle={activeIndex === 0 && CustomWizardStyles.wizardLabel}
        color="#04C755"
        circleColor="#ffffff"
        circleBackgroundColor={activeIndex === 0 ? '#04C755' : '#D8F6EA'}
      />
      <Wizard.Step
        state={getStepState(1)}
        label="추가 정보"
        indexLabelStyle={activeIndex === 1 && CustomWizardStyles.wizardIndexLabel}
        labelStyle={activeIndex === 1 && CustomWizardStyles.wizardLabel}
        color="#04C755"
        circleColor="#ffffff"
        circleBackgroundColor={activeIndex === 1 ? '#04C755' : '#D8F6EA'}
      />
      <Wizard.Step
        state={getStepState(2)}
        label="정보 확인"
        indexLabelStyle={activeIndex === 2 && CustomWizardStyles.wizardIndexLabel}
        labelStyle={activeIndex === 2 && CustomWizardStyles.wizardLabel}
        color="#04C755"
        circleColor="#ffffff"
        circleBackgroundColor={activeIndex === 2 ? '#04C755' : '#D8F6EA'}
      />
    </Wizard>
  </View>
);

const CustomWizardStyles = StyleSheet.create({
  wizardContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    backgroundColor: 'white',
    elevation: 2,
  },
  noWizardContainer : {
    display: 'none',
  },

  wizardInnerContainer: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  wizardIndexLabel: {
    color: 'white',
  },
  wizardLabel: {
    fontWeight: '600',
    fontSize: 14,
    color: '#101828',
  },
});
