// Import the necessary modules for testing
import { dayjs } from '../src/dayjsConfigGlobal';

describe('dayjs', () => {
  it('should return a formatted date for client-side usage', () => {
    const result = dayjs('2024-03-07', 'YYYY-MM-DD');
    expect(result.format('MMMM DD, YYYY')).toBe('March 07, 2024');
  });

  it('should throw an error with a warning for server-side usage', () => {
    // @ts-ignore
    delete global.window;
    expect(() => dayjs('2024-03-07', 'YYYY-MM-DD')).toThrowErrorMatchingSnapshot();
  });
});
