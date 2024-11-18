import { MainLayout } from '@/src/pages/Feed/ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Carousel, TextField } from 'react-native-ui-lib';
import { Asset } from 'expo-media-library';
import { Image } from '@/src/shared/ui';
import Button from '@/src/shared/feed/ui/Button';
import { FeedUploadCreatHeader } from '@/src/widgets/PageHeaders/FeedHeader';
import { useState } from 'react';
import { createFeedPost } from '@/src/pages/Feed/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyMetaData } from '@/src/pages/Feed/constants';

const FeedUploadCreate = () => {
  const queryClient = useQueryClient();

  const params = useLocalSearchParams<{ data: string }>();

  const navigation = useNavigation();

  const imageList: Asset[] = JSON.parse(params.data);

  const [content, setContent] = useState<string>('');

  const mutation = useMutation({
    mutationFn: createFeedPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeyMetaData.getFeedPosts] });
      navigation.goBack();
      navigation.goBack();
    },
  });

  const upload = () => {
    mutation.mutate({
      image_urls: imageList.map(() => 'https://picsum.photos/200/300'),
      content: content,
    });
  };

  return (
    <MainLayout>
      <FeedUploadCreatHeader />
      <View style={styles.contentContainer}>
        <View style={styles.imagePreviewContainer}>
          <Carousel
            pageControlProps={{ containerStyle: styles.carouselContainer }}
            pageControlPosition={'under'}
          >
            {imageList.map((image) => {
              return (
                <View key={image.id}>
                  <Image key={image.id} style={styles.image} source={{ uri: image.uri }} />
                </View>
              );
            })}
          </Carousel>
        </View>
        <View style={styles.textFieldContainer}>
          <ScrollView>
            <TextField
              style={styles.textField}
              placeholder={'사진과 함께 올릴 문구를 추가해주세요.'}
              multiline={true}
              onChange={(e) => {
                const { text } = e.nativeEvent;
                setContent(text);
              }}
            />
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonBox}>
        <Button style={styles.button} onPress={() => upload()}>
          <Text style={styles.buttonText}>업로드</Text>
        </Button>
      </View>
    </MainLayout>
  );
};

export default FeedUploadCreate;

const styles = StyleSheet.create({
  imagePreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 375,
    backgroundColor: '#EDF1F7',
    gap: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    position: 'absolute',
    left: '50%',
    //percentage 지원 x
    transform: [{ translateX: -25 }],
    bottom: 10,
  },
  textField: {
    width: '100%',
    height: 200,
    // height: '100%',
  },
  textFieldContainer: {
    width: '100%',
    padding: 20,
  },
  contentContainer: {
    // gap: 20,
  },
  buttonBox: {
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 30,
    // backgroundColor: 'red',
    borderTopWidth: 2,
    borderTopColor: '#EBEDF0',
  },
  button: {
    height: 54,
    backgroundColor: '#04C755',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 800,
  },
});
