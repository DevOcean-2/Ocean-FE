import { StyleSheet } from 'react-native';

import { Button, Text, View } from 'react-native-ui-lib';

const Home = () => {
  return (
    <View flex padding-page>
      <Text heading>Welcome to My App</Text>
      <Button label="Press me" onPress={() => console.log('Button pressed')} />
    </View>
  );
};

export default Home;

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
