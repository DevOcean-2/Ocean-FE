import { Banner } from '@/components/Banner';
import { Text, View, StyleSheet, ImageStyle } from 'react-native';
import { StepProps } from '../types/signUp';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { FormData } from '../types/signUp';
import { useDogBreeds } from '../hooks/queries/useDogBreed';
import { ICON_EDIT } from '@/assets/svgs';
import useDogData from '../hooks/queries/useDogData';
import calculateAge from '../utils/calculateAge';
import formatGenderText from '../utils/formatGenderText';
import formatSizeText from '../utils/formatSizeText';
import formatCutnessText from '../utils/formatCutnessText';
import formatArrayName from '../utils/formatArrayName';
import { Image } from '@/src/shared/ui';

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
    health_history,
    vaccinations,
    allergies,
  } = useWatch<FormData>({
    control,
  });

  const breedName = dogBreedsData?.getBreedNameById(dog_breed);
  const {
    diseases: diseaseList,
    vaccinations: vaccinationList,
    allergies: allergyList,
  } = useDogData();

  const weightChange =
    current_weight && past_weight ? Number(current_weight) - Number(past_weight) : 0;
  const weightChangeDisplay = weightChange > 0 ? `+${weightChange}kg` : `${weightChange}kg`;

  const hasHealthData =
    current_weight !== 0 ||
    past_weight !== 0 ||
    (health_history && health_history.length > 0) ||
    (vaccinations && vaccinations.length > 0) ||
    (allergies && allergies.length > 0);

  return (
    <View style={styles.container}>
      <Banner
        title="입력한 정보를 확인하는 단계입니다"
        subtitle="서비스 진입 후에도 얼마든지 변경할 수 있어요"
      />
      <Text style={styles.infoTitle}>{`반려견 ${dog_name}의 정보`}</Text>

      <View style={styles.profileSection}>
        {photo_path && <Image source={{ uri: photo_path }} style={styles.image} />}
        <View style={styles.nameSection}>
          <Text
            style={styles.name}
          >{`${formatGenderText(dog_gender)} | ${breedName}(${formatSizeText(dog_size)})`}</Text>
          {birth_day && (
            <View style={styles.birthInfo}>
              <Text style={styles.birthDate}>{`생일 ${birth_day}`}</Text>
              <Text style={styles.ageText}>{`(${calculateAge(birth_day)})`}</Text>
            </View>
          )}
          <Text
            style={styles.name}
          >{`귀여움 ${dog_cuteness}단계 | ${formatCutnessText(dog_cuteness)}`}</Text>
        </View>
      </View>
      {hasHealthData && (
        <View style={styles.healthSection}>
          <Text style={styles.sectionTitle}>건강 정보</Text>

          {current_weight !== 0 && (
            <View style={styles.weightRow}>
              <Text style={styles.weightLabel}>현재 몸무게 |</Text>
              <View style={styles.weightValue}>
                <Text style={styles.weight}>{`${current_weight}kg`}</Text>
                {past_weight !== 0 && (
                  <View style={styles.weightChange}>
                    <Text style={styles.weightTextChange}>{weightChangeDisplay}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {past_weight !== 0 && (
            <View style={styles.weightRow}>
              <Text style={styles.weightLabel}>이전 몸무게 |</Text>
              <Text style={styles.weight}>{`${past_weight}kg`}</Text>
            </View>
          )}

          {health_history && health_history.length > 0 && (
            <View style={styles.precautionsSection}>
              <Text style={styles.weightLabel}>질병 정보 | </Text>
              <Text style={styles.precautionItem}>
                {formatArrayName(health_history, diseaseList)}
              </Text>
            </View>
          )}

          {vaccinations && vaccinations.length > 0 && (
            <View style={styles.precautionsSection}>
              <Text style={styles.weightLabel}>예방접종 | </Text>
              <Text style={styles.precautionItem}>
                {formatArrayName(vaccinations, vaccinationList)}
              </Text>
            </View>
          )}

          {allergies && allergies.length > 0 && (
            <View style={styles.precautionsSection}>
              <Text style={styles.weightLabel}>알러지 | </Text>
              <Text style={styles.precautionItem}>{formatArrayName(allergies, allergyList)}</Text>
            </View>
          )}
        </View>
      )}
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginTop: 20,
  } as ImageStyle,

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
    paddingVertical: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222B45',
    marginBottom: 10,
  },
  birthInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 4,
  },
  birthDate: {
    fontSize: 14,
    color: '#8F9BB3',
    fontWeight: '400',
  },
  ageText: {
    fontSize: 14,
    color: '#8F9BB3',
    fontWeight: '500',
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
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  weightTextChange: {
    color: '#2686F5',
  },
  precautionsSection: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginBottom: 16,
    gap: 4,
  },
  precautionItem: {
    fontSize: 14,
    flex: 1,
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
