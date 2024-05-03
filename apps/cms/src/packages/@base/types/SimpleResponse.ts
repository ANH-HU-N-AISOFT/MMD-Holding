export interface SimpleResponse<Model, FieldsError> {
  message: string;
  hasError: boolean;
  info: Model | undefined;
  fieldsError?: Partial<FieldsError>;
  error?: string;
  errorCode?: string;
}
