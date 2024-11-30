const calculateAge = (birthDay: string) => {
  const today = new Date();
  const [year, month, day] = birthDay.split('.').map(Number);
  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  let months =
    today.getMonth() +
    12 * today.getFullYear() -
    (birthDate.getMonth() + 12 * birthDate.getFullYear());

  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths}개월`;
  } else if (remainingMonths === 0) {
    return `${years}살`;
  } else {
    return `${years}살 ${remainingMonths}개월`;
  }
};

export default calculateAge;
