const formatSizeText = (size: number | undefined) => {
  if (size === undefined) return '';
  switch (size) {
    case 0:
      return '소형견';
    case 1:
      return '중형견';
    case 2:
      return '대형견';
    default:
      return '';
  }
};

export default formatSizeText;
