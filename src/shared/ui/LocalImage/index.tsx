import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';

interface LocalImageProps {
  source: ImageSourcePropType | null;
  style: StyleProp<ImageStyle>;
}

const LocalImage = (props: LocalImageProps) => {
  const { source, style } = props;

  const [ready, setReady] = useState(false);
  const [image, setImage] = useState<Asset | undefined>();

  useEffect(() => {
    (async () => {
      const image = Asset.fromModule(source as string);
      await image.downloadAsync();

      setImage(image);
      setReady(true);
    })();
  }, []);

  return ready && image && <Image source={{ uri: image.localUri || image.uri }} style={style} />;
};

export default LocalImage;
