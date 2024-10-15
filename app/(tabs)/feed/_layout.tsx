import { Stack } from 'expo-router';

const FeedStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={'index'} />
      <Stack.Screen name={'feed-visitors'} />
    </Stack>
  );
};

export default FeedStackLayout;
