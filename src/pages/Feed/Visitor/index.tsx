import { FeedVisitorHeader } from '@/src/widgets/PageHeaders';
import { MainLayout, ScrollLayout } from '@/src/pages/Feed/ui';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from '@/src/shared/ui';
import { Button } from '@/src/shared/feed/ui';

const FeedVisitor = () => {
  const dummyDataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <MainLayout>
      <FeedVisitorHeader />
      <ScrollLayout>
        <View style={styles.contentContainer}>
          {dummyDataList.map((item) => {
            return (
              <View style={styles.itemWrapper}>
                <View style={styles.profileWrapper}>
                  <Image style={styles.image} source={require('./assets/dummy.png')} />
                  <Text>유저 닉네임</Text>
                </View>
                <Button style={styles.button}>
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
