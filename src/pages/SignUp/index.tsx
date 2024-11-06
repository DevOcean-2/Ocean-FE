// SignUp/index.tsx
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

  const renderNextButton = () => (
    <Button style={SignUpStyles.nextButton} label="입력 완료" onPress={goToNextStep} />
  );

  const renderPrevButton = () =>
    activeIndex > 0 && (
      <Button style={SignUpStyles.nextButton} label="이전 단계" onPress={goToPrevStep} />
    );

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
      <View style={SignUpStyles.buttonContainer}>
        {renderPrevButton()}
        {renderNextButton()}
      </View>
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

  prevButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 24,
    backgroundColor: '#ffffff',
    color: 'black',
    borderRadius: 10,
    marginBottom: 30,
  },
  nextButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 24,
    backgroundColor: '#04C755',
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
});

export default SignUp;
