import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Album, Asset } from 'expo-media-library';
import { Image } from '@/src/shared/ui';
import { useGetAlbumAssets, useGetAlbums } from '@/src/shared/ui/AlbumImageSelector/hooks';
import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ICON_CHECK_MARK } from '@/assets/svgs';

interface AlbumContextType {
  selectedImageObject: MutableRefObject<{ [key: string]: boolean }>;
  selectedImage: Asset[];
  setSelectedImage: Dispatch<SetStateAction<Asset[]>>;
}

const AlbumContext = createContext<AlbumContextType>({
  selectedImageObject: { current: {} },
  selectedImage: [],
  setSelectedImage(value: ((prevState: Asset[]) => Asset[]) | Asset[]): void {},
});

interface AlbumImageSelectorProps {
  onChange?: (selectedImage: Asset[]) => void;
}

const AlbumImageSelector = (props: AlbumImageSelectorProps) => {
  const { onChange } = props;

  const albums = useGetAlbums();

  const [selectedImage, setSelectedImage] = useState<Asset[]>([]);

  //앨범의 이미지가 많은 경우를 대비한 object
  const selectedImageObject = useRef({});

  useEffect(() => {
    if (onChange) {
      onChange(selectedImage);
    }
  }, [selectedImage]);

  return (
    <AlbumContext.Provider value={{ selectedImageObject, selectedImage, setSelectedImage }}>
      {albums && albums.map((album) => <AlbumEntry key={album.id} album={album} />)}
    </AlbumContext.Provider>
  );
};

const AlbumEntry = ({ album }: { album: Album }) => {
  const assets = useGetAlbumAssets(album);

  const { selectedImageObject, selectedImage, setSelectedImage } = useContext(AlbumContext);

  // const getBase64 = async (uri: string) => {
  //   const base64 = await FileSystem.readAsStringAsync(uri, {
  //     encoding: FileSystem.EncodingType.Base64,
  //   });
  // };

  const onPressImage = (asset: Asset) => {
    // 이미지 선택 or 선택 해제
    if (selectedImageObject.current[asset.id] === undefined) {
      selectedImageObject.current[asset.id] = true;
      setSelectedImage((prev) => [...prev, asset]);
    } else {
      delete selectedImageObject.current[asset.id];
      setSelectedImage((prev) => prev.filter((prevAssetInfo) => prevAssetInfo.id !== asset.id));
    }
  };

  return (
    <View style={styles.albumAssetsContainer}>
      {assets &&
        assets.map((asset) => {
          return (
            <TouchableOpacity
              key={asset.id}
              style={styles.imageWrapper}
              onPress={() => onPressImage(asset)}
            >
              <Image source={{ uri: asset.uri }} style={styles.image} />
              {selectedImageObject.current[asset.id] && (
                <>
                  <View style={styles.selected} />
                  {selectedImage.length > 1 ? (
                    <View style={styles.numberWrapper}>
                      <Text>
                        {selectedImage.findIndex((selectedAsset) => selectedAsset.id === asset.id) +
                          1}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.iconWrapper}>
                      <ICON_CHECK_MARK style={styles.icon} fill={'#ffffff'} />
                    </View>
                  )}
                </>
              )}
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default AlbumImageSelector;

const styles = StyleSheet.create({
  albumAssetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    gap: 4,
  },
  imageWrapper: {
    position: 'relative',
    width: '32.5%',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selected: {
    position: 'absolute',
    opacity: 0.5,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  numberWrapper: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: '#101426',
    fontSize: 16,
    fontWeight: 600,
  },
  iconWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
