import React, { useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import { Hint } from 'react-native-ui-lib';

const CustomSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderWidth = useRef(0); // 슬라이더의 너비
  const elementX = useRef(0);
  const steps = 5; // 슬라이더 단계 수

  const viewRef = useRef(null);

  const handleLayout = (event: any) => {
    const { width, x } = event.nativeEvent.layout;
    sliderWidth.current = width;
    elementX.current = x;
  };

  // 각 단계별 색상 배열
  const colors = ['#8AFF9D', '#00E15E', '#2DC195', '#008A61', '#00582D'];
  const hintText = ['귀여움1', '귀여움2', '귀여움3', '귀여움4', '귀여움5'];
  const inactiveColor = '#e0e0e0'; // 아직 도달하지 않은 구간의 색상 (회색)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // const log = logger.createLogger();
        // log.info(gestureState.moveX);

        const newValue = Math.round(
          ((gestureState.moveX - elementX.current) / sliderWidth.current) * steps,
        ); // 단계에 따라 반올림
        setCurrentIndex(Math.max(0, Math.min(steps, newValue))); // 0에서 steps 사이로 값 제한
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>Value: {currentIndex}</Text>
      <View
        ref={viewRef}
        onLayout={handleLayout}
        style={styles.sliderContainer}
        {...panResponder.panHandlers}
      >
        {/* 슬라이더의 각 구간을 나누어 색상을 적용 */}
        {Array.from({ length: steps }, (_, index) => (
          <View
            key={index}
            style={[
              styles.sliderSegment,
              {
                backgroundColor: currentIndex > index ? colors[index] : inactiveColor, // 도달한 구간은 색상 적용, 나머지는 회색
                width: `${100 / steps}%`, // 각 구간의 너비
                left: `${(index / steps) * 100}%`, // 구간의 시작 위치
              },
            ]}
          />
        ))}

        {/* thumb */}
        {currentIndex > 0 ? (
          <Hint
            visible={true}
            position={Hint.positions.TOP}
            message={hintText[currentIndex - 1]}
            color={'black'}
          >
            <View style={[styles.thumb, { left: `${(currentIndex / steps) * 100}%` }]} />
          </Hint>
        ) : (
          <View style={[styles.thumb, { left: `${(currentIndex / steps) * 100}%` }]} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  sliderContainer: {
    width: 300,
    height: 40,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderSegment: {
    position: 'absolute',
    height: 12,
    borderRadius: 6,
    top: 14,
  },
  thumb: {
    position: 'absolute',
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1EB1FC',
    top: 2,
    elevation: 3,
    marginLeft: -18, // thumb의 반만큼 이동시켜 중앙에 배치
  },
});

export default CustomSlider;
