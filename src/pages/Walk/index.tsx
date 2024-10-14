import { SwitchButton } from '@/components/SwitchButton';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Home } from './Home';
import { Walk } from './Walk';

export const WalkPage = () => {
  /**
   * home, 산책하기 메뉴 이동
   */
  const [isHome, setIsHome] = useState<boolean>(true);

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
      <View
        style={{
          display: 'flex',
          width: '100%',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SwitchButton
          isMain={isHome}
          mainLabel="홈"
          subLabel="산책하기"
          toggle={() => setIsHome((prev) => !prev)}
        />
      </View>

      {isHome ? <Home /> : <Walk />}
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
