import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { ICON_ARROW_LEFT, ICON_BELL } from '@/assets/svgs';
import { Link, useNavigation } from 'expo-router';
import {
  HeaderIconContainer,
  HeaderLayout,
  HeaderText,
  HeaderTextContainer,
} from '@/src/widgets/PageHeaders/FeedHeader/ui';
import { PublicFeedEntryLink } from '@/src/shared/constants';

interface Props {
  userNickName?: string;
}

const FeedOtherHomeHeader = (props: Props) => {
  const { userNickName = '사용자 닉네임' } = props;

  const navigation = useNavigation();

  return (
    <HeaderLayout>
      <HeaderTextContainer>
        <Pressable onPress={() => navigation.goBack()}>
          <ICON_ARROW_LEFT />
        </Pressable>
        <HeaderText>{userNickName}</HeaderText>
      </HeaderTextContainer>
      <HeaderIconContainer>
        <Link href={PublicFeedEntryLink.feedAlert}>
          <ICON_BELL fill={'#231F20'} style={styles.icon} />
        </Link>
      </HeaderIconContainer>
    </HeaderLayout>
  );
};

export default FeedOtherHomeHeader;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 'auto',
  },
});
