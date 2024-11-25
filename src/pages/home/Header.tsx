import { SwitchButton } from '@/components/SwitchButton';
import { ICON_BELL, ICON_BELL_ALERT } from '@/assets/svgs';
import { View, TouchableOpacity } from 'react-native-ui-lib';
import { HeaderLayout } from './components/frame';
import { useHomeParameter } from './hooks';
import { useRouter } from 'expo-router';
import { PublicWalkEntryLink } from '@/src/shared/constants';
import { useNotifications } from '@/src/shared/notification/hooks/useNotifications';
import { useEffect } from 'react';

export const Header = () => {
  const { notifications, refetch } = useNotifications();
  const hasNotification = notifications.length > 0;
  const { changeMenu, isHome } = useHomeParameter();

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <HeaderLayout>
      <View style={{ marginRight: 'auto' }}>
        <SwitchButton isMain={isHome} mainLabel="홈" subLabel="산책하기" toggle={changeMenu} />
      </View>
      <TouchableOpacity onPress={() => router.push(PublicWalkEntryLink.notification)}>
        <View style={{ marginLeft: 'auto' }}>
          {hasNotification ? <ICON_BELL_ALERT /> : <ICON_BELL />}
        </View>
      </TouchableOpacity>
    </HeaderLayout>
  );
};
