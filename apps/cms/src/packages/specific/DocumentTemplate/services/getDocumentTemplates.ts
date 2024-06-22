import { DocumentTemplate } from '../models/DocumentTemplate';
import { documentTemplates } from './data';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';

export interface ResponseSuccess {
  items: DocumentTemplate[];
  headers: ServiceHeaderResponse;
}

interface GetDocumentTemplates {
  query?: string;
  page?: number;
  perPage?: number;
  createdAt?: number;
  type?: string;
  status?: string;
}
export const getDocumentTemplates = async ({
  page = 1,
  perPage = 20,
  query,
  createdAt,
  status,
  type,
}: GetDocumentTemplates) => {
  // const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
  //   url: '/document-templates',
  //   params: {
  //     page,
  //     query,
  //     perPage,
  //   },
  // });

  // return response.data;

  const filteredTemplates = documentTemplates.filter(template => {
    const matchesQuery = query
      ? template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.description?.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesCreatedAt = createdAt ? new Date(template.createdAt).getTime() >= createdAt : true;
    const matchesType = type ? type === template.type : true;
    const matchesStatus = status ? status === template.status : true;
    return matchesQuery && matchesCreatedAt && matchesType && matchesStatus;
  });

  // Calculate pagination
  const totalItems = filteredTemplates.length;
  const pagesCount = Math.ceil(totalItems / perPage);
  const currentPage = Math.min(page, pagesCount);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = filteredTemplates.slice(start, end);

  const response: ResponseSuccess = {
    headers: {
      'x-next-page': currentPage < pagesCount ? currentPage + 1 : currentPage,
      'x-page': currentPage,
      'x-pages-count': pagesCount,
      'x-per-page': perPage,
      'x-total-count': totalItems,
    },
    items: paginatedItems,
  };

  return response;
};
