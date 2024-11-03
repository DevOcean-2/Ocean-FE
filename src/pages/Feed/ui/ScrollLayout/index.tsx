import { ScrollView } from 'react-native';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const ScrollLayout = (props: Props) => {
  const { children } = props;

  return <ScrollView>{children}</ScrollView>;
};

export default ScrollLayout;
