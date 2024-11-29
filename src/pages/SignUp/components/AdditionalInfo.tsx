import React, { useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, TextField, Picker } from 'react-native-ui-lib';
import { Controller, useWatch } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { StepProps } from '../types/signUp';
import { Banner } from '@/components/Banner';
import { ICON_IMAGE, ICON_CHECK_BOX, ICON_UN_CHECK_BOX } from '@/assets/svgs';
import useDogData from '../hooks/queries/useDogData';

const AdditionalInfo: React.FC<StepProps> = ({ control }) => {
  const hasDate = useWatch({
    control,
    name: 'hasDate',
    defaultValue: false,
  });

  const hasPrevKg = useWatch({
    control,
    name: 'hasPrevKg',
    defaultValue: false,
  });
  const hasKg = useWatch({
    control,
    name: 'hasKg',
    defaultValue: false,
  });

  const hasDiseases = useWatch({
    control,
    name: 'hasDiseases',
    defaultValue: false,
  });

  const hasAllergies = useWatch({
    control,
    name: 'hasAllergies',
    defaultValue: false,
  });

  const hasVaccinations = useWatch({
    control,
    name: 'hasVaccinations',
    defaultValue: false,
  });

  const { diseases, vaccinations, allergies } = useDogData();

  const pickImage = async (onChange: (value: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const formatDateInput = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');

    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 4)}.${numbers.slice(4)}`;
    } else {
      return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}.${numbers.slice(6, 8)}`;
    }
  };

  const validateDate = (date: string) => {
    const numbers = date.replace(/[^\d]/g, '');
    if (numbers.length !== 8) return false;

    const year = parseInt(numbers.slice(0, 4));
    const month = parseInt(numbers.slice(4, 6));
    const day = parseInt(numbers.slice(6, 8));

    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) return false;
    if (month < 1 || month > 12) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return false;

    return true;
  };

  return (
    <ScrollView style={AdditionalInfoStyles.stepContainer}>
      <Banner
        title="추가 정보는 선택해서 작성할 수 있어요"
        subtitle="반려견에 대해 더 알려주고 싶은 정보가 있나요?"
      />
      <View style={AdditionalInfoStyles.itemContainer}>
        <Text style={AdditionalInfoStyles.title}>
          프로필 사진을 등록해볼까요? <Text color="red">*</Text>
        </Text>
        <Controller
          control={control}
          name="photo_path"
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={AdditionalInfoStyles.uploadContainer}
              onPress={() => pickImage(onChange)}
            >
              {value ? (
                <Image source={{ uri: value }} style={AdditionalInfoStyles.image} />
              ) : (
                <View style={AdditionalInfoStyles.placeholderContainer}>
                  <ICON_IMAGE width={24} height={24} />
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={AdditionalInfoStyles.itemContainer}>
        <Text style={AdditionalInfoStyles.title}>
          반려견의 생일을 알려주세요 <Text color="red">*</Text>
        </Text>

        <Controller
          control={control}
          name="hasDate"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              onPress={() => onChange(!hasDate)}
              style={AdditionalInfoStyles.checkboxContainer}
            >
              {value ? (
                <ICON_CHECK_BOX
                  width={24}
                  height={24}
                  fill="white"
                  style={[AdditionalInfoStyles.checkStyle]}
                />
              ) : (
                <ICON_UN_CHECK_BOX
                  width={24}
                  height={24}
                  fill="white"
                  style={[AdditionalInfoStyles.checkStyle]}
                />
              )}
              <Text style={AdditionalInfoStyles.checkboxLabel}>생일</Text>
            </TouchableOpacity>
          )}
        />

        {hasDate && (
          <Controller
            control={control}
            name="birth_day"
            render={({ field: { onChange, value } }) => (
              <View style={AdditionalInfoStyles.dateFieldContainer}>
                <TextField
                  placeholder="YYYY.MM.DD"
                  value={value}
                  disableFullscreenUI={hasDate}
                  onChangeText={(text: string) => {
                    const formattedDate = formatDateInput(text);
                    onChange(formattedDate);
                  }}
                  maxLength={10}
                  keyboardType="numeric"
                  style={AdditionalInfoStyles.dateInput}
                  containerStyle={[
                    AdditionalInfoStyles.dateInputContainer,
                    value && !validateDate(value) && AdditionalInfoStyles.dateInputError,
                  ]}
                />
                {value && !validateDate(value) && (
                  <Text style={AdditionalInfoStyles.errorText}>올바른 날짜를 입력해주세요</Text>
                )}
              </View>
            )}
          />
        )}
      </View>
      <View style={AdditionalInfoStyles.itemContainer}>
        <Text style={AdditionalInfoStyles.title}>건강 정보를 등록해보세요</Text>
        <View style={AdditionalInfoStyles.healthContainer}>
          <Controller
            control={control}
            name="hasKg"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => onChange(!hasKg)}
                style={AdditionalInfoStyles.checkboxContainer}
              >
                {value ? (
                  <ICON_CHECK_BOX
                    width={24}
                    height={24}
                    fill="white"
                    style={[AdditionalInfoStyles.checkStyle]}
                  />
                ) : (
                  <ICON_UN_CHECK_BOX
                    width={24}
                    height={24}
                    fill="white"
                    style={[AdditionalInfoStyles.checkStyle]}
                  />
                )}
                <Text style={AdditionalInfoStyles.checkboxLabel}>현재 몸무게</Text>
              </TouchableOpacity>
            )}
          />
          {hasKg && (
            <Controller
              control={control}
              name="current_weight"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <View style={AdditionalInfoStyles.checkboxContainer}>
                  <TextField
                    value={value}
                    onChangeText={onChange}
                    fieldStyle={AdditionalInfoStyles.inputField}
                    placeholder="몸무게를 입력해주세요"
                  />
                </View>
              )}
            />
          )}
        </View>
        <View style={AdditionalInfoStyles.healthContainer}>
          <Controller
            control={control}
            name="hasPrevKg"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => onChange(!hasPrevKg)}
                style={AdditionalInfoStyles.checkboxContainer}
              >
                {value ? (
                  <ICON_CHECK_BOX
                    width={24}
                    height={24}
                    fill="white"
                    style={[AdditionalInfoStyles.checkStyle]}
                  />
                ) : (
                  <ICON_UN_CHECK_BOX
                    width={24}
                    height={24}
                    fill="white"
                    style={[AdditionalInfoStyles.checkStyle]}
                  />
                )}
                <Text style={AdditionalInfoStyles.checkboxLabel}>이전 몸무게</Text>
              </TouchableOpacity>
            )}
          />
          {hasPrevKg && (
            <Controller
              control={control}
              name="past_weight"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <View style={AdditionalInfoStyles.checkboxContainer}>
                  <TextField
                    value={value}
                    onChangeText={onChange}
                    fieldStyle={AdditionalInfoStyles.inputField}
                    placeholder="이전 몸무게를 입력해주세요"
                  />
                </View>
              )}
            />
          )}
        </View>
        <View style={AdditionalInfoStyles.healthContainer}>
          <Controller
            control={control}
            name="hasDiseases"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => onChange(!hasDiseases)}
                style={AdditionalInfoStyles.checkboxContainer}
              >
                {value ? (
                  <ICON_CHECK_BOX
                    width={24}
                    height={24}
                    fill="white"
                    style={[AdditionalInfoStyles.checkStyle]}
                  />
                ) : (
                  <ICON_UN_CHECK_BOX
                    width={24}
                    height={24}
                    fill="white"
                    style={[AdditionalInfoStyles.checkStyle]}
                  />
                )}
                <Text style={AdditionalInfoStyles.checkboxLabel}>질병 이력</Text>
              </TouchableOpacity>
            )}
          />
          {hasDiseases && (
            <Controller
              control={control}
              name="health_history"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Picker
                  placeholder="과거 또는 현재 질병 이력을 추가해주세요"
                  value={value}
                  mode={Picker.modes.MULTI}
                  enableModalBlur={false}
                  onChange={(items) => onChange(items)}
                  topBarProps={{ title: 'ABC' }}
                  showSearch
                  searchPlaceholder={'질병 정보 추가하기'}
                  items={diseases}
                  style={AdditionalInfoStyles.pickerField}
                />
              )}
            />
          )}
        </View>
        <View style={AdditionalInfoStyles.healthContainer}>
          <Controller
            control={control}
            name="hasAllergies"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <View>
                <TouchableOpacity
                  onPress={() => onChange(!hasAllergies)}
                  style={AdditionalInfoStyles.checkboxContainer}
                >
                  {value ? (
                    <ICON_CHECK_BOX
                      width={24}
                      height={24}
                      fill="white"
                      style={[AdditionalInfoStyles.checkStyle]}
                    />
                  ) : (
                    <ICON_UN_CHECK_BOX
                      width={24}
                      height={24}
                      fill="white"
                      style={[AdditionalInfoStyles.checkStyle]}
                    />
                  )}
                  <Text style={AdditionalInfoStyles.checkboxLabel}>알러지</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {hasAllergies && (
            <Controller
              control={control}
              name="allergies"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Picker
                  placeholder="검색해서 추가하기"
                  value={value}
                  mode={Picker.modes.MULTI}
                  enableModalBlur={false}
                  onChange={(items) => onChange(items as string[])}
                  topBarProps={{ title: 'ABC' }}
                  showSearch
                  searchPlaceholder={'알러지 정보를 추가하기'}
                  style={AdditionalInfoStyles.pickerField}
                  items={allergies}
                />
              )}
            />
          )}
        </View>
        <View style={AdditionalInfoStyles.healthContainer}>
          <Controller
            control={control}
            name="hasVaccinations"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <View style={AdditionalInfoStyles.checkboxContainer}>
                <TouchableOpacity
                  onPress={() => onChange(!hasVaccinations)}
                  style={AdditionalInfoStyles.checkboxContainer}
                >
                  {value ? (
                    <ICON_CHECK_BOX
                      width={24}
                      height={24}
                      fill="white"
                      style={[AdditionalInfoStyles.checkStyle]}
                    />
                  ) : (
                    <ICON_UN_CHECK_BOX
                      width={24}
                      height={24}
                      fill="white"
                      style={[AdditionalInfoStyles.checkStyle]}
                    />
                  )}
                  <Text style={AdditionalInfoStyles.checkboxLabel}>예방접종 정보</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {hasVaccinations && (
            <Controller
              control={control}
              name="vaccinations"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Picker
                  placeholder="검색해서 추가하기"
                  value={value}
                  mode={Picker.modes.MULTI}
                  enableModalBlur={false}
                  onChange={(items) => onChange(items as string[])}
                  topBarProps={{ title: 'ABC' }}
                  showSearch
                  searchPlaceholder={'예방접종 정보를 추가하기'}
                  style={AdditionalInfoStyles.pickerField}
                  items={vaccinations}
                />
              )}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const AdditionalInfoStyles = StyleSheet.create({
  stepContainer: {
    marginTop: 20,
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
    color: '#101426',
  },
  healthContainer: {
    marginBottom: 20,
  },
  uploadContainer: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    margin: 'auto',
    borderColor: '#CCCCCC',
    borderStyle: 'dashed',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#666666',
    fontSize: 14,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  checkbox: {
    marginBottom: 1,
    borderColor: '#CCCCCC',
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8F9BB3',
  },
  dateFieldContainer: {
    marginTop: 8,
  },
  dateInput: {
    height: 48,
    fontSize: 16,
  },
  dateInputContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  dateInputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  },

  checkStyle: {
    marginRight: 6,
  },
  inputField: {
    marginBottom: 20,
    paddingTop: 10,
    textDecorationLine: 'underline',
  },
  pickerField: {
    marginBottom: 20,
    paddingTop: 10,
  },

  cannotFindButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    borderColor: '#D0D5DD',
  },
  cannotFindText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AdditionalInfo;
