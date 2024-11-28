import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, FormData } from '../types/signUp';
import { useWatch } from 'react-hook-form';

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
      photo_path: '',
      birth_day: '',
      hasDate: true,
      current_weight: 0,
      past_weight: 0,
      vaccinations: '',
      allergies: '',
    },
  });

  const dogName = useWatch({
    control,
    name: 'dog_name',
  });

  const photoPath = useWatch({
    control,
    name: 'photo_path',
  });

  const birthDay = useWatch({
    control,
    name: 'birth_day',
  });

  const isBasicInfoValid = () => {
    if (activeIndex === 1) {
      return dogName.trim().length > 0;
    }
    return true;
  };

  const isAdditionalInfoValid = () => {
    if (activeIndex === 2) {
      return photoPath.trim().length > 0 && birthDay.trim().length > 0;
    }
    return true;
  };

  const goToNextStep = () => {
    if (activeIndex === 1 && isBasicInfoValid()) {
      setActiveIndex(activeIndex + 1);
    } else if (activeIndex === 2 && isAdditionalInfoValid()) {
      handleSubmit(onSubmit)();
      setActiveIndex(activeIndex + 1);
    } else if (activeIndex !== 1 && activeIndex !== 2) {
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
    isAdditionalInfoValid,
  };
};
