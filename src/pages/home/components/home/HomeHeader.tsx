import React from 'react';
import { View, Text, Picker } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { usePositionHistory, useWeather } from '../../hooks';

export const HomeHeader = () => {
  const { currentPosition, positionHistory, setCurrentPosition } = usePositionHistory();
  const { weatherText } = useWeather();

  return (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <Picker
          value={currentPosition}
          fieldType="filter"
          style={styles.picker}
          placeholder="위치 설정"
          items={positionHistory}
          onChange={(newValue) => {
            if (typeof newValue === 'string') setCurrentPosition(newValue);
          }}
        />
        <Text style={styles.weatherText}>{weatherText}</Text>
      </View>
      <View>
        <Text style={styles.weatherIcon}>날씨</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    gap: 6,
  },
  picker: {
    fontSize: 16,
    color: '#20303C',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  weatherText: {
    fontSize: 14,
    color: '#8F9BB3',
    fontWeight: '400',
    lineHeight: 19.6,
  },
  weatherIcon: {
    width: 42,
    height: 42,
    borderRadius: 100,
    color: 'white',
    backgroundColor: '#A1AEC8',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
});
