import dayjs from 'dayjs';

export const calculateAge = (dateOfBirth: string) => {
  const today = dayjs();
  const birthDate = dayjs(dateOfBirth);
  const age = today.diff(birthDate, 'year');
  return age;
};
