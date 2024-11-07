import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Button, Toast } from 'react-native-ui-lib';
import { useSignUpForm } from './hooks/useSignUpForm';
import { CustomWizard } from './components/CustomWizard';
import { styles } from './styles';
import { StepRenderer } from './components/StepRender';

const SignUp: React.FC = () => {
  const {
    activeIndex,
    control,
    errors,
    toastMessage,
    onActiveIndexChanged,
    getStepState,
    goToNextStep,
    goToPrevStep,
  } = useSignUpForm();

  const renderButtons = () => {
    const showPrevButton = activeIndex > 0;

    const nextButton = (
      <Button
        style={[
          SignUpStyles.button,
          SignUpStyles.nextButton,
          !showPrevButton && SignUpStyles.fullWidthButton,
        ]}
        label="입력 완료"
        onPress={goToNextStep}
      />
    );

    if (!showPrevButton) {
      return nextButton;
    }

    return (
      <>
        <Button
          style={[SignUpStyles.button, SignUpStyles.prevButton]}
          labelStyle={SignUpStyles.prevButtonLabel}
          label="이전 단계"
          onPress={goToPrevStep}
        />
        {nextButton}
      </>
    );
  };

  return (
    <View style={SignUpStyles.container}>
      <CustomWizard
        activeIndex={activeIndex}
        onActiveIndexChanged={onActiveIndexChanged}
        getStepState={getStepState}
      />
      <ScrollView contentContainerStyle={SignUpStyles.signUpViewContainer}>
        <View style={SignUpStyles.renderStepContainer}>
          <StepRenderer activeIndex={activeIndex} control={control} errors={errors} />
        </View>
      </ScrollView>
      <View style={SignUpStyles.buttonContainer}>{renderButtons()}</View>
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
    paddingHorizontal: 15,
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
  prevButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
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
});

export default SignUp;
