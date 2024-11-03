import { Text, View } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { Link, useNavigation } from 'expo-router';

const My = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>My</Text>
      <Link href={'/feed/feed-other'} asChild>
        <Button>
          <Text>go other</Text>
        </Button>
      </Link>
      <Link href={'/feed/feed-other'} asChild>
        <Button>
          <Text>go other</Text>
        </Button>
      </Link>
      <Link href={'/feed/feed-other'} asChild>
        <Button>
          <Text>go other</Text>
        </Button>
      </Link>
      <Button onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </Button>
    </View>
  );
};

export default My;
