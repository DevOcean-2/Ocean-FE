export const tabBarDisplayPage = (pageName: string | undefined) => {
  if (pageName === 'feed-upload') return true;
  if (pageName === 'feed-upload-create') return true;
  return false;
};
