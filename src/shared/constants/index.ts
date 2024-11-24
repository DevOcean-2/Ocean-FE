export const FeedEntryLink = {
  feedHome: 'index',
  feedAlert: 'feed-alert-list',
  feedUpload: 'feed-upload',
  feedUploadCreate: 'feed-upload-create',
  feedDetail: 'feed-detail',
  feedLike: 'feed-like-list',
  feedOther: 'feed-other',
  feedUpdate: 'feed-update',
  feedVisitor: 'feed-visitors',
} as const;

export const PublicFeedEntryLink = {
  feedHome: `/feed/`,
  feedAlert: `/feed/${FeedEntryLink.feedAlert}`,
  feedUpload: `/feed/${FeedEntryLink.feedUpload}`,
  feedUploadCreate: `/feed/${FeedEntryLink.feedUploadCreate}`,
  feedDetail: `/feed/${FeedEntryLink.feedDetail}`,
  feedLike: `/feed/${FeedEntryLink.feedLike}`,
  feedOther: `/feed/${FeedEntryLink.feedOther}`,
  feedUpdate: `/feed/${FeedEntryLink.feedUpdate}`,
  feedVisitor: `/feed/${FeedEntryLink.feedVisitor}`,
} as const;

export const WalkEntryLink = {
  walkHome: 'index',
  walkActivity: 'walk-activity',
  notification: 'notification',
  walkRanking: 'walk-ranking',
} as const;

export const PublicWalkEntryLink = {
  walkHome: `/home/`,
  walkActivity: `/home/${WalkEntryLink.walkActivity}`,
  notification: `/home/${WalkEntryLink.notification}`,
  walkRanking: `/home/${WalkEntryLink.walkRanking}`,
} as const;
