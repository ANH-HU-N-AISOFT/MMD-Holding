import { Contract } from '../models/Contract';
import { contracts } from './data';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';

export interface ResponseSuccess {
  items: Contract[];
  headers: ServiceHeaderResponse;
}

interface GetContracts {
  page?: number;
  perPage?: number;
  query?: string;
  startDate?: number;
  endDate?: number;
}
export const getContracts = async ({ startDate, endDate, page = 1, perPage = 20, query }: GetContracts) => {
  const filteredTemplates = contracts.filter(record => {
    let matchesQuery = true;
    const matchesCourses = true;
    let matchesCreatedAt = true;

    if (query) {
      matchesQuery =
        record.code.includes(query) ||
        record.studentPhone.includes(query) ||
        record.studentName.includes(query) ||
        !!(record.parentPhone && record.parentPhone.includes(query)) ||
        !!(record.parentName && record.parentName.includes(query));
    }

    if (startDate && endDate) {
      matchesCreatedAt =
        new Date(record.createdAt).getTime() >= new Date(startDate).getTime() &&
        new Date(record.createdAt).getTime() <= new Date(endDate).getTime();
    }

    return matchesQuery && matchesCourses && matchesCreatedAt;
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
