import { ScrollView, StyleSheet } from 'react-native';
import { MainLayout } from './components/frame';
import { Header } from './Header';
import { Home } from './Home';
import { useHomeParameter } from './hooks';
import { Walk } from './Walk';

export const Main = () => {
  const { isHome } = useHomeParameter();

  return (
    <MainLayout header={<Header />}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {isHome ? <Home /> : <Walk />}
      </ScrollView>
    </MainLayout>
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
