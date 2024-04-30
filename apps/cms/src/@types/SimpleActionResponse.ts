export interface SimpleActionResponse<Model, FieldsError> {
  message: string;
  hasError: boolean;
  info?: Model | undefined;
  fieldsError?: Partial<FieldsError>;
  error?: string;
  errorCode?: string;
}
