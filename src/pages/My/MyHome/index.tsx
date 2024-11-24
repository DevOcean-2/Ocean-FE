import { Button, Image, MainLayout, ScrollLayout } from '@/src/shared/ui';
import { MyHomeHeader } from '@/src/widgets/PageHeaders/MyHeader';
import { StyleSheet, Text, View } from 'react-native';

const MyHome = () => {
  return (
    <MainLayout>
      <MyHomeHeader />
      <View style={styles.contentContainer}>
        <View style={styles.myInfoContainer}>
          <View style={styles.myImageContentArea}>
            <Image style={styles.image} source={require('./assets/dog.png')} />
            <Button>
              <Text style={styles.imageText}>사진 변경</Text>
            </Button>
          </View>
          <View style={styles.myInfoTextContentArea}>
            <View style={styles.myInfoTextContent}>
              <Text style={styles.myInfoText}>사용자 이름</Text>
              <Text style={styles.myInfoText}>박주영</Text>
            </View>
            <View style={styles.myInfoTextContent}>
              <Text style={styles.myInfoText}>생년월일</Text>
              <Text style={styles.myInfoText}>1997.10.21</Text>
            </View>
            <View style={styles.myInfoTextContent}>
              <Text style={styles.myInfoText}>이메일</Text>
              <Text style={styles.myInfoText}>AWEF@naver.com</Text>
            </View>
          </View>
        </View>
        <View style={styles.myEditButtonContainer}>
          <Button>
            <Text style={styles.editButtonText}>강아지 정보 편집</Text>
          </Button>
        </View>
        <View style={styles.myDogInfoContainer}>
          <ScrollLayout>
            <View style={styles.myDogInfoTextContentArea}>
              <View style={styles.myDogInfoTextContent}>
                <Text style={styles.myDogInfoText}>댕댕이 이름</Text>
                <Text style={styles.myDogInfoText}>쫑아</Text>
              </View>
              <View style={styles.myDogInfoTextContent}>
                <Text style={styles.myDogInfoText}>댕댕이 이름</Text>
                <Text style={styles.myDogInfoText}>쫑아</Text>
              </View>
            </View>
          </ScrollLayout>
        </View>
      </View>
    </MainLayout>
  );
};

export default MyHome;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  myInfoContainer: {
    flexDirection: 'column',
    gap: 24,
    paddingLeft: 20,
    paddingRight: 20,
  },
  myImageContentArea: {
    flexDirection: 'column',
    gap: 12,
  },
  myInfoTextContentArea: {
    flexDirection: 'column',
    gap: 14,
  },
  myEditButtonContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EBEDF0',
  },
  myDogInfoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  myDogInfoTextContentArea: {
    flexDirection: 'column',
    gap: 16,
  },
  myDogInfoTextContent: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myInfoTextContent: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageText: {
    color: '#101828',
    fontSize: 12,
    fontWeight: 500,
  },
  myDogInfoText: {
    color: '#101426',
    fontSize: 16,
    fontWeight: 400,
  },
  myInfoText: {
    color: '#101426',
    fontSize: 16,
    fontWeight: 400,
  },
  editButtonText: {
    color: '#101426',
    fontSize: 14,
    fontWeight: 600,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
});
