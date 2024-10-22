import { SwitchButton } from '@/components/SwitchButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

type HeaderProps = {
  isHome: boolean;
  onToggle: () => void;
};

export const Header = ({ isHome, onToggle }: HeaderProps) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <SwitchButton isMain={isHome} mainLabel="홈" subLabel="산책하기" toggle={onToggle} />
        <Text>test</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    height: 60,
  },
});
