import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, FormData } from '../types/signUp';
import { WizardStepProps } from 'react-native-ui-lib';

export const useSignUpForm = () => {
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
      dog_name: '',
      dog_gender: 0,
      dog_size: 0,
      breed: '',
      careLevel: 0,
    },
  });

  const onActiveIndexChanged = (index: number) => {
    setActiveIndex(index);
  };

  const getStepState = (index: number) => {
    let state = 'DISABLED';
    if (completedStepIndex && completedStepIndex > index - 1) {
      state = 'COMPLETED';
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = 'ENABLED';
    }
    return state as WizardStepProps['state'];
  };

  const goToNextStep = () => {
    if (activeIndex < 2) {
      setActiveIndex(activeIndex + 1);
      setCompletedStepIndex(activeIndex);
    } else {
      //TODO : handleSubmit(onSubmit) 호출 후 성공하면 next로 넘어가도록 구현
      handleSubmit(onSubmit)();
      setActiveIndex(activeIndex + 1);
      setCompletedStepIndex(activeIndex);
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

  return {
    activeIndex,
    control,
    errors,
    toastMessage,
    onActiveIndexChanged,
    getStepState,
    goToNextStep,
    goToPrevStep,
  };
};
