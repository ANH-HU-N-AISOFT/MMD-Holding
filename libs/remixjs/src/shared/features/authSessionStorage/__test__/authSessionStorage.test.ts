import { SessionStorage, redirect } from '@remix-run/node';
import { AuthSessionStorage } from '../src/authSessionStorage';

// Mock Request object
const mockRequest: any = {
  headers: {
    get: jest.fn(),
  },
  url: 'http://example.com/path',
};

// Mock SessionStorage instance
const mockSessionStorage = {
  getSession: jest.fn(),
  commitSession: jest.fn(),
  destroySession: jest.fn(),
};

// Mock redirect function from '@remix-run/node'
jest.mock('@remix-run/node', () => ({
  ...jest.requireActual('@remix-run/node'),
  redirect: jest.fn(),
}));

describe('AuthSessionStorage', () => {
  let authSessionStorage: AuthSessionStorage<any>;

  beforeEach(() => {
    authSessionStorage = new AuthSessionStorage({});
    authSessionStorage['_storage'] = mockSessionStorage as SessionStorage<any, any>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createSession method should create a session with provided data', async () => {
    const sampleSessionData = { userId: 123, username: 'testUser' };
    mockSessionStorage.getSession.mockResolvedValue({ set: jest.fn() });
    mockSessionStorage.commitSession.mockResolvedValue('mockedCookie');

    await authSessionStorage.createSession({
      request: mockRequest,
      sessionData: sampleSessionData,
      remember: true,
      redirectTo: '/dashboard',
    });

    expect(redirect).toHaveBeenCalledWith('/dashboard', {
      headers: { 'Set-Cookie': 'mockedCookie' },
    });
  });

  test('destroySession method should destroy the session and redirect to login URL', async () => {
    mockSessionStorage.getSession.mockResolvedValue({ data: { userId: 123 } });
    mockSessionStorage.destroySession.mockResolvedValue('destroyed');

    await authSessionStorage.destroySession(mockRequest);

    expect(redirect).toHaveBeenCalledWith('/login', { headers: { 'Set-Cookie': 'destroyed' } });
  });

  test('guard method should check for session existence and return session data', async () => {
    const sampleSession = { data: { userId: 123 } };
    mockSessionStorage.getSession.mockResolvedValue(sampleSession);

    const result = await authSessionStorage.guard({ request: mockRequest });

    expect(result).toEqual(sampleSession.data);
  });
});
