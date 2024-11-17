import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { WalkEntryLink } from '@/src/shared/constants';

const HomeStackLayout = () => {
  const router = useRouter();
  const [isHome, setIsHome] = useState<boolean>(true);

  useEffect(() => {
    router.setParams({ isHome: 'true' });
  }, []);

  const onToggle = () => {
    setIsHome(!isHome);
    router.setParams({ isHome: (!isHome).toString() });
  };

  return (
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
    </Stack>
  );
};

export default HomeStackLayout;
