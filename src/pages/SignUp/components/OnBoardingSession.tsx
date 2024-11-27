import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import {
  ICON_GALLERY,
  ICON_PIN_GREEN,
  ICON_NAVIGATE,
  FIRST_SESSION,
  SECOND_SESSION,
  THIRD_SESSION,
} from '@/assets/svgs';
import { SvgProps } from 'react-native-svg';
import { Button } from 'react-native-ui-lib';
import { useEffect, useRef, useState } from 'react';

interface OnboardingSlide {
  id: number;
  title: string;
  pageIndex: number;
  description: string;
  icon: React.FC<SvgProps>;
  image: React.FC<SvgProps>;
}

interface OnboardingSessionProps {
  activeIndex: number;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    icon: ICON_NAVIGATE,
    pageIndex: 4,
    title: '홈으로 이동합니다',
    description: '반려견과 함께 산책하면서\n산책 경로에 숨어있는 미션을 완료해보세요',
    image: FIRST_SESSION,
  },
  {
    id: 2,
    icon: ICON_PIN_GREEN,
    pageIndex: 5,
    title: '장소 메뉴에서',
    description: '반려견과 함께 갈 수 있는\n나만의 장소 리스트를 만들어보세요',
    image: SECOND_SESSION,
  },
  {
    id: 3,
    icon: ICON_GALLERY,
    pageIndex: 6,
    title: '마이피드에서',
    description: '내 반려견이 가진 귀여움을\n다른 사람들에게도 자랑해보세요',
    image: THIRD_SESSION,
  },
];

const { width } = Dimensions.get('window');

const OnBoardingSession = ({ activeIndex }: OnboardingSessionProps) => {
  const [onboardingIndex, setOnboardingIndex] = useState(activeIndex);
  const CurrentIcon = slides[onboardingIndex - 3].icon;
  const CurrentImage = slides[onboardingIndex - 3].image;
  const moveAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.sequence([
      // 오른쪽으로 이동
      Animated.timing(moveAnim, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: true,
      }),
      // 왼쪽으로 이동
      Animated.timing(moveAnim, {
        toValue: -10,
        duration: 2000,
        useNativeDriver: true,
      }),
      // 다시 원위치
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => startAnimation()); // 애니메이션 반복
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const buttonStyle = [
    styles.button,
    onboardingIndex === 6 ? styles.lastButton : styles.normalButton,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <View style={styles.titleContainer}>
          <CurrentIcon />
          <Text style={styles.title}>{slides[onboardingIndex - 3].title}</Text>
        </View>
        <Text style={styles.description}>{slides[onboardingIndex - 3].description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Animated.View
          style={{
            transform: [{ translateX: moveAnim }],
          }}
        >
          <CurrentImage />
        </Animated.View>
      </View>
      <Button
        style={buttonStyle}
        label={onboardingIndex === 6 ? '시작하기' : '다음'}
        onPress={() => setOnboardingIndex(onboardingIndex + 1)}
        color={onboardingIndex === 6 ? 'white' : 'black'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 40,
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
    fontWeight: '500',
    lineHeight: 24,
  },

  startButton: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 30,
    flex: 1,
    marginHorizontal: 20,
  },
  lastButton: {
    backgroundColor: '#04C755',
  },
  normalButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
});

export default OnBoardingSession;
