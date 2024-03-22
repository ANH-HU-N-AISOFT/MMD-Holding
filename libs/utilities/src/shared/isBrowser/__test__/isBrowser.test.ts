import { isBrowser } from '../src/isBrowser';

describe('isBrowser function', () => {
  it('should return true when running in a browser', () => {
    expect(isBrowser()).toBe(true);
  });

  it('should return false when not running in a browser', () => {
    // @ts-ignore
    delete global.window;

    expect(isBrowser()).toBe(false);
  });
});
