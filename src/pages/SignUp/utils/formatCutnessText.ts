const formatCutnessText = (cuteness: number | undefined) => {
  if (cuteness === undefined) return '';
  switch (cuteness) {
    case 0:
      return '귀여운가?';
    case 1:
      return '귀여움';
    case 2:
      return '커여워';
    case 3:
      return '우리 동네에서 제일 귀여워요';
    case 4:
      return '지역구 압살하는 귀여움';
    case 5:
      return '수치화 불가능';
    default:
      return '';
  }
};
export default formatCutnessText;
