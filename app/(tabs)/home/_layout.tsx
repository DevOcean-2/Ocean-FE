import { Stack } from 'expo-router';
import { Header } from './header';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

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
    <Stack>
      <Stack.Screen
        name={'index'}
        options={{
          headerTitle: () => <Header isHome={isHome} onToggle={onToggle} />,
        }}
      />
    </Stack>
  );
};

export default HomeStackLayout;
