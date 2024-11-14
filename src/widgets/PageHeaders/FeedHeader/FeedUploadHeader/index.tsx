import { Pressable, StyleSheet, Text } from 'react-native';
import {
  HeaderIconContainer,
  HeaderLayout,
  HeaderText,
  HeaderTextContainer,
} from '@/src/widgets/PageHeaders/FeedHeader/ui';
import { ICON_ARROW_LEFT } from '@/assets/svgs';
import { useNavigation, useRouter } from 'expo-router';
import { Button } from '@/src/shared/feed/ui';
import { PublicFeedEntryLink } from '@/src/shared/constants';
import { useContext } from 'react';
import { FeedUploadContext } from '@/src/pages/Feed/FeedUpload/context';

const FeedUploadHeader = () => {
  //TODO: FSD 패턴에 위배되는 import 파일 위치 수정해야함
  const { selectedImage } = useContext(FeedUploadContext);

  const navigation = useNavigation();
  const router = useRouter();

  return (
    <HeaderLayout>
      <HeaderTextContainer>
        <Pressable onPress={() => navigation.goBack()}>
          <ICON_ARROW_LEFT />
        </Pressable>
        <HeaderText>새 게시물</HeaderText>
      </HeaderTextContainer>
      <HeaderIconContainer>
        <Button
          style={styles.button}
          onPress={() => {
            router.push({
              pathname: PublicFeedEntryLink.feedUploadCreate,
              params: { data: JSON.stringify(selectedImage) },
            });
          }}
        >
          <Text>다음</Text>
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
