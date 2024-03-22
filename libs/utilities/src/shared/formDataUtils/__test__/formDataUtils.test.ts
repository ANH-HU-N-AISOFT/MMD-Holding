import fetchMock from 'jest-fetch-mock';
import { number, object, string } from 'zod';
import { FormDataUtils } from '../src/formDataUtils';

// Mock the global Request class
class FakeRequest extends Request {
  constructor(input: string | Request, init?: RequestInit) {
    super(input, init);
  }

  // @ts-ignore
  public formData = (): Promise<FormData> => {
    const formData = new FormData();
    return Promise.resolve(formData);
  };
}

const inputData = { key: 'value', number: 42 };
const zodSchema = object({
  key: string(),
  number: number(),
});

describe('FormDataUtils', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  const formDataUtils = new FormDataUtils({ zodSchema });

  describe('encrypt', () => {
    it('should encrypt data into a JSON string', () => {
      const result = formDataUtils.encrypt(inputData);
      expect(typeof result.json).toBe('string');
    });
  });

  describe('decrypt', () => {
    it('should decrypt Request object containing valid JSON string', async () => {
      // Mock the global Request class
      const fakeRequest = new FakeRequest('http://example.com', { method: 'POST' });

      // Mock the formData method
      jest.spyOn(fakeRequest, 'formData').mockResolvedValueOnce({
        get: () => JSON.stringify(inputData),
      } as any);

      const decryptedData = await formDataUtils.decrypt(fakeRequest as Request);
      expect(decryptedData).toEqual(inputData);
    });

    it('should return undefined for Request object without JSON string', async () => {
      // Mock the global Request class
      const fakeRequest = new FakeRequest('http://example.com', { method: 'POST' });

      // Mock the formData method
      jest.spyOn(fakeRequest, 'formData').mockResolvedValueOnce({
        get: () => null,
      } as any);

      const decryptedData = await formDataUtils.decrypt(fakeRequest as Request);
      expect(decryptedData).toBeUndefined();
    });
  });
});
