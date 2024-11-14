import { Pressable, StyleSheet } from 'react-native';
import {
  HeaderLayout,
  HeaderText,
  HeaderTextContainer,
} from '@/src/widgets/PageHeaders/FeedHeader/ui';
import { ICON_ARROW_LEFT } from '@/assets/svgs';
import { useNavigation } from 'expo-router';

const FeedUploadCreateHeader = () => {
  const navigation = useNavigation();

  return (
    <HeaderLayout>
      <HeaderTextContainer>
        <Pressable onPress={() => navigation.goBack()}>
          <ICON_ARROW_LEFT />
        </Pressable>
        <HeaderText>새 게시물</HeaderText>
      </HeaderTextContainer>
      {/*<HeaderIconContainer>*/}
      {/*  <Button*/}
      {/*    style={styles.button}*/}
      {/*    onPress={() => {*/}
      {/*      router.push({*/}
      {/*        pathname: PublicFeedEntryLink.feedUploadCreate,*/}
      {/*        params: { data: JSON.stringify(selectedImage) },*/}
      {/*      });*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Text>다음</Text>*/}
      {/*  </Button>*/}
      {/*</HeaderIconContainer>*/}
    </HeaderLayout>
  );
};

export default FeedUploadCreateHeader;
