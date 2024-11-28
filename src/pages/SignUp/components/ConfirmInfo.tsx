import { Banner } from '@/components/Banner';
import { Text, View, StyleSheet } from 'react-native';
import { StepProps } from '../types/signUp';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { FormData } from '../types/signUp';
import { useDogBreeds } from '../hooks/queries/useDogBreed';
import { ICON_EDIT } from '@/assets/svgs';

const ConfirmInfo: React.FC<StepProps> = ({ control }) => {
  const { data: dogBreedsData } = useDogBreeds();

  const {
    dog_name,
    dog_gender,
    dog_size,
    dog_breed,
    dog_cuteness,
    photo_path,
    birth_day,
    current_weight,
    past_weight,
    vaccinations,
    allergies,
  } = useWatch<FormData>({
    control,
  });

  const breedName = dogBreedsData?.getBreedNameById(dog_breed);

  const getGenderText = (gender: number | undefined) => {
    if (gender === undefined) return '';
    return gender === 0 ? '여자아이' : '남자아이';
  };

  const getSizeText = (size: number | undefined) => {
    if (size === undefined) return '';
    switch (size) {
      case 0:
        return '소형견';
      case 1:
        return '중형견';
      case 2:
        return '대형견';
      default:
        return '';
    }
  };

  const weightChange =
    current_weight && past_weight ? Number(current_weight) - Number(past_weight) : 0;
  const weightChangeDisplay = weightChange > 0 ? `+${weightChange}kg` : `${weightChange}kg`;

  console.log(dog_cuteness, photo_path, current_weight, past_weight, vaccinations, allergies);

  return (
    <View style={styles.container}>
      <Banner
        title="입력한 정보를 확인하는 단계입니다"
        subtitle="서비스 진입 후에도 얼마든지 변경할 수 있어요"
      />
      <Text style={styles.infoTitle}>{`반려견 ${dog_name}의 정보`}</Text>

      <View style={styles.profileSection}>
        <View style={styles.nameSection}>
          <Text
            style={styles.name}
          >{`${getGenderText(dog_gender)} | ${breedName}(${getSizeText(dog_size)})`}</Text>
          {birth_day && <Text style={styles.birthDate}>{`생일 ${birth_day}`}</Text>}
          <Text style={styles.name}>{`귀여움 ${dog_cuteness}단계`}</Text>
        </View>
      </View>

      <View style={styles.healthSection}>
        {current_weight === 0 && past_weight === 0 && !vaccinations && !allergies ? (
          <View style={styles.noInfoContainer}>
            <ICON_EDIT />
            <Text style={styles.noInfoText}>입력된 건강 정보가 없습니다.</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>건강 정보</Text>

            {current_weight && current_weight > 0 && (
              <View style={styles.weightRow}>
                <Text style={styles.weightLabel}>현재 몸무게 |</Text>
                <View style={styles.weightValue}>
                  <Text style={styles.weight}>{`${current_weight}kg`}</Text>
                  {past_weight && past_weight > 0 && (
                    <View style={styles.weightChange}>
                      <Text style={styles.weightTextChange}>{weightChangeDisplay}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {past_weight && past_weight > 0 && (
              <View style={styles.weightRow}>
                <Text style={styles.weightLabel}>이전 몸무게 |</Text>
                <Text style={styles.weight}>{`${past_weight}kg`}</Text>
              </View>
            )}

            {vaccinations && (
              <View style={styles.precautionsSection}>
                <Text style={styles.weightLabel}>예방접종 | </Text>
                <Text style={styles.precautionItem}>{vaccinations}</Text>
              </View>
            )}

            {allergies && (
              <View style={styles.allergiesSection}>
                <Text style={styles.weightLabel}>알러지 | </Text>
                <Text style={styles.allergyItem}>{allergies}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoTitle: {
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  profileSection: {
    paddingHorizontal: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    marginTop: 20,
    borderRadius: 12,
  },
  nameSection: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222B45',
    marginBottom: 10,
  },
  birthDate: {
    fontSize: 14,
    color: '#8F9BB3',
    fontWeight: '400',
    marginTop: 4,
    marginBottom: 10,
  },
  sizeInfo: {
    fontSize: 14,
    color: '#222B45',
    fontWeight: '400',
    marginTop: 4,
    marginBottom: 10,
  },
  healthSection: {
    backgroundColor: '#F7F9FC',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'flex-start',
    gap: 7,
    marginBottom: 16,
  },
  weightLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8F9BB3',
  },
  weightValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weight: {
    fontSize: 14,
    color: '#101426',
    fontWeight: '400',
  },
  weightChange: {
    fontSize: 14,
    backgroundColor: 'white',
    marginLeft: 7,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  weightTextChange: {
    color: '#2686F5',
  },
  precautionsSection: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  precautionItem: {
    fontSize: 14,
    color: '#101426',
  },
  allergiesSection: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    marginBottom: 16,
    alignItems: 'center',
  },
  allergyItem: {
    fontSize: 14,
    color: '#101426',
  },
  noInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  noInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8F9BB3',
  },
});

export default ConfirmInfo;
