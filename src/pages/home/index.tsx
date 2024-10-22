import { SwitchButton } from '@/components/SwitchButton';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Home } from './Home';
import { Walk } from './Walk';
import { useLocalSearchParams } from 'expo-router';

export const WalkPage = () => {
  /**
   * home, 산책하기 메뉴 이동
   */
  const { isHome } = useLocalSearchParams();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {isHome === 'true' ? <Home /> : <Walk />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
