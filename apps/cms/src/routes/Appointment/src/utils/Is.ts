import { ActionType, ResourceType } from '~/packages/specific/Permission/Permission';

export const isCanEditAppointment = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.APPOINTMENT,
};

export const isCanCreateAppointment = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.APPOINTMENT,
};

export const isCanDeleteAppointment = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.APPOINTMENT,
};

export const isCanReadAppointment = {
  actionType: ActionType.READ,
  resourceType: ResourceType.APPOINTMENT,
};

export const isCanImportAppointment = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.APPOINTMENT,
};

export const isCanExportAppointment = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.APPOINTMENT,
};
