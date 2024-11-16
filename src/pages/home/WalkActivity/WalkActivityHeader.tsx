import { ICON_ARROW_LEFT, ICON_INFO_DEFAULT } from '@/assets/svgs';
import { useNavigation } from 'expo-router';
import { Pressable } from 'react-native';
import { HeaderLayout } from '../components/frame';
import { Hint, Text, View } from 'react-native-ui-lib';
import { useState } from 'react';

export const WalkActivityHeader = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
          내 활동
        </Text>

        <Hint
          visible={isVisible}
          onBackgroundPress={() => setIsVisible(false)}
          position={Hint.positions.BOTTOM}
          message={
            <Text
              style={{
                color: '#8F9BB3',
                fontSize: 15,
                fontWeight: 400,
              }}
            >
              산책한 날짜만 조회됩니다.
            </Text>
          }
          enableShadow={true}
          color="#FFFFFF"
        >
          <View>
            <ICON_INFO_DEFAULT onPress={() => setIsVisible(true)} />
          </View>
        </Hint>
      </View>
    </HeaderLayout>
  );
};
