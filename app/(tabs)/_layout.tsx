import React, { FC } from 'react';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { SvgProps } from 'react-native-svg';

import { Feed, Home, My, Place } from '@/assets/svgs';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
const TabBarIcon = (props: { Icon: FC<SvgProps>; color: string }) => {
  const { Icon, color } = props;

  return <Icon fill={color} />;
};

type TabScreenProps = React.ComponentProps<typeof Tabs.Screen>;

const TabLayout = () => {
  const colorScheme = useColorScheme();

  const tabListInfo: TabScreenProps[] = [
    {
      name: 'index',
      options: {
        title: '홈',
        tabBarIcon: ({ color }) => <TabBarIcon Icon={Home} color={color} />,
        // headerTitle: () => (
        //   <View>
        //     <Text>Custom Header Component</Text>
        //   </View>
        // ),
      },
    },
    {
      name: 'place',
      options: {
        title: '장소',
        tabBarIcon: ({ color }) => <TabBarIcon Icon={Place} color={color} />,
      },
    },
    {
      name: 'feed',
      options: {
        title: '피드',
        tabBarIcon: ({ color }) => <TabBarIcon Icon={Feed} color={color} />,
      },
    },
    {
      name: 'my',
      options: {
        title: 'MY',
        tabBarIcon: ({ color }) => <TabBarIcon Icon={My} color={color} />,
      },
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      {tabListInfo.map((tabInfo, index) => (
        <Tabs.Screen key={index} name={tabInfo.name} options={tabInfo.options} />
      ))}
    </Tabs>
  );
};

export default TabLayout;
