import { AnyRecord } from 'typescript-utilities';

export interface ValidateServiceResponse {
  items: AnyRecord[];
  hasError: boolean;
  errors: Array<{
    itemIndex: number;
    messages: string[];
  }>;
}
