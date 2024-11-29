import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors, Picker, Slider, Text, TextField, TouchableOpacity } from 'react-native-ui-lib';
import { Controller, useWatch } from 'react-hook-form';
import { StepProps } from '../types/signUp';
import { styles } from '../styles';
import CustomImageButton from '@/components/CustomImageButton';

import CustomButton from '@/components/CustomButton';
import renderTrack from './renderTrack';
import { Banner } from '@/components/Banner';
import { useQuery } from '@tanstack/react-query';
import { fetchDogBreeds } from '../api/dogInfoApi';
import { useDogBreeds } from '../hooks/queries/useDogBreed';

const BasicInfo: React.FC<StepProps> = ({ control }) => {
  const [isBreed, setIsBreed] = useState(true);

  const { data: dogBreedsData } = useDogBreeds();

  const breed = useWatch({
    control,
    name: 'dog_breed',
    defaultValue: '',
  });

  return (
    <ScrollView style={styles.stepContainer}>
      <Banner
        title="기본 정보는 필수입력 사항입니다."
        subtitle="서비스를 시작하기 위해 모든 정보를 입력해주세요."
      />
      <View style={styles.itemContainer}>
        <Text style={styles.title}>반려견을 어떻게 부르시나요? </Text>
        <Controller
          control={control}
          name="dog_name"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.label}>
                이름 <Text color="red">*</Text>
              </Text>
              <TextField
                fieldStyle={styles.inputField}
                placeholderTextColor="#8F9BB3"
                placeholder="내용을 입력해주세요"
                onChangeText={onChange}
                value={value}
                maxLength={30}
                showCharCounter
                charCounterStyle={{ color: '#8F9BB3' }}
              />
            </View>
          )}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>반려견의 성별은 어떻게 되나요?</Text>
        <Controller
          control={control}
          name="dog_gender"
          render={({ field: { onChange, value } }) => (
            <View style={styles.flexGroup}>
              <Text style={styles.label}>
                성별 <Text color="red">*</Text>
              </Text>
              <View style={styles.buttonContainer}>
                <CustomButton label="여자아이" onPress={() => onChange(0)} selected={value === 0} />
                <CustomButton label="남자아이" onPress={() => onChange(1)} selected={value === 1} />
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>반려견의 크기를 알려주세요</Text>
        <Controller
          control={control}
          name="dog_size"
          render={({ field: { onChange, value } }) => (
            <View style={styles.flexGroup}>
              <Text style={styles.label}>
                댕댕이 크기 <Text color="red">*</Text>
              </Text>
              <View style={styles.imageContainer}>
                <CustomImageButton
                  imageUri="small"
                  label="소형견"
                  subLabel="작고 소중해"
                  onPress={() => onChange(0)}
                  selected={value === 0}
                />
                <CustomImageButton
                  imageUri="medium"
                  label="중형견"
                  subLabel="이제 좀 무거운 애기"
                  onPress={() => onChange(1)}
                  selected={value === 1}
                />
                <CustomImageButton
                  imageUri="large"
                  label="대형견"
                  subLabel="자이언트 베이비"
                  onPress={() => onChange(2)}
                  selected={value === 2}
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
          name="dog_breed"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.label}>
                품종 <Text color="red">*</Text>
              </Text>
              {isBreed && (
                <>
                  <Picker
                    placeholder="품종을 선택해주세요"
                    placeholderTextColor="#8F9BB3"
                    value={dogBreedsData?.breedsList.filter((x) => x.id === value)[0]?.label}
                    enableModalBlur={false}
                    onChange={(item) => {
                      const selectedBreed = dogBreedsData?.breedsList.find((x) => x.label === item);
                      if (selectedBreed) {
                        onChange(selectedBreed.id);
                      }
                    }}
                    topBarProps={{
                      title: '강아지품종',
                      titleStyle: BasicInfoStyles.pickerTitle,
                    }}
                    showSearch
                    searchPlaceholder="품종을 선택해주세요"
                    items={dogBreedsData?.breedsList || []}
                    containerStyle={BasicInfoStyles.pickerContainer}
                    style={BasicInfoStyles.picker}
                  />
                  <Text style={BasicInfoStyles.orText}>또는</Text>
                </>
              )}
              {breed === '' && (
                <View>
                  <TouchableOpacity
                    style={
                      isBreed ? BasicInfoStyles.cannotFindButton : BasicInfoStyles.canFindButton
                    }
                    onPress={() => setIsBreed((prev) => !prev)}
                  >
                    <Text
                      style={isBreed ? BasicInfoStyles.cannotFindText : BasicInfoStyles.canFindText}
                    >
                      정형화 할 수 없어요
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>귀여움을 수치화하면?</Text>
        <Controller
          control={control}
          name="dog_cuteness"
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
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 8,
    backgroundColor: 'white',
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

  picker: {
    height: 48,
  },
  pickerRender: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  pickerText: {
    fontSize: 16,
    color: '#8F9BB3', // placeholder 색상
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222B45',
  },
  orText: {
    textAlign: 'center',
    color: '#8F9BB3',
    marginVertical: 16,
    fontSize: 14,
  },
  cannotFindButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    borderColor: '#D0D5DD',
  },
  cannotFindText: {
    textAlign: 'center',
    color: '#D0D5DD',
    fontSize: 16,
    fontWeight: '500',
  },
  canFindButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    borderColor: '#04C755',
    backgroundColor: '#F1FFF2',
  },
  canFindText: {
    textAlign: 'center',
    color: '#101828',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BasicInfo;
