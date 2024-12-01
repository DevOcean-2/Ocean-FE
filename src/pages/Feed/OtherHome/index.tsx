import { FeedOtherHomeHeader } from '@/src/widgets/PageHeaders/FeedHeader';
import { Button } from '@/src/shared/feed/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from '@/src/shared/ui';
import TabController from '@/components/TabController';
import { MainLayout, ScrollLayout } from '@/src/pages/Feed/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { queryKeyMetaData } from '@/src/pages/Feed/constants';
import { getFeedPosts, getUserInfo, getUserVisitors } from '@/src/pages/Feed/api';
import { PublicFeedEntryLink } from '@/src/shared/constants';
import { ICON_BADGE, ICON_FIRE } from '@/assets/svgs';

const OtherHome = () => {
  const params = useLocalSearchParams<{
    visitor_id: string;
    visitor_name: string;
    visitor_image: string;
    viewed_at: string;
  }>();

  const route = useRouter();

  const { data: feedData } = useQuery({
    queryKey: [queryKeyMetaData.getOtherFeedPosts],
    queryFn: () => getFeedPosts(params.visitor_id),
  });

  const { data: userData } = useQuery({
    queryKey: [queryKeyMetaData.getOtherUserInfo],
    queryFn: () => getUserInfo(params.visitor_id),
  });

  const { data: visitorData } = useQuery({
    queryKey: [queryKeyMetaData.getOtherVisitors],
    queryFn: () => getUserVisitors(params.visitor_id),
  });

  return (
    <MainLayout>
      <FeedOtherHomeHeader userNickName={userData?.user_name} />
      <ScrollLayout>
        <View style={styles.contentContainer}>
          <View style={styles.imageContentContainer}>
            <View>
              {userData?.photo_path ? (
                <Image style={styles.image} source={{ uri: userData?.photo_path }} />
              ) : (
                <Image style={styles.image} source={require('@/assets/images/default-dog.png')} />
              )}
            </View>
            <View style={styles.imageTextContent}>
              <View style={styles.title}>
                <Text style={styles.titleText}>{userData?.dog_name}</Text>
                <Text style={styles.subTitleText}>{userData?.dog_breed}</Text>
              </View>
              <View style={styles.imageRecordContent}>
                <View style={styles.recordRow}>
                  <Text style={styles.subTitleText}>누적 산책거리</Text>
                  <Text style={styles.recordText}>000km</Text>
                </View>
                <View style={styles.recordRow}>
                  <Text style={styles.subTitleText}>최고 랭킹</Text>
                  <Text style={styles.recordText}>동네 00위</Text>
                </View>
              </View>
            </View>
            <View style={styles.visitor}>
              <View style={styles.visitorBadge}>
                {/* 다른 사람 방문자는 확인 x */}
                {/*<Link href={PublicFeedEntryLink.feedVisitor}>*/}
                <ICON_FIRE />
                <Text>{visitorData?.length}</Text>
                {/*</Link>*/}
              </View>
            </View>
          </View>
          <View style={styles.badgeContentContainer}>
            <View style={styles.badge}>
              <Text>배지</Text>
              <View style={styles.separator} />
              <ICON_BADGE />
              <ICON_BADGE />
              <ICON_BADGE />
            </View>
            <View style={styles.introduction}>
              <Text style={styles.introductionText}>
                {/*안녕하세요 저희 강아지는 10살이고, 보호소에서 데려왔어요. 제 피드 공유 많이*/}
                {/*부탁드려요.*/}
                피드 소개란
              </Text>
            </View>
          </View>
          <View style={styles.profileButton}>
            {/*<Button style={styles.button}>*/}
            {/*  <Text>프로필 편집</Text>*/}
            {/*</Button>*/}
            <Button style={styles.button}>
              <Text>프로필 공유</Text>
            </Button>
          </View>
        </View>
        <View style={styles.tabContent}>
          <TabController items={[{ label: '라인탭' }, { label: '미션 기록' }]}>
            <TabController.TabBar />
            <TabController.TabPage index={0}>
              <View style={styles.tabContentPage}>
                {feedData?.map((info, index) => {
                  return (
                    <Pressable
                      key={info.post_id}
                      style={styles.feedImageWrapper}
                      onPress={() =>
                        route.push({
                          pathname: PublicFeedEntryLink.feedDetail,
                          params: { data: index, userId: params.visitor_id },
                        })
                      }
                    >
                      <Image style={styles.feedImage} source={{ uri: info.image_urls[0] }} />
                    </Pressable>
                  );
                })}
              </View>
            </TabController.TabPage>
            <TabController.TabPage index={1}>
              <View style={styles.tabContentPage}>
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
                <View style={styles.imageDummy} />
              </View>
            </TabController.TabPage>
          </TabController>
        </View>
      </ScrollLayout>
    </MainLayout>
  );
};

export default OtherHome;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    gap: 24,
    borderBottomColor: '#E4E9F2',
    borderBottomWidth: 1,
  },
  imageContentContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  imageTextContent: {
    gap: 12,
  },
  badgeContentContainer: {
    gap: 12,
  },
  badge: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  introduction: {},
  introductionText: {
    color: '#222B45',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    gap: 4,
  },
  titleText: {
    color: '#101426',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitleText: {
    color: '#8F9BB3',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recordText: {
    color: '#101426',
    fontSize: 14,
    fontWeight: 'bold',
  },
  visitor: {
    flex: 1,
  },
  visitorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    gap: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 20,
    backgroundColor: '#CCFCE3',
  },
  imageRecordContent: {
    gap: 6,
  },
  recordRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    color: '#101426',
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  separator: {
    width: 1,
    height: 13,
    backgroundColor: '#D0D5DD',
  },
  profileButton: {
    flexDirection: 'row',
    gap: 12,
  },
  tabContent: {},
  tabContentPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    gap: 10,
  },
  imageDummy: {
    width: '31.5%',
    height: 110,
    backgroundColor: '#E4E9F2',
  },
  feedImageWrapper: {
    width: '31.5%',
    height: 110,
  },
  feedImage: {
    width: '100%',
    height: '100%',
  },
});
