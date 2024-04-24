export interface Pagination {
  __typename?: string;
  totalPages: number;
  totalRows: number;
}

export interface ClientQueryResponse {
  __typename?: string;
  hits?: any[];
  pagination?: Pagination;
}

export interface SimpleListingLoaderResponse<Response extends ClientQueryResponse> {
  data?: Response;
  page: number;
}
