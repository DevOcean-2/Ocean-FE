import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  header?: ReactNode; // 헤더를 위한 prop 추가
}

export const MainLayout = (props: Props) => {
  const { header, children } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 고정될 헤더 */}
      {header}
      {/* 스크롤될 콘텐츠 */}
      {children}
    </SafeAreaView>
  );
};
