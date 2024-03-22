import { AuthSessionStorage } from 'remixjs/server';
import { KeyOfSessionInCookie } from './constants/KeyOfSessionInCookie';
import { Session } from './models/Session';

export const authSessionStorage = new AuthSessionStorage<{ sessionData?: Session }>({
  loginUrl: '/login',
  options: {
    name: KeyOfSessionInCookie,
  },
});
