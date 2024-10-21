import React from 'react';
import { ScrollView, View } from 'react-native';
import { Incubator, Slider, Text, TextField } from 'react-native-ui-lib';
import { Controller } from 'react-hook-form';
import { StepProps } from '../../types/signUp';
import { styles } from '../../styles';
import CustomImageButton from '@/components/CustomImageButton';
import Info from '@/assets/svgs/info.svg';
import CustomButton from '@/components/CustomButton';

const BasicInfo: React.FC<StepProps> = ({ control }) => (
  <ScrollView style={styles.stepContainer}>
    <View style={styles.bannerContainer}>
      <Info width={20} height={20} />
      <View>
        <Text style={styles.bannerTitle}>기본 정보는 필수입력 사항입니다.</Text>
        <Text style={styles.bannerSubTitle}>서비스를 시작하기 위해 모든 정보를 입력해주세요.</Text>
      </View>
    </View>
    <View style={styles.itemContainer}>
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
    </View>
    <View style={styles.itemContainer}>
      <Text style={styles.title}>반려견의 성별은 어떻게 되나요?</Text>
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <View style={styles.flexGroup}>
            <Text style={styles.label}>
              성별 <Text color="red">*</Text>
            </Text>
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
    </View>
    <View style={styles.itemContainer}>
      <Text style={styles.title}>반려견의 크기를 알려주세요</Text>
      <Controller
        control={control}
        name="size"
        render={({ field: { onChange, value } }) => (
          <View style={styles.flexGroup}>
            <Text style={styles.label}>댕댕이 크기</Text>
            <View style={styles.flexGroup}>
              <CustomImageButton
                imageUri="small"
                label="소형견"
                subLabel="작고 소중해"
                onPress={() => onChange('소형견')}
                selected={value === '소형견'}
              />
              <CustomImageButton
                imageUri="medium"
                label="중형견"
                subLabel="이제 좀 무거운 애기"
                onPress={() => onChange('중형견')}
                selected={value === '중형견'}
              />
              <CustomImageButton
                imageUri="large"
                label="대형견"
                subLabel="자이언트 베이비"
                onPress={() => onChange('대형견')}
                selected={value === '대형견'}
              />
            </View>
          </View>
        )}
      />
    </View>
    <View style={styles.itemContainer}>
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
    </View>
    <View style={styles.itemContainer}>
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
  </ScrollView>
);

export default BasicInfo;
