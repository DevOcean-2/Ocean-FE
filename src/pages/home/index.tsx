import { ScrollView, StyleSheet } from 'react-native';
import { Home } from './Home';
import { Walk } from './Walk';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const WalkPage = () => {
  /**
   * home, 산책하기 메뉴 이동
   */
  const { isHome } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {isHome === 'true' ? <Home /> : <Walk />}
      </ScrollView>
    </SafeAreaView>
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
