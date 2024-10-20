import { Image, ImageStyle, StyleProp } from 'react-native';

interface RemoteImageProps {
  source: { uri: string };
  style: StyleProp<ImageStyle>;
}

const RemoteImage = (props: RemoteImageProps) => {
  const { source, style } = props;

  return <Image source={source} style={style} />;
};

export default RemoteImage;
