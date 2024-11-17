import { SwitchButton } from '@/components/SwitchButton';
import { ICON_BELL, ICON_BELL_ALERT } from '@/assets/svgs';
import { View, TouchableOpacity } from 'react-native-ui-lib';
import { HeaderLayout } from './components/frame';
import { useHomeParameter } from './hooks';

export const Header = () => {
  // @TODO notification 리스트들 존재 여부 판단
  const hasNotification = true;
  const { changeMenu, isHome } = useHomeParameter();
  
  return (
    <HeaderLayout>
      <View style={{ marginRight: 'auto' }}>
        <SwitchButton isMain={isHome} mainLabel="홈" subLabel="산책하기" toggle={changeMenu} />
      </View>
      <TouchableOpacity onPress={() => console.log('testgogo')}>
        <View style={{ marginLeft: 'auto' }}>
          {hasNotification ? <ICON_BELL_ALERT /> : <ICON_BELL />}
        </View>
      </TouchableOpacity>
    </HeaderLayout>
  );
};
