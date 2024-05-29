// auth.server.ts
import { notification } from 'antd';
import { localStorage } from 'utilities';
import { array, object, string } from 'zod';
import { KeyOfSessionInCookie } from './constants/KeyOfSessionInCookie';
import { Session } from './models/Session';

export const sessionSchema = object({
  profile: object({
    id: string(),
    roles: array(string()),
    organizationName: string(),
    fullName: string(),
    avatar: string(),
    organizationId: string().optional(),
  }).optional(),
  token: object({
    accessToken: string(),
    refreshToken: string(),
  }),
});

export const getSession = (): Session | undefined => {
  try {
    const session = localStorage.getItem(KeyOfSessionInCookie);
    if (session) {
      const parsed = JSON.parse(session);
      sessionSchema.parse(parsed);
      return parsed as Session;
    } else {
      destroySession();
      return;
    }
  } catch (error) {
    // FIXME: I18n
    notification.error({
      message: 'Phiên đăng nhập hết hạn',
      description: 'Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại để tiếp tục',
    });
    destroySession();
    return;
  }
};

export const setSession = (data: Session): Session => {
  localStorage.setItem(KeyOfSessionInCookie, JSON.stringify(data));
  return data;
};

export const destroySession = (): void => {
  localStorage.removeItem(KeyOfSessionInCookie);
  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
};
