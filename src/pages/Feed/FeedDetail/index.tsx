import { MainLayout } from '@/src/pages/Feed/ui';
import { FeedDetailHeader } from '@/src/widgets/PageHeaders/FeedHeader';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from '@/src/shared/ui';
import { ICON_MORE, ICON_PAW, ICON_PAW_FILL } from '@/assets/svgs';
import { ActionSheet, Carousel } from 'react-native-ui-lib';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeyMetaData, testUserId } from '@/src/pages/Feed/constants';
import { FeedLikeByType } from '@/src/pages/Feed/types';
import { displayUploadTime } from '@/src/pages/Feed/utils';
import { useEffect, useRef, useState } from 'react';
import { deleteFeedPost, getFeedPosts, toggleFeedLike } from '@/src/pages/Feed/api';

interface Props {
  postId: number;
  imageList?: string[];
  content?: string;
  uploadAt?: string;
  liked_by: FeedLikeByType[];
  currentFeedUserId: string;
}

const FeedLikeText = ({ liked_by }: { liked_by: FeedLikeByType[] }) => {
  if (liked_by.length === 0)
    return <Text style={styles.likeText}>첫번째 좋아요를 눌러주세요!</Text>;
  if (liked_by.length === 1)
    return (
      <>
        <Text style={styles.likeBoldText}>{liked_by[0].nickname}</Text>
        <Text style={styles.likeText}> 님이 이 게시글을 좋아합니다.</Text>
      </>
    );
  return (
    <>
      <Text style={styles.likeBoldText}>{liked_by[0].nickname}</Text>
      <Text style={styles.likeText}> 님 외 </Text>
      <Text style={styles.likeBoldText}>{liked_by.length - 1}</Text>
      <Text style={styles.likeText}>명이 게시글을 좋아합니다.</Text>
    </>
  );
};

const PostDetail = (props: Props) => {
  const queryClient = useQueryClient();

  const navigation = useNavigation();

  const {
    postId,
    imageList = [],
    content = '',
    uploadAt = '',
    liked_by = [],
    currentFeedUserId,
  } = props;

  const [actionSheet, setActionSheet] = useState<boolean>(false);

  const toggleLikeMutation = useMutation({
    mutationFn: toggleFeedLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeyMetaData.getFeedPosts] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deleteFeedPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeyMetaData.getFeedPosts] });
      navigation.goBack();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  //TODO: 내 유저 아이디랑 liked_by 리스트 비교해서 초기값 결정
  const isLike = liked_by.map((info) => info.user_id).includes(testUserId);

  return (
    <>
      <ActionSheet
        containerStyle={styles.actionSheetContainer}
        destructiveButtonIndex={2}
        useNativeIOS
        useSafeArea
        migrateDialog
        options={[
          { label: '공유 링크 복사하기', onPress: () => console.log('copy link') },
          { label: '수정', onPress: () => console.log('edit') },
          { label: '삭제', onPress: () => deletePostMutation.mutate(postId) },
        ]}
        visible={actionSheet}
        onDismiss={() => setActionSheet(false)}
      />
      <View style={styles.postContainer}>
        <View style={styles.postTitle}>
          <View style={styles.postTitleImage}>
            <Image style={styles.image} source={require('../assets/images/dog-2.png')} />
            <Text style={styles.titleText}>{'닉네임'}</Text>
            <Pressable style={styles.icon} onPress={() => setActionSheet(true)}>
              {currentFeedUserId === testUserId && <ICON_MORE />}
            </Pressable>
          </View>
        </View>
        <View style={styles.imagePreviewContainer}>
          <Carousel
            pageControlProps={{ containerStyle: styles.carouselContainer }}
            pageControlPosition={'under'}
          >
            {imageList.map((url) => (
              <Image key={url} style={styles.carouselImage} source={{ uri: url }} />
            ))}
          </Carousel>
        </View>
        <View style={styles.footer}>
          <View style={styles.tab}>
            <Pressable
              style={styles.iconWrapper}
              onPress={() => {
                console.log(`좋아요 토글 실행 ${postId}`);
                toggleLikeMutation.mutate(postId);
              }}
            >
              {isLike ? <ICON_PAW_FILL /> : <ICON_PAW />}
            </Pressable>
          </View>
          <View style={styles.like}>
            <FeedLikeText liked_by={liked_by} />
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{content}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.dateText}>{displayUploadTime(uploadAt)}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const FeedDetail = () => {
  const queryClient = useQueryClient();

  const scrollViewRef = useRef<ScrollView | null>(null);

  // 캐시된 데이터
  // const cachedFeedPostsList: FeedPostsResponse[] | undefined = queryClient.getQueryData([
  //   queryKeyMetaData.getFeedPosts,
  // ]);

  // 그냥 다시 call
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKeyMetaData.getFeedPosts],
    queryFn: () => getFeedPosts(testUserId),
  });

  const params = useLocalSearchParams<{ data: string; userId: string }>();

  const selectedIndex = Number(params.data);
  const currentFeedUserId = params.userId;

  useEffect(() => {
    setTimeout(() => {
      if (!scrollViewRef.current) return;

      if (data?.length === selectedIndex + 1) {
        scrollViewRef.current.scrollToEnd();
        return;
      }

      // Feed post height + gap
      const offsetY = selectedIndex * (535 + 24);
      scrollViewRef.current.scrollTo({ y: offsetY });
    }, 0);
  }, []);

  return (
    <MainLayout>
      <FeedDetailHeader />
      <ScrollView ref={scrollViewRef}>
        <View style={styles.scrollWrapper}>
          {data?.map((info) => (
            <PostDetail
              key={info.post_id}
              postId={info.post_id}
              imageList={info.image_urls}
              content={info.content}
              uploadAt={info.uploaded_at}
              liked_by={info.liked_by}
              currentFeedUserId={currentFeedUserId}
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
    fontWeight: '500',
  },
  iconWrapper: {
    width: 24,
    height: 24,
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
  like: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {},
  date: {},
  likeText: {
    color: '#101426',
    fontWeight: '400',
    fontSize: 12,
  },
  likeBoldText: {
    color: '#101426',
    fontWeight: '500',
    fontSize: 12,
  },
  contentText: {
    color: '#101426',
    fontWeight: '400',
    fontSize: 12,
  },
  dateText: {
    color: '#8F9BB3',
    fontWeight: '400',
    fontSize: 11,
  },
  actionSheetContainer: {},
});
