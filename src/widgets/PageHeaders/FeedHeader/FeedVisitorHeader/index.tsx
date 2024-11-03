import { Pressable } from 'react-native';
import {
  HeaderLayout,
  HeaderText,
  HeaderTextContainer,
} from '@/src/widgets/PageHeaders/FeedHeader/ui';
import { ICON_ARROW_LEFT } from '@/assets/svgs';
import { useNavigation } from 'expo-router';

const FeedVisitorHeader = () => {
  const navigation = useNavigation();

  return (
    <HeaderLayout>
      <HeaderTextContainer>
        <Pressable onPress={() => navigation.goBack()}>
          <ICON_ARROW_LEFT />
        </Pressable>
        <HeaderText>방문자 기록</HeaderText>
      </HeaderTextContainer>
    </HeaderLayout>
  );
};

export default FeedVisitorHeader;
