import { ContractTemplate } from '../models/ContractTemplate';
import { contractTemplates } from './data';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';

export interface ResponseSuccess {
  items: ContractTemplate[];
  headers: ServiceHeaderResponse;
}

interface GetContractTemplates {
  query?: string;
  page?: number;
  perPage?: number;
}
export const getContractTemplates = async ({ page = 1, perPage = 20, query }: GetContractTemplates) => {
  // const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
  //   url: '/contract-templates',
  //   params: {
  //     page,
  //     query,
  //     perPage,
  //   },
  // });

  // return response.data;

  // Filter contract templates based on the query
  const filteredTemplates = query
    ? contractTemplates.filter(
        template =>
          template.name.toLowerCase().includes(query.toLowerCase()) ||
          template.description.toLowerCase().includes(query.toLowerCase()),
      )
    : contractTemplates;

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
