import { ScrollView, StyleSheet } from 'react-native';
import { Home } from './Home';
import { Walk } from './Walk';
import { useLocalSearchParams } from 'expo-router';

export const WalkPage = () => {
  /**
   * home, 산책하기 메뉴 이동
   */
  const { isHome } = useLocalSearchParams();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {isHome === 'true' ? <Home /> : <Walk />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    flex: 1,
  },
});
