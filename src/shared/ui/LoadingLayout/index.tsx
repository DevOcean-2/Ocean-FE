import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface Props {
  children: ReactNode;
  loading?: boolean;
}

const LoadingLayout = (props: Props) => {
  const { children, loading = false } = props;

  return (
    <View style={styles.container}>
      {loading && <View style={styles.loadingBackground} />}
      <ActivityIndicator style={styles.spinner} animating={loading} />
      {children}
    </View>
  );
};

export default LoadingLayout;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  loadingBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 2,
  },
});
