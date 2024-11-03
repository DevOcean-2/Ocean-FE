import { Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { ICON_ARROW_LEFT } from '@/assets/svgs';
import {
  HeaderLayout,
  HeaderText,
  HeaderTextContainer,
} from '@/src/widgets/PageHeaders/FeedHeader/ui';

const FeedAlertHeader = () => {
  const navigation = useNavigation();

  return (
    <HeaderLayout>
      <HeaderTextContainer>
        <Pressable onPress={() => navigation.goBack()}>
          <ICON_ARROW_LEFT />
        </Pressable>
        <HeaderText>알림</HeaderText>
      </HeaderTextContainer>
    </HeaderLayout>
  );
};

export default FeedAlertHeader;
