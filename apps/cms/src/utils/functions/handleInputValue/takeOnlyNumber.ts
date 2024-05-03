import { ChangeEvent } from 'react';

export const takeOnlyNumber = (event: ChangeEvent<HTMLInputElement>) => {
  const numbersArray = event.target.value.match(/\d+/g) ?? [];
  return numbersArray.join('');
};
