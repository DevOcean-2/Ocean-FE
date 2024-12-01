import { FeedLikeByType } from '@/src/pages/Feed/types';

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

export const displayCutenessFormat = (level: string) => {
  switch (level) {
    case '1':
      return '귀여움';
    case '2':
      return '커여워';
    case '3':
      return '우리 동네에서 제일 귀여워요';
    case '4':
      return '지역구 압살하는 귀여움';
    case '5':
      return '수치화 불가능';
    default:
      return `${level} 단계`;
  }
};
