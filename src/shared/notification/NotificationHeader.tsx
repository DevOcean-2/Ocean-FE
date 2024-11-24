import { ICON_ARROW_LEFT } from '@/assets/svgs';
import { HeaderLayout } from '@/src/pages/home/components/frame';
import { useNavigation } from 'expo-router';
import { Pressable } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

export const NotificationHeader = () => {
  const navigation = useNavigation();

  return (
    <HeaderLayout headerBackgroundColor="#FFFFFF">
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginRight: 'auto',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <ICON_ARROW_LEFT />
        </Pressable>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}
        >
          알림
        </Text>
      </View>
    </HeaderLayout>
  );
};
