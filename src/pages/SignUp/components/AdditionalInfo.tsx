import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { StepProps } from '../types/signUp';
import { Banner } from '@/components/Banner';

const AdditionalInfo: React.FC<StepProps> = ({ control }) => {
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
});

export default AdditionalInfo;
