import React from 'react';
import { View } from 'react-native';
import { Text, TextField } from 'react-native-ui-lib';
import { Controller } from 'react-hook-form';
import { StepProps } from '../../types/signUp';
import { styles } from '../../styles';
import CustomButton from '@/components/CustomButton';

const BasicInfo: React.FC<StepProps> = ({ control }) => (
  <View style={styles.stepContainer}>
    <Text>반려견을 어떻게 부르시나요?</Text>
    <Controller
      control={control}
      name="name"
      render={({ field: { onChange, value } }) => (
        <TextField
          label="이름"
          placeholder="반려견의 이름을 입력해주세요"
          onChangeText={onChange}
          value={value}
        />
      )}
    />

    <Text style={styles.label}>반려견의 성별은 어떻게 되나요?</Text>
    <Controller
      control={control}
      name="gender"
      render={({ field: { onChange, value } }) => (
        <View style={styles.buttonContainer}>
          <CustomButton
            label="여자아이"
            onPress={() => onChange('여자아이')}
            selected={value === '여자아이'}
          />
          <CustomButton
            label="남자아이"
            onPress={() => onChange('남자아이')}
            selected={value === '남자아이'}
          />
        </View>
      )}
    />
  </View>
);

export default BasicInfo;
