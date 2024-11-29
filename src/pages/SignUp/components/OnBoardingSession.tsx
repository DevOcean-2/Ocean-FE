import { View, Text, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

import { Button } from 'react-native-ui-lib';
import { useEffect, useRef, useState } from 'react';
import onBoardingSlide from '../constant/onBoardingSlide';

interface OnboardingSessionProps {
  activeIndex: number;
}

const { width } = Dimensions.get('window');

const OnBoardingSession = ({ activeIndex }: OnboardingSessionProps) => {
  const [onboardingIndex, setOnboardingIndex] = useState(activeIndex);
  const CurrentIcon = onBoardingSlide[onboardingIndex - 3].icon;
  const CurrentImage = onBoardingSlide[onboardingIndex - 3].image;
  const moveAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        // 오른쪽으로 이동
        Animated.timing(moveAnim, {
          toValue: 5,
          duration: 1000,
          useNativeDriver: true,
        }),
        // 왼쪽으로 이동
        Animated.timing(moveAnim, {
          toValue: -5,
          duration: 1000,
          useNativeDriver: true,
        }),
        // 중앙으로 이동
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const rotate = moveAnim.interpolate({
    inputRange: [-5, 0, 5],
    outputRange: ['-2deg', '0deg', '2deg'],
  });

  const buttonStyle = [
    styles.button,
    onboardingIndex === 6 ? styles.lastButton : styles.normalButton,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <View style={styles.titleContainer}>
          <CurrentIcon />
          <Text style={styles.title}>{onBoardingSlide[onboardingIndex - 3].title}</Text>
        </View>
        <Text style={styles.description}>{onBoardingSlide[onboardingIndex - 3].description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Animated.View
          style={{
            transform: [{ translateX: moveAnim }, { rotate: rotate }],
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
