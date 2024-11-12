import { SwitchButton } from '@/components/SwitchButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { ICON_BELL, ICON_BELL_ALERT } from '@/assets/svgs';

type HeaderProps = {
  isHome: boolean;
  onToggle: () => void;
};

export const Header = ({ isHome, onToggle }: HeaderProps) => {
  // @TODO notification 리스트들 존재 여부 판단
  const hasNotification = true;
  return (
    <View style={styles.container}>
      <SwitchButton isMain={isHome} mainLabel="홈" subLabel="산책하기" toggle={onToggle} />
      {hasNotification ? <ICON_BELL_ALERT /> : <ICON_BELL />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
    height: 60,
  },
});
