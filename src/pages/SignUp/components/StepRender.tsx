import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import ConfirmInfo from './ConfirmInfo';
import OnBoardingSession from './OnBoardingSession';
import KakaoLoginScreen from './kakakoLogin';

interface StepRendererProps {
  activeIndex: number;
  control: any;
  errors: FieldErrors;
}

export const StepRenderer: React.FC<StepRendererProps> = ({ activeIndex, control, errors }) => {
  switch (activeIndex) {
    case 0:
      return <KakaoLoginScreen />;
    case 1:
      return <BasicInfo control={control} errors={errors} />;
    case 2:
      return <AdditionalInfo control={control} errors={errors} />;
    case 3:
      return <ConfirmInfo control={control} errors={errors} />;
    case 4:
      return <OnBoardingSession activeIndex={activeIndex} />;
    default:
      return null;
  }
};
