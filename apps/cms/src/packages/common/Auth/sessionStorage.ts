// auth.server.ts
import { notification } from 'reactjs';
import { localStorage } from 'utilities';
import { array, object, string, enum as enum_ } from 'zod';
import { ActionType, ResourceType } from '../../specific/Permission/Permission';
import { Role } from '../SelectVariants/Role/constants/Role';
import { KeyOfSessionInCookie } from './constants/KeyOfSessionInCookie';
import { Session } from './models/Session';

export const sessionSchema = object({
  profile: object({
    id: string(),
    roles: array(enum_([Role.Admin, Role.Consultant, Role.Lecturer, Role.Sale, Role.Student, Role.SuperAdmin])),
    organizationName: string(),
    fullName: string(),
    avatar: string(),
    organizationId: string().optional(),
    organizationCode: string().optional(),
  }).optional(),
  permissions: array(
    object({
      actionType: enum_([
        ActionType.CREATE,
        ActionType.DELETE,
        ActionType.EXPORT,
        ActionType.IMPORT,
        ActionType.READ,
        ActionType.UPDATE,
      ]),
      resourceType: enum_([
        ResourceType.APPOINTMENT,
        ResourceType.CONSULTATION,
        ResourceType.COURSE,
        ResourceType.COURSE_COMBO,
        ResourceType.COURSE_ROADMAP,
        ResourceType.EMPLOYEE,
        ResourceType.ORGANIZATION,
        ResourceType.PROMOTION,
        ResourceType.STUDENT,
        ResourceType.TRIAL_REQUEST,
        ResourceType.DOCUMENT_TEMPLATE,
      ]),
    }),
  ).optional(),
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
