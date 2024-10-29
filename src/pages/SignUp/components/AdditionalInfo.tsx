import React, { useEffect } from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, TextField, Checkbox } from 'react-native-ui-lib';
import { Controller, useWatch } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { StepProps } from '../types/signUp';
import { Banner } from '@/components/Banner';

const AdditionalInfo: React.FC<StepProps> = ({ control }) => {
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
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
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
