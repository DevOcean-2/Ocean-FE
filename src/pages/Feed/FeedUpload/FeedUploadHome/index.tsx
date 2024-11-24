import { MainLayout, ScrollLayout } from '@/src/pages/Feed/ui';
import { FeedUploadHeader } from '@/src/widgets/PageHeaders';
import AlbumImageSelector from '@/src/shared/ui/AlbumImageSelector';
import { useState } from 'react';
import { FeedUploadContext } from '../context';
import { Asset } from 'expo-media-library';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from '@/src/shared/ui';
import { ICON_ARROW_DOWN, ICON_CAMERA, ICON_IMAGE_FILL_SUB } from '@/assets/svgs';

const FeedUpload = () => {
  const [selectedImage, setSelectedImage] = useState<Asset[]>([]);

  const onChangeSelectedImage = (selectedImageList: Asset[]) => {
    setSelectedImage(selectedImageList);
  };

  return (
    <FeedUploadContext.Provider value={{ selectedImage }}>
      <MainLayout>
        <FeedUploadHeader />
        <ScrollLayout>
          <View style={styles.imagePreviewContainer}>
            {selectedImage.length > 0 ? (
              <Image
                style={styles.image}
                source={{ uri: selectedImage[selectedImage.length - 1].uri }}
              />
            ) : (
              <>
                <ICON_IMAGE_FILL_SUB fill={'#8F9BB3'} />
                <Text style={styles.text}>이미지를 선택해주세요</Text>
              </>
            )}
          </View>
          <View style={styles.albumSelectorContainer}>
            <View style={styles.albumSelector}>
              <Text style={styles.selectorText}>최근 항목</Text>
              <ICON_ARROW_DOWN fill={'#8F9BB3'} />
            </View>
            <View style={styles.cameraIconWrapper}>
              <ICON_CAMERA width={18} height={18} fill={'#FFFFFF'} />
            </View>
          </View>
          <AlbumImageSelector onChange={onChangeSelectedImage} />
        </ScrollLayout>
      </MainLayout>
    </FeedUploadContext.Provider>
  );
};

export default FeedUpload;

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
  albumSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cameraIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    padding: 8,
    borderRadius: 100,
    backgroundColor: '#192038',
    marginLeft: 'auto',
  },
  albumSelector: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8F9BB3',
  },
  selectorText: {
    color: '#101426',
    fontSize: 14,
    fontWeight: '400',
  },
});
