import { FeedVisitorHeader } from '@/src/widgets/PageHeaders';
import { MainLayout, ScrollLayout } from '@/src/pages/Feed/ui';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from '@/src/shared/ui';
import { Button } from '@/src/shared/feed/ui';
import { useRouter } from 'expo-router';
import { PublicFeedEntryLink } from '@/src/shared/constants';
import { queryKeyMetaData, testUserId } from '@/src/pages/Feed/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserVisitorsResponse } from '@/src/pages/Feed/types';
import { visitOtherFeedHome } from '@/src/pages/Feed/api';

const FeedVisitor = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const cachedVisitorData = queryClient.getQueryData<UserVisitorsResponse[]>([
    queryKeyMetaData.getUserVisitors,
  ]);

  const visitOtherFeedMutation = useMutation({
    mutationFn: visitOtherFeedHome,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <MainLayout>
      <FeedVisitorHeader />
      <ScrollLayout>
        <View style={styles.contentContainer}>
          {cachedVisitorData?.map((item) => {
            return (
              <View key={item.visitor_id} style={styles.itemWrapper}>
                <View style={styles.profileWrapper}>
                  {item?.visitor_image ? (
                    <Image style={styles.image} source={{ uri: item?.visitor_image }} />
                  ) : (
                    <Image
                      style={styles.image}
                      source={require('@/assets/images/default-dog.png')}
                    />
                  )}
                  <Text>{item.visitor_name}</Text>
                </View>
                <Button
                  style={styles.button}
                  onPress={() => {
                    visitOtherFeedMutation.mutate(
                      {
                        feedOwnerId: item.visitor_id,
                        feedVisitorId: testUserId,
                      },
                      {
                        onSuccess: () => {
                          router.push({
                            pathname: PublicFeedEntryLink.feedOther,
                            params: { ...item },
                          });
                        },
                      },
                    );
                  }}
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
    fontWeight: '500',
  },
});
