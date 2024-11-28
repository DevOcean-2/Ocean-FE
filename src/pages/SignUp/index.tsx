import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Button, Toast } from 'react-native-ui-lib';
import { useSignUpForm } from './hooks/useSignUpForm';

import { styles } from './styles';
import { StepRenderer } from './components/StepRender';
import ProgressSteps from './components/progressSteps';

const SignUp: React.FC = () => {
  const steps = ['기본정보', '추가정보', '정보 확인'];

  const {
    activeIndex,
    control,
    errors,
    toastMessage,
    goToNextStep,
    goToPrevStep,
    isBasicInfoValid,
    isAdditionalInfoValid,
  } = useSignUpForm();

  const isButtonDisabled = () => {
    if (activeIndex === 1) {
      return !isBasicInfoValid();
    } else if (activeIndex === 2) {
      return !isAdditionalInfoValid();
    }
    return false;
  };

  const renderButtons = () => {
    const showPrevButton = activeIndex > 1;

    const nextButton = (
      <Button
        style={[
          SignUpStyles.button,
          SignUpStyles.nextButton,
          !showPrevButton && SignUpStyles.fullWidthButton,
          isButtonDisabled() && SignUpStyles.disabledButton,
        ]}
        labelStyle={[
          SignUpStyles.buttonLabel,
          isButtonDisabled() && SignUpStyles.disabledButtonLabel,
        ]}
        disabled={isButtonDisabled()}
        label={activeIndex === 2 ? '시작하기' : '입력 완료'}
        onPress={goToNextStep}
      />
    );

    if (!showPrevButton) {
      return nextButton;
    }

    return (
      <View style={SignUpStyles.halfWidthButton}>
        <Button
          style={[SignUpStyles.button, SignUpStyles.prevButton]}
          labelStyle={SignUpStyles.prevButtonLabel}
          label="이전 단계"
          onPress={goToPrevStep}
        />
        {nextButton}
      </View>
    );
  };

  return (
    <View style={SignUpStyles.container}>
      {activeIndex !== 0 && <ProgressSteps steps={steps} currentStep={activeIndex} />}
      <ScrollView contentContainerStyle={SignUpStyles.signUpViewContainer}>
        <View style={SignUpStyles.renderStepContainer}>
          <StepRenderer activeIndex={activeIndex} control={control} errors={errors} />
        </View>
      </ScrollView>
      {activeIndex !== 0 && activeIndex !== 4 && (
        <View style={SignUpStyles.buttonContainer}>{renderButtons()}</View>
      )}

      {toastMessage && <Toast visible position="bottom" message={toastMessage} />}
    </View>
  );
};

const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  signUpViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  renderStepContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 30,
    flex: 1,
    marginHorizontal: 8,
  },
  fullWidthButton: {
    marginHorizontal: 24,
  },

  halfWidthButton: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
  },
  prevButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  prevButtonLabel: {
    color: '#000000',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#04C755',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#E4E9F2',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: '600',
  },
  disabledButtonLabel: {
    color: '#000000',
  },
});

export default SignUp;
