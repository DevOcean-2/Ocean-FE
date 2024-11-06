import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-ui-lib';

const FeedUpdate = () => {
  return (
    <View>
      <Text>Feed 수정 페이지</Text>

      <Link href={'/feed/feed-other'} asChild>
        <Button>
          <Text>go other</Text>
        </Button>
      </Link>
    </View>
  );
};

export default FeedUpdate;
