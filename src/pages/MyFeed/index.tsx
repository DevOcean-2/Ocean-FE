import { StyleSheet, Text, View } from 'react-native';

const MyFeed = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text>header</Text>
      </View>
    </View>
  );
};

export default MyFeed;

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: 'red',
  },
});
