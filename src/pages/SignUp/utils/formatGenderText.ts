const formatGenderText = (gender: number | undefined) => {
  if (gender === undefined) return '';
  return gender === 0 ? '여자아이' : '남자아이';
};

export default formatGenderText;
