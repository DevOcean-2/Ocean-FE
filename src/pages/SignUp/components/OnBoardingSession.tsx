import { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { atom, useAtom } from 'jotai';
import { ICON_GALLERY, ICON_PIN_GREEN, ICON_NAVIGATE,FIRST_SESSION, SECOND_SESSION, THIRD_SESSION
  } from '@/assets/svgs';
import { SvgProps } from 'react-native-svg';

// 타입 정의
interface OnboardingSlide {
  id: number;
  title: string;
  pageIndex : number;
  description: string;
  icon : React.FC<SvgProps>
  image:  React.FC<SvgProps>
}

interface OnboardingSessionProps {
  activeIndex: number;
}


const slides: OnboardingSlide[] = [
  {
    id: 1,
    icon : ICON_NAVIGATE,
    pageIndex : 3,
    title: "홈으로 이동합니다",
    description: "반려견과 함께 산책하면서\n산책 경로에 숨어있는 미션을 완료해보세요",
    image: FIRST_SESSION,
  },
  {
    id: 2,
    icon : ICON_PIN_GREEN,
    pageIndex : 4,
    title: "장소 메뉴에서",
    description: "반려견과 함께 갈 수 있는\n나만의 장소 리스트를 만들어보세요",
    image: SECOND_SESSION,
  },
  {
    id: 3,
    icon : ICON_GALLERY,
    pageIndex : 5,
    title: "마이피드에서",
    description: "내 반려견이 가진 귀여움을\n다른 사람들에게도 자랑해보세요",
    image: THIRD_SESSION,
  },
];

const { width } = Dimensions.get('window');

const OnBoardingSession = ({activeIndex} : OnboardingSessionProps) => {
  const CurrentIcon = slides[activeIndex-3].icon;
  const CurrentImage = slides[activeIndex-3].image;
  console.log(activeIndex)
  return (
    <View style={styles.container}>
      {/* 현재 슬라이드 */}
      <View style={styles.slideContainer}>
        
        <View style={styles.titleContainer}>
        <CurrentIcon/>
        <Text style={styles.title}>{ slides[activeIndex-3].title}</Text>

        </View>
        <Text style={styles.description}>{slides[activeIndex-3].description}</Text>
      </View>
      <View style={styles.imageContainer}>
      <CurrentImage/>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop  :40,
  },
  titleContainer : {
    flexDirection : "row",
    gap: 8,
  },
  imageContainer : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
  },
  slideContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom :40,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 22,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#8F9BB3',
    fontWeight : "500",
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#000',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#666',
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  primaryButtonText: {
    color: '#fff',
  },
  startButton: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoardingSession;