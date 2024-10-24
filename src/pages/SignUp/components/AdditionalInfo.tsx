import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, RadioGroup, RadioButton } from 'react-native-ui-lib';
import { Controller } from 'react-hook-form';
import { StepProps } from '../types/signUp';
import { styles } from '../styles';
import { Banner } from '@/components/Banner';

const AdditionalInfo: React.FC<StepProps> = ({ control }) => {
  return (
    <ScrollView style={styles.stepContainer}>
      <Banner
        title="추가 정보는 선택해서 작성할 수 있어요"
        subtitle="반려견에 대해 더 알려주고 싶은 정보가 있나요?"
      />
      {/* <View style={styles.itemContainer}>
        <Text style={styles.title}>반려견을 어떻게 부르시나요?</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <ImageUploadField
            control={control}
            name="petImage"
            title="반려견을 어떻게 부르시나요?"
            placeholder="반려견의 사진을 선택해주세요"
          />
          )}
        />
      </View> */}
    </ScrollView>
  );
};

export default AdditionalInfo;
