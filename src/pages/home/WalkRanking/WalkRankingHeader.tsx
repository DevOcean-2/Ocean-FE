import { View, Text } from 'react-native-ui-lib';
import { HeaderLayout } from '../components/frame';
import { ICON_ARROW_LEFT } from '@/assets/svgs';
import { Pressable } from 'react-native';
import { useNavigation } from 'expo-router';

export const WalkRankingHeader = () => {
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
            fontWeight: 600,
          }}
        >
          산책 랭킹
        </Text>
      </View>
    </HeaderLayout>
  );
};
