import { Stack } from 'expo-router';
import { MyEntryLink } from '@/src/shared/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const MyStackLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name={MyEntryLink.myHome} options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
};

export default MyStackLayout;
