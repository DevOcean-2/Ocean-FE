import { Button, Image, MainLayout, ScrollLayout } from '@/src/shared/ui';
import { MyHomeHeader } from '@/src/widgets/PageHeaders/MyHeader';
import { StyleSheet, Text, View } from 'react-native';

const MyHome = () => {
  const dogInfoMetaData = [
    { label: '댕댕이 이름' },
    { label: '성별' },
    { label: '댕댕이 크기' },
    { label: '품종' },
    { label: '귀여움 상태' },
    { label: '출생연도' },
    { label: '몸무게' },
    { label: '접종 백신' },
    { label: '과거 질병 이력' },
    { label: '알러지 정보' },
  ];

  return (
    <MainLayout>
      <MyHomeHeader />
      <View style={styles.contentContainer}>
        <View style={styles.myInfoContainer}>
          <View style={styles.myImageContentArea}>
            <Image style={styles.image} source={require('../assets/images/dog-2.png')} />
            <Button style={styles.imageEditButton}>
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
          <Button style={styles.dogInfoEditButton}>
            <Text style={styles.editButtonText}>강아지 정보 편집</Text>
          </Button>
        </View>
        <View style={styles.myDogInfoContainer}>
          <ScrollLayout>
            <View style={styles.myDogInfoTextContentArea}>
              {dogInfoMetaData.map((dogInfo) => {
                return (
                  <View key={dogInfo.label} style={styles.myDogInfoTextContent}>
                    <Text style={styles.myDogInfoText}>{dogInfo.label}</Text>
                    <Text style={styles.myDogInfoText}>쫑아</Text>
                  </View>
                );
              })}
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
    alignItems: 'center',
    justifyContent: 'center',
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
    height: '37.5%',
  },
  myDogInfoTextContentArea: {
    flexDirection: 'column',
    gap: 16,
  },
  myDogInfoTextContent: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myInfoTextContent: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
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
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  imageEditButton: {
    width: 65,
    height: 32,
  },
  dogInfoEditButton: {
    height: 42,
  },
});
