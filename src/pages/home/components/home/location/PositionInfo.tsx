import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { useWeather } from '../../../hooks';
import { ICON_POSITION, ICON_REFRESH } from '@/assets/svgs';
import { Card } from '../../frame';

export const PositionInfo = () => {
  const { weatherText } = useWeather();

  return (
    <Card style={styles.header}>
      <View style={styles.locationContainer}>
        <View style={styles.locationContents}>
          <ICON_POSITION />
          <Text style={styles.boldText}>강남구</Text>
          <ICON_REFRESH />
        </View>
        <Text style={styles.weatherText}>{weatherText}</Text>
      </View>
      <View>
        <Text style={styles.weatherIcon}>날씨</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 600,
  },
  locationContents: { display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' },
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
