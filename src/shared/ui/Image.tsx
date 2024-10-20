import { ImageStyle, StyleProp } from 'react-native';
import RemoteImage from '@/src/shared/ui/RemoteImage';
import LocalImage from '@/src/shared/ui/LocalImage';

interface ImageProps {
  //require(경로)에 대한 type을 number로 처리함
  source: number | { uri: string };
  style?: StyleProp<ImageStyle>;
}

const Image = (props: ImageProps) => {
  const { source, style } = props;

  return typeof source === 'number' ? (
    <LocalImage source={source} style={style} />
  ) : (
    <RemoteImage source={source} style={style} />
  );
};

export default Image;
