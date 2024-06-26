import { ReactNode } from 'react';
import { AnyRecord } from 'typescript-utilities';

export interface SimpleListingLoaderResponse<T extends AnyRecord> {
  info: {
    hits: T[];
    pagination: {
      totalRecords: number;
      totalPages: number;
      pageSize: number;
    };
  };
  page: number;
  toastMessageError?: ReactNode;
}
