export interface ValidateServiceResponse {
  items: any[];
  hasError: boolean;
  errors: Array<{
    itemIndex: number;
    messages: string[];
  }>;
}
