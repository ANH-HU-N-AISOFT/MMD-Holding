import fetchMock from 'jest-fetch-mock';
import { z } from 'zod';
import { UrlSearchParamsUtils, UrlSearchParamsUtilsError } from '../src/urlSearchParamsUtils';

describe('UrlSearchParamsUtils', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  const schema = z.object({
    param1: z.string(),
    param2: z.number(),
  });

  const urlSearchParamsUtils = new UrlSearchParamsUtils({ zodSchema: schema });

  const validData = { param1: 'value1', param2: 42 };
  const invalidData = { param1: 'value1', param2: 'invalid' };

  describe('encrypt', () => {
    it('should encrypt valid data without errors', () => {
      const encryptedString = urlSearchParamsUtils.encrypt(validData);
      expect(typeof encryptedString).toBe('string');
    });

    it('should throw UrlSearchParamsUtilsError for invalid data', () => {
      // @ts-ignore
      expect(() => urlSearchParamsUtils.encrypt(invalidData)).toThrow(UrlSearchParamsUtilsError);
    });
  });

  describe('decrypt', () => {
    it('should decrypt valid string without errors', () => {
      const encryptedString = urlSearchParamsUtils.encrypt(validData);
      const decryptedData = urlSearchParamsUtils.decrypt(encryptedString);
      expect(decryptedData).toEqual(validData);
    });

    it('should decrypt valid Request object without errors', () => {
      fetchMock.mockResponseOnce('');
      const fakeRequest = new Request('http://example.com?param1=value1&param2=42');
      const decryptedData = urlSearchParamsUtils.decrypt(fakeRequest);
      expect(decryptedData).toEqual(validData);
    });

    it('should throw UrlSearchParamsUtilsError for invalid data', () => {
      expect(() => urlSearchParamsUtils.decrypt('invalid-string')).toThrow(UrlSearchParamsUtilsError);
    });
  });

  describe('getUrlSearchParams', () => {
    it('should return URLSearchParams from Request object', () => {
      const fakeRequest = new Request('http://example.com?param1=value1&param2=42');
      const urlSearchParams = urlSearchParamsUtils.getUrlSearchParams(fakeRequest);
      expect(urlSearchParams.get('param1')).toBe('value1');
      expect(urlSearchParams.get('param2')).toBe('42');
    });

    it('should return URLSearchParams from window.location.search', () => {
      // Mock window location
      // @ts-ignore
      delete global.window.location;
      // @ts-ignore
      global.window = Object.create(window);
      // @ts-ignore
      global.window.location = new URL('http://example.com?param1=value1&param2=42');

      const urlSearchParams = urlSearchParamsUtils.getUrlSearchParams();
      expect(urlSearchParams.get('param1')).toBe('value1');
      expect(urlSearchParams.get('param2')).toBe('42');

      // Reset window object
      // @ts-ignore
      delete global.window.location;
      // @ts-ignore
      global.window = undefined;
    });
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });
});
