import React from 'react';
import { ScrollView } from 'react-native';
import { View, Button, Wizard, Toast } from 'react-native-ui-lib';
import { useSignUpForm } from './hooks/useSignUpForm';
import BasicInfo from './components/BasicInfo';
import AdditionalInfo from './components/AdditionalInfo';
import { styles } from './styles';

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

  const renderCurrentStep = () => {
    switch (activeIndex) {
      case 0:
        return <BasicInfo control={control} errors={errors} />;
      case 1:
        return <AdditionalInfo control={control} errors={errors} />;
      // case 2:
      //   return <AdditionalInfo control={control} errors={errors} />;
      default:
        return null;
    }
  };

  const renderNextButton = () => (
    <Button label={activeIndex === 2 ? '완료' : '다음'} onPress={goToNextStep} />
  );

  const renderPrevButton = () => activeIndex > 0 && <Button label="이전" onPress={goToPrevStep} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Wizard
        activeIndex={activeIndex}
        containerStyle={{
          backgroundColor: 'transparent',
          width: '100%',
        }}
        onActiveIndexChanged={onActiveIndexChanged}
      >
        <Wizard.Step
          state={getStepState(0)}
          label="기본 정보"
          indexLabelStyle={{ color: 'white', borderColor: 'white' }}
          labelStyle={{ fontWeight: '600', fontSize: 14, color: '#101828' }}
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
      <View style={styles.renderStepContainer}>{renderCurrentStep()}</View>
      <View>
        {renderPrevButton()}
        {renderNextButton()}
      </View>
      {toastMessage && <Toast visible position="bottom" message={toastMessage} />}
    </ScrollView>
  );
};

export default SignUp;
