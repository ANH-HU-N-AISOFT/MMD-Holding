import { getDateMonthAndYear } from '../src/getDateMonthAndYear';

describe('getDateMonthAndYear', () => {
  test('should return year and month', () => {
    const date = new Date(2019, 2, 27, 0, 0, 0);
    expect(getDateMonthAndYear({ date }).year).toEqual(2019);
    expect(getDateMonthAndYear({ date }).month).toEqual(2);
  });
});
