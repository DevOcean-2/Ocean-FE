import React from 'react';
import { View } from 'react-native';
import { Text, RadioGroup, RadioButton } from 'react-native-ui-lib';
import { Controller } from 'react-hook-form';
import { StepProps } from '../types/signUp';
import { styles } from '../styles';

const AdditionalInfo: React.FC<StepProps> = ({ control }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.label}>귀여움을 수치화 해본다면</Text>
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
  </View>
);

export default AdditionalInfo;
