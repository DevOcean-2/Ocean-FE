export const getTimeAgo = (date: Date | string) => {
  // date가 string이면 Date 객체로 변환
  const targetDate = date instanceof Date ? date : new Date(date);
  const now = new Date();

  // 올바른 Date 객체인지 확인
  if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
    return '알 수 없음';
  }

  const seconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  // 방금 전
  if (seconds < 60) {
    return '방금 전';
  }

  // n분 전
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  // n시간 전
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  // n일 전
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}일 전`;
  }

  // n주 전
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks}주 전`;
  }

  // n개월 전
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}개월 전`;
  }

  // n년 전
  const years = Math.floor(days / 365);
  return `${years}년 전`;
};
