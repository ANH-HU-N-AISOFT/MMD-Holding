import { advanceTo, clear } from 'jest-date-mock';
import { getCurrentYearMonthAndDate } from '../src/getCurrentYearMonthAndDate';

describe('getCurrentYearMonthAndDate', () => {
  test('should return current year and month', () => {
    advanceTo(new Date(2019, 2, 27, 0, 0, 0));
    expect(getCurrentYearMonthAndDate().year).toEqual(2019);
    expect(getCurrentYearMonthAndDate().month).toEqual(2);
    clear();
  });
});
