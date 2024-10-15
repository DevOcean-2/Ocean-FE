import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-ui-lib';
import TabController from '@/components/TabController';
import { Link } from 'expo-router';

const MyFeed = () => {
  return (
    <View>
      <View style={styles.introduction}>
        <View style={profileStyles.profile}>
          <View style={profileStyles.profilePhoto}>
            <Text>photo</Text>
          </View>
          <View style={profileStyles.profileText}>
            <Text>profile text</Text>
          </View>
          <View style={profileStyles.visitor}>
            <Text>visitor</Text>
          </View>
        </View>

        <View style={subProfileStyles.subProfile}>
          <View style={subProfileStyles.badge}>
            <Text>badge component</Text>
          </View>
          <View style={subProfileStyles.subProfileText}>
            <Text>simple intro</Text>
          </View>
          <View>
            <Button>
              <Text>Text</Text>
            </Button>
            <Link href={'/feed/feed-visitors'} asChild>
              <Button>
                <Text>go detail</Text>
              </Button>
            </Link>
          </View>
        </View>
      </View>

      <View>
        <TabController items={[{ label: 'First' }, { label: 'Second' }, { label: 'Third' }]}>
          <TabController.TabBar />
          <View>
            <TabController.TabPage index={0}>
              <View>
                <Text>Tab 0</Text>
              </View>
            </TabController.TabPage>
            <TabController.TabPage index={1}>
              <View>
                <Text>Tab 1</Text>
              </View>
            </TabController.TabPage>
            <TabController.TabPage index={2}>
              <View>
                <Text>Tab 2</Text>
              </View>
            </TabController.TabPage>
          </View>
        </TabController>
      </View>
    </View>
  );
};

export default MyFeed;

const styles = StyleSheet.create({
  introduction: {
    height: 282,
    backgroundColor: 'red',
    padding: 25,
    gap: 20,
  },
});

const profileStyles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'green',
    gap: 15,
  },
  profilePhoto: {
    width: 80,
    height: '100%',
    backgroundColor: 'yellow',
  },
  profileText: {
    width: 166,
    height: '100%',
    backgroundColor: 'yellow',
  },
  visitor: {
    width: 65,
    height: '100%',
    backgroundColor: 'yellow',
  },
});

const subProfileStyles = StyleSheet.create({
  subProfile: {
    height: 72,
    backgroundColor: 'green',
    gap: 10,
  },
  badge: {
    height: 24,
    backgroundColor: 'yellow',
  },
  subProfileText: {
    height: 36,
    backgroundColor: 'yellow',
  },
});
