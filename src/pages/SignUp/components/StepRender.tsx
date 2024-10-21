// SignUp/components/StepRenderer.tsx
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import ConfirmInfo from './ConfirmInfo';

interface StepRendererProps {
  activeIndex: number;
  control: any;
  errors: FieldErrors;
}

export const StepRenderer: React.FC<StepRendererProps> = ({ activeIndex, control, errors }) => {
  switch (activeIndex) {
    case 0:
      return <BasicInfo control={control} errors={errors} />;
    case 1:
      return <AdditionalInfo control={control} errors={errors} />;
    case 2:
      return <ConfirmInfo />;
    default:
      return null;
  }
};
