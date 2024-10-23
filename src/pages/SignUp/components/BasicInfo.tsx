import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors, Picker, Slider, Text, TextField } from 'react-native-ui-lib';
import { Controller } from 'react-hook-form';
import { StepProps } from '../types/signUp';
import { styles } from '../styles';
import CustomImageButton from '@/components/CustomImageButton';
import Info from '@/assets/svgs/info.svg';
import CustomButton from '@/components/CustomButton';

const options = [
  { label: '토끼', value: '토끼' },
  { label: '사과', value: '사과' },
  { label: '고양이', value: '고양이' },
  { label: '몰라', value: '몰라' },
  { label: '배고픔', value: '배고픔' },
];

const BasicInfo: React.FC<StepProps> = ({ control }) => {
  const [dogBreed, setDogBreed] = useState('');
  const sliderColors = ['#C8F2D7', '#84E1AE', '#41D08A', '#04C755', '#02ac49'];

  const renderTrack = (selectedValue: number) => {
    return (
      <View style={BasicInfoStyles.trackContainer}>
        {sliderColors.map((color, index) => (
          <View
            key={index}
            style={[
              BasicInfoStyles.trackSegment,
              { backgroundColor: color },
              index < selectedValue && { opacity: 1 },
              index >= selectedValue && { opacity: 0 },
            ]}
          />
        ))}
      </View>
    );
  };
  return (
    <ScrollView style={styles.stepContainer}>
      <View style={styles.bannerContainer}>
        <Info width={20} height={20} />
        <View>
          <Text style={styles.bannerTitle}>기본 정보는 필수입력 사항입니다.</Text>
          <Text style={styles.bannerSubTitle}>
            서비스를 시작하기 위해 모든 정보를 입력해주세요.
          </Text>
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
            <Picker
              placeholder="품종을 선택해주세요"
              value={dogBreed}
              enableModalBlur={false}
              onChange={(item) => setDogBreed(item as string)}
              topBarProps={{ title: '강아지품종' }}
              showSearch
              searchPlaceholder={'Search a language'}
              searchStyle={{ color: Colors.blue30, placeholderTextColor: Colors.grey50 }}
              onSearchChange={(value) => console.warn('value', value)}
              items={options}
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
            <>
              <Text style={styles.label}>
                귀여움 상태 <Text color="red">*</Text>
              </Text>
              <View style={BasicInfoStyles.sliderContainer}>
                {renderTrack(value)}
                <Slider
                  value={value}
                  onValueChange={onChange}
                  minimumValue={0}
                  maximumValue={5}
                  step={1}
                  containerStyle={BasicInfoStyles.slider}
                  thumbStyle={BasicInfoStyles.thumb}
                  activeThumbStyle={BasicInfoStyles.activeThumb}
                  thumbTintColor={Colors.white}
                  minimumTrackTintColor="transparent"
                  maximumTrackTintColor="transparent"
                />
              </View>
            </>
          )}
        />
      </View>
    </ScrollView>
  );
};

const BasicInfoStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: Colors.grey30,
    marginRight: 8,
  },
  searchIcon: {
    fontSize: 20,
    color: Colors.grey30,
  },
  validationMessage: {
    color: Colors.red30,
    fontSize: 12,
    marginTop: 4,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
  },

  trackContainer: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  trackSegment: {
    flex: 1,
    height: '100%',
  },
  slider: {
    position: 'absolute',
    width: '100%',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeThumb: {
    width: 28,
    height: 28,
  },
});

export default BasicInfo;
