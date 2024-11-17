import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { WalkEntryLink } from '@/src/shared/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const HomeStackLayout = () => {
  const router = useRouter();
  const [isHome, setIsHome] = useState<boolean>(true);
  
  const queryClient = new QueryClient();

  useEffect(() => {
    router.setParams({ isHome: 'true' });
  }, []);

  const onToggle = () => {
    setIsHome(!isHome);
    router.setParams({ isHome: (!isHome).toString() });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: '#EDF1F7',
          },
        }}
      >
        <Stack.Screen
          name={WalkEntryLink.walkHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={WalkEntryLink.walkActivity}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={WalkEntryLink.notification}
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default HomeStackLayout;
