import { MainLayout } from '@/src/pages/Feed/ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Carousel, TextField } from 'react-native-ui-lib';
import { Asset, getAssetInfoAsync } from 'expo-media-library';
import { EncodingType, readAsStringAsync } from 'expo-file-system';

import { Image, LoadingLayout } from '@/src/shared/ui';
import { FeedUploadCreatHeader } from '@/src/widgets/PageHeaders/FeedHeader';
import { useState } from 'react';
import { createFeedPost } from '@/src/pages/Feed/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyMetaData } from '@/src/pages/Feed/constants';

import { Button } from '@/src/shared/feed/ui';

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

  const getBase64FromAssetList = async (assetIdList: string[]): Promise<string[]> => {
    const base64List = [];

    try {
      for (const assetId of assetIdList) {
        const asset = await getAssetInfoAsync(assetId);

        if (!asset.localUri) {
          throw new Error('Asset does not have a localUri');
        }

        const base64Data = await readAsStringAsync(asset.localUri, {
          encoding: EncodingType.Base64,
        });

        base64List.push(`data:image/png;base64,${base64Data}`);
      }

      return base64List;
    } catch (error) {
      console.error('Error while converting Asset to Base64:', error);
      return [];
    }
  };

  const upload = async () => {
    const base64List = await getBase64FromAssetList(imageList.map((image) => image.id));

    mutation.mutate({
      image_urls: base64List,
      content: content,
    });
  };

  return (
    <LoadingLayout loading={mutation.isPending}>
      <MainLayout>
        <FeedUploadCreatHeader />
        <View style={styles.contentContainer}>
          <View style={styles.imagePreviewContainer}>
            <Carousel
              pageControlProps={{ containerStyle: styles.carouselContainer }}
              pageWidth={240}
              itemSpacings={6}
              // pageControlPosition={'under'}
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
    </LoadingLayout>
  );
};

export default FeedUploadCreate;

const styles = StyleSheet.create({
  imagePreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 240,
    backgroundColor: '#EDF1F7',
    gap: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
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
    height: 350,
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
