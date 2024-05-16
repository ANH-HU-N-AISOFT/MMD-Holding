import { ChangeEvent } from 'react';

export const takeOnlyNumber = (eventOrValue: ChangeEvent<HTMLInputElement> | string) => {
  const value = typeof eventOrValue === 'string' ? eventOrValue : eventOrValue.target.value;
  const numbersArray = value.match(/\d+/g) ?? [];
  return numbersArray.join('');
};
