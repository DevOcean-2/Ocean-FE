import { Href } from 'expo-router';

export const FeedEntryLink = {
  feedHome: 'index',
  feedAlert: 'feed-alert-list',
  feedUpload: 'feed-upload',
  feedDetail: 'feed-detail',
  feedLike: 'feed-like-list',
  feedOther: 'feed-other',
  feedUpdate: 'feed-update',
  feedVisitor: 'feed-visitors',
} as const;

export const PublicFeedEntryLink: Record<string, Href<string>> = {
  feedHome: `/feed/`,
  feedAlert: `/feed/${FeedEntryLink.feedAlert}`,
  feedUpload: `/feed/${FeedEntryLink.feedUpload}`,
  feedDetail: `/feed/${FeedEntryLink.feedDetail}`,
  feedLike: `/feed/${FeedEntryLink.feedLike}`,
  feedOther: `/feed/${FeedEntryLink.feedOther}`,
  feedUpdate: `/feed/${FeedEntryLink.feedUpdate}`,
  feedVisitor: `/feed/${FeedEntryLink.feedVisitor}`,
};
