import { StyleSheet } from 'react-native';

export const feedHeaderStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerBackContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
