import { FeedVisitorHeader } from '@/src/widgets/PageHeaders';
import { MainLayout, ScrollLayout } from '@/src/pages/Feed/ui';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from '@/src/shared/ui';
import { Button } from '@/src/shared/feed/ui';
import { useRouter } from 'expo-router';
import { PublicFeedEntryLink } from '@/src/shared/constants';

const FeedVisitor = () => {
  const dummyDataList = [
    { userId: 'yonghoon_test', nickName: '용훈' },
    { userId: 'yonghoon_test', nickName: '종대' },
    { userId: 'yonghoon_test', nickName: '지훈' },
    { userId: 'yonghoon_test', nickName: '가영' },
  ];

  const router = useRouter();

  // PublicFeedEntryLink.feedDetail
  return (
    <MainLayout>
      <FeedVisitorHeader />
      <ScrollLayout>
        <View style={styles.contentContainer}>
          {dummyDataList.map((item) => {
            return (
              <View key={item.nickName} style={styles.itemWrapper}>
                <View style={styles.profileWrapper}>
                  <Image style={styles.image} source={require('./assets/dummy.png')} />
                  <Text>{item.nickName}</Text>
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
    fontWeight: '500',
  },
});
