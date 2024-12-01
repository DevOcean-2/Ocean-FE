import { FeedVisitorHeader } from '@/src/widgets/PageHeaders';
import { MainLayout, ScrollLayout } from '@/src/pages/Feed/ui';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from '@/src/shared/ui';
import { Button } from '@/src/shared/feed/ui';
import { useRouter } from 'expo-router';
import { PublicFeedEntryLink } from '@/src/shared/constants';
import { queryKeyMetaData } from '@/src/pages/Feed/constants';
import { useQueryClient } from '@tanstack/react-query';
import { UserVisitorsResponse } from '@/src/pages/Feed/types';

const FeedVisitor = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const cachedVisitorData = queryClient.getQueryData<UserVisitorsResponse[]>([
    queryKeyMetaData.getUserVisitors,
  ]);

  // useEffect(() => {
  //   console.log(cachedVisitorData);
  // }, [cachedVisitorData]);

  return (
    <MainLayout>
      <FeedVisitorHeader />
      <ScrollLayout>
        <View style={styles.contentContainer}>
          {cachedVisitorData?.map((item) => {
            return (
              <View key={item.visitor_id} style={styles.itemWrapper}>
                <View style={styles.profileWrapper}>
                  <Image style={styles.image} source={require('./assets/dummy.png')} />
                  <Text>{item.visitor_name}</Text>
                </View>
                <Button
                  style={styles.button}
                  onPress={() =>
                    router.push({
                      pathname: PublicFeedEntryLink.feedOther,
                      params: { ...item },
                    })
                  }
                >
                  <Text>방문하기</Text>
                </Button>
              </View>
            );
          })}
        </View>
      </ScrollLayout>
    </MainLayout>
  );
};

export default FeedVisitor;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 12,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  button: {
    height: 24,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 'auto',
    borderRadius: 6,
  },
  text: {
    color: '#101426',
    fontSize: 11,
    fontWeight: 500,
  },
});
