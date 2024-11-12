import { StyleSheet } from 'react-native';
import React from 'react';
import { ICON_BELL, ICON_PLUS } from '@/assets/svgs';
import { Link } from 'expo-router';
import {
  HeaderIconContainer,
  HeaderLayout,
  HeaderText,
  HeaderTextContainer,
} from '@/src/widgets/PageHeaders/FeedHeader/ui';
import { PublicFeedEntryLink } from '@/src/shared/constants';

const FeedHomeHeader = () => {
  return (
    <HeaderLayout>
      <HeaderTextContainer>
        <HeaderText>사용자 닉네임</HeaderText>
      </HeaderTextContainer>
      <HeaderIconContainer>
        <Link href={PublicFeedEntryLink.feedUpload}>
          <ICON_PLUS fill={'#231F20'} style={styles.icon} />
        </Link>
        <Link href={PublicFeedEntryLink.feedAlert}>
          <ICON_BELL fill={'#231F20'} style={styles.icon} />
        </Link>
      </HeaderIconContainer>
    </HeaderLayout>
  );
};

export default FeedHomeHeader;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 'auto',
  },
});
