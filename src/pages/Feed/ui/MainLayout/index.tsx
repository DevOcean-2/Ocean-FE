import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const MainLayout = (props: Props) => {
  const { children } = props;

  return <SafeAreaView>{children}</SafeAreaView>;
};

export default MainLayout;
