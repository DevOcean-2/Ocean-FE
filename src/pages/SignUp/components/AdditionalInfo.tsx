import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, TextField, Checkbox, Colors, Picker } from 'react-native-ui-lib';
import { Controller, useWatch } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { StepProps } from '../types/signUp';
import { Banner } from '@/components/Banner';

const options = [
  { label: '토끼', value: '토끼' },
  { label: '사과', value: '사과' },
  { label: '고양이', value: '고양이' },
  { label: '몰라', value: '몰라' },
  { label: '배고픔', value: '배고픔' },
];

const AdditionalInfo: React.FC<StepProps> = ({ control }) => {
  const [aOption, setAOption] = useState('');
  const hasDate = useWatch({
    control,
    name: 'hasDate',
    defaultValue: false,
  });

  // 체크박스가 해제되면 생일 데이터 초기화
  // useEffect(() => {
  //   if (!hasDate) {
  //     control.setValue('birthDate', '');
  //   }
  // }, [hasDate]);

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
        <Text style={AdditionalInfoStyles.title}>프로필 사진을 등록해볼까요?</Text>
        <Controller
          control={control}
          name="petImage"
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={AdditionalInfoStyles.uploadContainer}
              onPress={() => pickImage(onChange)}
            >
              {value ? (
                <Image source={{ uri: value }} style={AdditionalInfoStyles.image} />
              ) : (
                <View style={AdditionalInfoStyles.placeholderContainer}>
                  <Text style={AdditionalInfoStyles.placeholder}>반려견의 사진을 선택해주세요</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={AdditionalInfoStyles.itemContainer}>
        <Text style={AdditionalInfoStyles.title}>반려견의 생일을 알려주세요</Text>

        <Controller
          control={control}
          name="hasDate"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <View style={AdditionalInfoStyles.checkboxContainer}>
              <Checkbox
                value={value}
                onValueChange={onChange}
                label="생일"
                color="#04C755"
                labelStyle={AdditionalInfoStyles.checkboxLabel}
                style={AdditionalInfoStyles.checkbox}
              />
            </View>
          )}
        />

        {hasDate && (
          <Controller
            control={control}
            name="birthDate"
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
        <Controller
          control={control}
          name="hasKg"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <View style={AdditionalInfoStyles.checkboxContainer}>
              <Checkbox
                value={value}
                onValueChange={onChange}
                label="현재 몸무게"
                color="#04C755"
                labelStyle={AdditionalInfoStyles.checkboxLabel}
                style={AdditionalInfoStyles.checkbox}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="kg"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <View style={AdditionalInfoStyles.checkboxContainer}>
              <TextField
                value={value}
                onChangeText={onChange}
                placeholder="몸무게를 입력해주세요"
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="hasDiseases"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              value={value}
              onValueChange={onChange}
              label="질병 이력"
              color="#04C755"
              labelStyle={AdditionalInfoStyles.checkboxLabel}
              style={AdditionalInfoStyles.checkbox}
            />
          )}
        />
        <Controller
          control={control}
          name="diseases"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Picker
              placeholder="과거 또는 현재 질병 이력을 추가해주세요"
              value={aOption}
              enableModalBlur={false}
              onChange={(item) => setAOption(item as string)}
              topBarProps={{ title: 'ABC' }}
              showSearch
              searchPlaceholder={'Search a language'}
              searchStyle={{ color: Colors.blue30, placeholderTextColor: Colors.grey50 }}
              onSearchChange={(value) => console.warn('value', value)}
              items={options}
            />
          )}
        />
        <Controller
          control={control}
          name="hasAllergies"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <View style={AdditionalInfoStyles.checkboxContainer}>
              <Checkbox
                value={value}
                onValueChange={onChange}
                label="알러지"
                color="#04C755"
                labelStyle={AdditionalInfoStyles.checkboxLabel}
                style={AdditionalInfoStyles.checkbox}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="allergies"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Picker
              placeholder="검색해서 추가하기"
              value={aOption}
              enableModalBlur={false}
              onChange={(item) => setAOption(item as string)}
              topBarProps={{ title: 'ABC' }}
              showSearch
              searchPlaceholder={'Search a language'}
              searchStyle={{ color: Colors.blue30, placeholderTextColor: Colors.grey50 }}
              onSearchChange={(value) => console.warn('value', value)}
              items={options}
            />
          )}
        />
        <Controller
          control={control}
          name="hasImmunizations"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <View style={AdditionalInfoStyles.checkboxContainer}>
              <Checkbox
                value={value}
                onValueChange={onChange}
                label="예방접종 정보"
                color="#04C755"
                labelStyle={AdditionalInfoStyles.checkboxLabel}
                style={AdditionalInfoStyles.checkbox}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="immunizations"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Picker
              placeholder="검색해서 추가하기"
              value={aOption}
              enableModalBlur={false}
              onChange={(item) => setAOption(item as string)}
              topBarProps={{ title: 'ABC' }}
              showSearch
              searchPlaceholder={'Search a language'}
              searchStyle={{ color: Colors.blue30, placeholderTextColor: Colors.grey50 }}
              onSearchChange={(value) => console.warn('value', value)}
              items={options}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const AdditionalInfoStyles = StyleSheet.create({
  stepContainer: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
    marginBottom: 8,
  },

  checkbox: {
    marginBottom: 1,
    borderColor: '#CCCCCC',
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default AdditionalInfo;
