export enum ActionType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  IMPORT = 'import',
  EXPORT = 'export',
}

export enum ResourceType {
  ORGANIZATION = 'organization',
  EMPLOYEE = 'employee',
  STUDENT = 'student',
  APPOINTMENT = 'appointment',
  CONSULTATION = 'consultation',
  PROMOTION = 'promotion',
  TRIAL_REQUEST = 'trial-request',
  COURSE = 'course',
  COURSE_ROADMAP = 'course-readmap',
  COURSE_COMBO = 'course-combo',
  DOCUMENT_TEMPLATE = 'document-template',
}
