import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  View,
  Button,
  Wizard,
  Text,
  RadioGroup,
  RadioButton,
  TextField,
  Toast,
} from 'react-native-ui-lib';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  gender: z.enum(['여자아이', '남자아이']),
  size: z.enum(['소형견', '중형견', '대형견']),
  breed: z.string().min(1, '품종을 선택해주세요'),
  careLevel: z.number().min(1).max(3),
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedStepIndex, setCompletedStepIndex] = useState<number | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | undefined>(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      gender: '여자아이',
      size: '소형견',
      breed: '',
      careLevel: 1,
    },
  });

  const onActiveIndexChanged = (index: number) => {
    setActiveIndex(index);
  };

  const getStepState = (index: number) => {
    let state = Wizard.States.DISABLED;
    if (completedStepIndex && completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }
    return state;
  };

  const goToNextStep = () => {
    if (activeIndex < 2) {
      setActiveIndex(activeIndex + 1);
      setCompletedStepIndex(activeIndex);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const goToPrevStep = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    setToastMessage('회원가입이 완료되었습니다!');
    setTimeout(() => setToastMessage(undefined), 2000);
  };

  const renderBasicInfo = () => (
    <View style={styles.stepContainer}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextField
            placeholder="반려견의 이름을 입력해주세요"
            onChangeText={onChange}
            value={value}
            // error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <RadioGroup initialValue={value} onValueChange={onChange}>
            <RadioButton value="여자아이" label="여자아이" />
            <RadioButton value="남자아이" label="남자아이" />
          </RadioGroup>
        )}
      />
      {renderNextButton()}
    </View>
  );

  const renderDogInfo = () => (
    <View style={styles.stepContainer}>
      <Controller
        control={control}
        name="size"
        render={({ field: { onChange, value } }) => (
          <RadioGroup initialValue={value} onValueChange={onChange}>
            <RadioButton value="소형견" label="소형견" />
            <RadioButton value="중형견" label="중형견" />
            <RadioButton value="대형견" label="대형견" />
          </RadioGroup>
        )}
      />
      <Controller
        control={control}
        name="breed"
        render={({ field: { onChange, value } }) => (
          <TextField
            placeholder="품종을 선택해주세요"
            onChangeText={onChange}
            value={value}
            // error={errors.breed?.message}
          />
        )}
      />
      {renderPrevButton()}
      {renderNextButton()}
    </View>
  );

  const renderAdditionalInfo = () => (
    <View style={styles.stepContainer}>
      <Text>귀여움을 수치화 해본다면</Text>
      <Controller
        control={control}
        name="careLevel"
        render={({ field: { onChange, value } }) => (
          <RadioGroup initialValue={value} onValueChange={onChange}>
            <RadioButton value={1} label="1단계" />
            <RadioButton value={2} label="2단계" />
            <RadioButton value={3} label="3단계" />
          </RadioGroup>
        )}
      />
      {renderPrevButton()}
      {renderNextButton()}
    </View>
  );

  const renderCurrentStep = () => {
    switch (activeIndex) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderDogInfo();
      case 2:
        return renderAdditionalInfo();
      default:
        return null;
    }
  };

  const renderNextButton = () => (
    <Button label={activeIndex === 2 ? '완료' : '다음'} onPress={goToNextStep} />
  );

  const renderPrevButton = () => <Button label="이전" onPress={goToPrevStep} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Wizard activeIndex={activeIndex} onActiveIndexChanged={onActiveIndexChanged}>
        <Wizard.Step state={getStepState(0)} label="기본 정보" />
        <Wizard.Step state={getStepState(1)} label="반려견 정보" />
        <Wizard.Step state={getStepState(2)} label="추가 정보" />
      </Wizard>
      {renderCurrentStep()}
      {toastMessage && <Toast visible position="bottom" message={toastMessage} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SignUp;
