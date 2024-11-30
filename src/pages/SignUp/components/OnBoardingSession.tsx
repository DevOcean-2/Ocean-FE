import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

import { Button } from 'react-native-ui-lib';
import { useEffect, useRef, useState } from 'react';
import onBoardingSlide from '../constant/onBoardingSlide';
import { Link } from 'expo-router';

interface OnboardingSessionProps {
  activeIndex: number;
}

const { width } = Dimensions.get('window');

const OnBoardingSession = ({ activeIndex }: OnboardingSessionProps) => {
  const [onboardingIndex, setOnboardingIndex] = useState(activeIndex);
  const CurrentIcon = onBoardingSlide[onboardingIndex - 4].icon;
  const CurrentImage = onBoardingSlide[onboardingIndex - 4].image;
  const moveAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        Animated.timing(moveAnim, {
          toValue: -1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const translateX = moveAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-7, 0, 7],
  });

  const rotate = moveAnim.interpolate({
    inputRange: [-1, -0.5, 0, 0.5, 1],
    outputRange: ['-3deg', '-1.5deg', '0deg', '1.5deg', '3deg'],
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
          <Text style={styles.title}>{onBoardingSlide[onboardingIndex - 4].title}</Text>
        </View>
        <Text style={styles.description}>{onBoardingSlide[onboardingIndex - 4].description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Animated.View
          style={{
            transform: [{ translateX }, { rotate }],
          }}
        >
          <CurrentImage />
        </Animated.View>
      </View>
      {onboardingIndex === 6 ? (
        <Link href="/(tabs)" asChild style={[styles.button, styles.lastButton]}>
          <Button label="시작하기" color="white" />
        </Link>
      ) : (
        <Button
          style={[styles.button, styles.normalButton]}
          label="다음"
          onPress={() => setOnboardingIndex(onboardingIndex + 1)}
          color="black"
        />
      )}
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
