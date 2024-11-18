import { Banner } from '@/components/Banner';
import { Text, View, Image, StyleSheet } from 'react-native';
import { StepProps } from '../types/signUp';
import React from 'react';
import { useWatch } from 'react-hook-form';

const ConfirmInfo: React.FC<StepProps> = ({ control }) => {
  const petInfo = {
    name: '두팔이',
    gender: '남자아이',
    nickname: '시바견 (종령견)',
    birthDate: 'YY.MM.DD (00세)',
    earType: '귀여움 3단계',
    earLocation: '지역구 입살하는 귀여움',
    currentWeight: '24kg',
    weightChange: '-2kg',
    previousWeight: '26kg',
    precautions: ['심장사상충', '예방접종타이틀'],
    allergies: ['알러지 txt', '알러지 txt', '알러지 txt'],
  };

  type FormValues = {
    name: string;
    gender: string;
    size: string;
    breed: string;
    careLevel: string;
    petImage: string;
    birthDate: string;
    kg: string;
    prevKg: string;
    diseases: string[];
    allergies: string[];
  };

  const {
    kg,
    prevKg,
    name,
    gender,
    size,
    breed,
    careLevel,
    petImage,
    birthDate,
    diseases,
    allergies,
  } = useWatch<FormValues>({ control });

  const weightChange = Number(kg) - Number(prevKg);
  const weightChangeDisplay = weightChange > 0 ? `+${weightChange}kg` : `${weightChange}kg`;

  return (
    <View style={styles.container}>
      <Banner
        title="입력한 정보를 확인하는 단계입니다"
        subtitle="서비스 진입 후에도 얼마든지 변경할 수 있어요"
      />
      <Text style={styles.infoTitle}>{`반려견 ${name}의 정보`}</Text>

      <View style={styles.profileSection}>
        <View style={styles.nameSection}>
          <Text style={styles.name}>{`${gender} | ${breed}`}</Text>
          <Text style={styles.birthDate}>{`생일 ${birthDate}`}</Text>
          <Text style={styles.earInfo}>
            {careLevel} | {careLevel}
          </Text>
        </View>
      </View>

      <View style={styles.healthSection}>
        <Text style={styles.sectionTitle}>건강 정보</Text>

        <View style={styles.weightRow}>
          <Text style={styles.weightLabel}>현재 몸무게 |</Text>
          <View style={styles.weightValue}>
            <Text style={styles.weight}>{petInfo.currentWeight}</Text>
            <View style={styles.weightChange}>
              <Text style={styles.weightTextChange}> {weightChange}</Text>
            </View>
          </View>
        </View>

        <View style={styles.weightRow}>
          <Text style={styles.weightLabel}>이전 몸무게 |</Text>
          <Text style={styles.weight}>{petInfo.previousWeight}</Text>
        </View>

        {/* <View style={styles.precautionsSection}>
          <Text style={styles.weightLabel}>예방접종 | </Text>
          {diseases?.map((item, index) => (
            <Text key={index} style={styles.precautionItem}>
              {item}
              {index < petInfo.precautions.length - 1 ? ', ' : ''}
            </Text>
          ))}
        </View>

        <View style={styles.allergiesSection}>
          <Text style={styles.weightLabel}>알러지 | </Text>
          {allergies?.map((allergy, index) => (
            <Text key={index} style={styles.allergyItem}>
              {allergy}
              {index < petInfo.allergies.length - 1 ? ', ' : ''}
            </Text>
          ))}
        </View> */}
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameSection: {
    alignItems: 'center',
    marginTop: 16,
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
  earInfo: {
    fontSize: 14,
    color: '#222B45',
    fontWeight: '400',
    marginTop: 4,
    marginBottom: 10,
  },
  healthSection: {
    backgroundColor: '#F7F9FC',
    marginTop: 20,
    paddingHorizontal: 20,
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
});

export default ConfirmInfo;
