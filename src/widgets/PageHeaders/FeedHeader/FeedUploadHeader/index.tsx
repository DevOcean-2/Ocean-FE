import { Pressable, StyleSheet, Text } from 'react-native';
import {
  HeaderIconContainer,
  HeaderLayout,
  HeaderText,
  HeaderTextContainer,
} from '@/src/widgets/PageHeaders/FeedHeader/ui';
import { ICON_ARROW_LEFT } from '@/assets/svgs';
import { useNavigation } from 'expo-router';
import { Button } from '@/src/shared/feed/ui';

const FeedUploadHeader = () => {
  const navigation = useNavigation();

  return (
    <HeaderLayout>
      <HeaderTextContainer>
        <Pressable onPress={() => navigation.goBack()}>
          <ICON_ARROW_LEFT />
        </Pressable>
        <HeaderText>새 게시물</HeaderText>
      </HeaderTextContainer>
      <HeaderIconContainer>
        <Button style={styles.button}>
          <Text>확인</Text>
        </Button>
      </HeaderIconContainer>
    </HeaderLayout>
  );
};

export default FeedUploadHeader;

const styles = StyleSheet.create({
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    minWidth: 60,
    height: 32,
    borderRadius: 8,
  },
  text: {
    color: '#101828',
    fontSize: 12,
    fontWeight: 500,
  },
});
