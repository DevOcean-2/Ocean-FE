import React, { FC, ReactNode } from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { SvgProps } from 'react-native-svg';

import {
  ICON_GRID,
  ICON_GRID_FILL,
  ICON_HOME,
  ICON_HOME_FILL,
  ICON_PERSON,
  ICON_PERSON_FILL,
  ICON_PIN,
  ICON_PIN_FILL,
} from '@/assets/svgs';

type TabScreenProps = React.ComponentProps<typeof Tabs.Screen>;

const TabBarIcon = (props: {
  Icon: FC<SvgProps>;
  IconFill: FC<SvgProps>;
  color: string;
  focused: boolean;
}) => {
  const { Icon, IconFill, color, focused } = props;

  return focused ? <IconFill fill="#04C755" /> : <Icon fill={color} />;
};

const TabBarText = (props: { children: ReactNode; color: string; focused: boolean }) => {
  const { children, focused } = props;

  return focused ? (
    <Text style={[styles.focused, { color: '#101426' }]}>{children}</Text>
  ) : (
    <Text style={[styles.text, { color: '#8F9BB3' }]}> {children}</Text>
  );
};

const TabLayout = () => {
  const colorScheme = useColorScheme();

  const tabListInfo: TabScreenProps[] = [
    {
      name: 'home',
      options: {
        title: '홈',
        tabBarLabel: ({ color, focused }) => (
          <TabBarText color={color} focused={focused}>
            홈
          </TabBarText>
        ),
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon Icon={ICON_HOME} IconFill={ICON_HOME_FILL} color={color} focused={focused} />
        ),
      },
    },
    {
      name: 'place',
      options: {
        title: '장소',
        tabBarLabel: ({ color, focused }) => (
          <TabBarText color={color} focused={focused}>
            장소
          </TabBarText>
        ),
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon Icon={ICON_PIN} IconFill={ICON_PIN_FILL} color={color} focused={focused} />
        ),
      },
    },
    {
      name: 'feed',
      options: {
        title: '피드',
        tabBarLabel: ({ color, focused }) => (
          <TabBarText color={color} focused={focused}>
            피드
          </TabBarText>
        ),
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon Icon={ICON_GRID} IconFill={ICON_GRID_FILL} color={color} focused={focused} />
        ),
      },
    },
    {
      name: 'my',
      options: {
        title: '마이',
        tabBarLabel: ({ color, focused }) => (
          <TabBarText color={color} focused={focused}>
            마이
          </TabBarText>
        ),
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon
            Icon={ICON_PERSON}
            IconFill={ICON_PERSON_FILL}
            color={color}
            focused={focused}
          />
        ),
      },
    },
    {
      name: 'index',
      options: {
        tabBarButton: () => null,
      },
    },
  ];

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        headerShown: false,
      }}
    >
      {tabListInfo.map((tabInfo, index) => (
        <Tabs.Screen key={index} name={tabInfo.name} options={tabInfo.options} />
      ))}
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 12,
  },
  focused: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 12,
  },
});
