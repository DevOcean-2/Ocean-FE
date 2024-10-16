import React from 'react';
import { View } from 'react-native';
import { Incubator, Slider, Text, TextField } from 'react-native-ui-lib';
import { Controller } from 'react-hook-form';
import { StepProps } from '../../types/signUp';
import { styles } from '../../styles';
import CustomButton from '@/components/CustomButton';

const BasicInfo: React.FC<StepProps> = ({ control }) => (
  <View style={styles.stepContainer}>
    <Text style={styles.title}>반려견을 어떻게 부르시나요?</Text>
    <Controller
      control={control}
      name="name"
      render={({ field: { onChange, value } }) => (
        <TextField
          label="이름"
          style={styles.inputField}
          placeholder="반려견의 이름을 입력해주세요"
          onChangeText={onChange}
          value={value}
        />
      )}
    />

    <Text style={styles.title}>반려견의 성별은 어떻게 되나요?</Text>
    <Controller
      control={control}
      name="gender"
      render={({ field: { onChange, value } }) => (
        <View style={styles.flexGroup}>
          <Text style={styles.label}>성별</Text>
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
        </View>
      )}
    />
    <Text style={styles.title}>반려견의 크기를 알려주세요</Text>
    <Controller
      control={control}
      name="size"
      render={({ field: { onChange, value } }) => (
        <View style={styles.flexGroup}>
          <Text style={styles.label}>댕댕이 크기</Text>
          <View style={styles.flexGroup}>
            <CustomButton
              label="소형견"
              onPress={() => onChange('소형견')}
              selected={value === '소형견'}
            />
            <CustomButton
              label="중형견"
              onPress={() => onChange('중형견')}
              selected={value === '중형견'}
            />
            <CustomButton
              label="대형견"
              onPress={() => onChange('대형견')}
              selected={value === '대형견'}
            />
          </View>
        </View>
      )}
    />
    <Text style={styles.title}>어떤 종류의 댕댕이인가요?</Text>
    <Controller
      control={control}
      name="breed"
      render={({ field: { onChange, value } }) => (
        <TextField
          label="품종"
          style={styles.inputField}
          placeholder="반려견의 이름을 입력해주세요"
          onChangeText={onChange}
          value={value}
        />
      )}
    />
    <Text style={styles.title}>귀여움을 수치화하면?</Text>
    <Controller
      control={control}
      name="cute"
      render={({ field: { onChange, value } }) => (
        <Incubator.Slider
          //style={styles.inputField}
          minimumValue={0}
          maximumValue={10}
          value={value}
          onValueChange={onChange}
        />
      )}
    />
  </View>
);

export default BasicInfo;
