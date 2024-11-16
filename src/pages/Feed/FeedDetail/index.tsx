import { MainLayout } from '@/src/pages/Feed/ui';
import { FeedDetailHeader } from '@/src/widgets/PageHeaders/FeedHeader';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from '@/src/shared/ui';
import { ICON_MORE, ICON_PAW } from '@/assets/svgs';
import { Carousel } from 'react-native-ui-lib';
import { useLocalSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeyMetaData } from '@/src/pages/Feed/constants';
import { FeedPostsResponse } from '@/src/pages/Feed/types';
import { displayUploadTime } from '@/src/pages/Feed/utils';

interface Props {
  imageList?: string[];
  content?: string;
  uploadAt?: string;
}

const PostDetail = (props: Props) => {
  const { imageList = [], content = '', uploadAt = '' } = props;

  return (
    <View style={styles.postContainer}>
      <View style={styles.postTitle}>
        <View style={styles.postTitleImage}>
          <Image style={styles.image} source={require('../assets/images/dog-2.png')} />
          <Text style={styles.titleText}>{'닉네임'}</Text>
          <View style={styles.icon}>
            <ICON_MORE />
          </View>
        </View>
      </View>
      <View style={styles.imagePreviewContainer}>
        <Carousel
          pageControlProps={{ containerStyle: styles.carouselContainer }}
          pageControlPosition={'under'}
        >
          {imageList.map((url) => (
            <Image style={styles.carouselImage} source={{ uri: url }} />
          ))}
        </Carousel>
      </View>
      <View style={styles.footer}>
        <View style={styles.tab}>
          <ICON_PAW />
        </View>
        <View style={styles.like}>
          <Text style={styles.likeText}>닉네임최대8글자 님 외 312명이 이 게시글을 좋아합니다.</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.dateText}>{displayUploadTime(uploadAt)}</Text>
        </View>
      </View>
    </View>
  );
};

const FeedDetail = () => {
  const queryClient = useQueryClient();

  const cachedFeedPostsList: FeedPostsResponse[] | undefined = queryClient.getQueryData([
    queryKeyMetaData.getFeedPosts,
  ]);

  const params = useLocalSearchParams<{ data: string }>();

  const selectedIndex = Number(params.data);

  return (
    <MainLayout>
      <FeedDetailHeader />
      <ScrollView>
        <View style={styles.scrollWrapper}>
          {cachedFeedPostsList?.map((info) => (
            <PostDetail
              imageList={info.image_urls}
              content={info.content}
              uploadAt={info.uploaded_at}
            />
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default FeedDetail;

const styles = StyleSheet.create({
  scrollWrapper: {
    gap: 24,
  },
  postContainer: {
    gap: 10,

    // height 지정 안하면 맨 아래 컨텐츠 날짜가 안보임
    height: 535,
  },
  postTitle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  postTitleImage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    color: '#101426',
    fontSize: 14,
    fontWeight: 500,
  },
  icon: {
    marginLeft: 'auto',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 375,
    backgroundColor: '#EDF1F7',
    gap: 8,
  },
  carouselContainer: {
    position: 'absolute',
    left: '50%',
    //percentage 지원 x
    transform: [{ translateX: -25 }],
    bottom: 10,
  },
  footer: {
    gap: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tab: {},
  like: {},
  content: {},
  date: {},
  likeText: {
    color: '#101426',
    fontWeight: 400,
    fontSize: 12,
  },
  contentText: {
    color: '#101426',
    fontWeight: 400,
    fontSize: 12,
  },
  dateText: {
    color: '#8F9BB3',
    fontWeight: 400,
    fontSize: 11,
  },
});
