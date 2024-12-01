export const tabBarDisplayPage = (pageName: string | undefined) => {
  if (pageName === 'feed-upload') return true;
  if (pageName === 'feed-upload-create') return true;
  return false;
};

export const displayUploadTime = (date: string) => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const displayBirthdayFormat = (date: string) => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  return `${year}.${month}.${day}`;
};
