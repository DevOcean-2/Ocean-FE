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
    <Button label={activeIndex === 2 ? '완료' : '다음'} onPress={goToNextStep} />
  );

  const renderPrevButton = () => activeIndex > 0 && <Button label="이전" onPress={goToPrevStep} />;

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
});

export default SignUp;
