import React from 'react';
import {
  HeaderIconContainer,
  HeaderLayout,
  HeaderText,
  HeaderTextContainer,
} from '@/src/widgets/PageHeaders/FeedHeader/ui';

const MyHomeHeader = () => {
  return (
    <HeaderLayout>
      <HeaderTextContainer>
        <HeaderText>마이 정보</HeaderText>
      </HeaderTextContainer>
      <HeaderIconContainer>
        {/*<Link href={PublicFeedEntryLink.feedUpload}>*/}
        {/*  <ICON_PLUS fill={'#231F20'} style={styles.icon} />*/}
        {/*</Link>*/}
        {/*<Link href={PublicFeedEntryLink.feedAlert}>*/}
        {/*  <ICON_BELL fill={'#231F20'} style={styles.icon} />*/}
        {/*</Link>*/}
      </HeaderIconContainer>
    </HeaderLayout>
  );
};

export default MyHomeHeader;
