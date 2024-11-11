import { Stack } from 'expo-router';
import { FeedEntryLink } from '@/src/shared/constants';

const FeedStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={FeedEntryLink.feedHome} options={{ headerShown: false }} />
      <Stack.Screen name={FeedEntryLink.feedAlert} options={{ headerShown: false }} />
      <Stack.Screen name={FeedEntryLink.feedUpload} options={{ headerShown: false }} />
      <Stack.Screen name={FeedEntryLink.feedUploadCreate} options={{ headerShown: false }} />
      <Stack.Screen name={FeedEntryLink.feedDetail} options={{ headerShown: false }} />
      <Stack.Screen name={FeedEntryLink.feedLike} options={{ headerShown: false }} />
      <Stack.Screen name={FeedEntryLink.feedOther} options={{ headerShown: false }} />
      <Stack.Screen name={FeedEntryLink.feedUpdate} options={{ headerShown: false }} />
      <Stack.Screen name={FeedEntryLink.feedVisitor} options={{ headerShown: false }} />
    </Stack>
  );
};

export default FeedStackLayout;
