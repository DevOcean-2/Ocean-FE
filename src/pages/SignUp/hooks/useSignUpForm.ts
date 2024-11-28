import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, FormData } from '../types/signUp';

export const useSignUpForm = () => {
  const [activeIndex, setActiveIndex] = useState(1);
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
      dog_breed: '',
      dog_cuteness: 0,
      birth_day: '',
      photo_path: '',
      current_weight: 0,
      past_weight: 0,
      vaccinations: '',
      allergies: '',
    },
  });

  const dogName = useWatch({
    control,
    name: 'dog_name',
    defaultValue: '',
  });

  const isBasicInfoValid = () => {
    if (activeIndex === 1) {
      return dogName.trim().length > 0;
    }
    return true;
  };

  const goToNextStep = () => {
    if (activeIndex < 2) {
      if (isBasicInfoValid()) {
        setActiveIndex(activeIndex + 1);
      }
    } else {
      //TODO: onSubmit 함수 추가하기
      handleSubmit(onSubmit)();
      setActiveIndex(activeIndex + 1);
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
    goToNextStep,
    goToPrevStep,
    isBasicInfoValid,
  };
};
