import { StyleSheet, View } from 'react-native';

const renderTrack = (selectedValue: number) => {
  const sliderColors = ['#C8F2D7', '#84E1AE', '#41D08A', '#04C755', '#02ac49'];

  return (
    <View style={RenderTrackStyles.trackContainer}>
      {sliderColors.map((color, index) => (
        <View
          key={index}
          style={[
            RenderTrackStyles.trackSegment,
            { backgroundColor: color },
            index < selectedValue && { opacity: 1 },
            index >= selectedValue && { opacity: 0 },
          ]}
        />
      ))}
    </View>
  );
};

const RenderTrackStyles = StyleSheet.create({
  trackContainer: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  trackSegment: {
    flex: 1,
    height: '100%',
  },
});

export default renderTrack;
