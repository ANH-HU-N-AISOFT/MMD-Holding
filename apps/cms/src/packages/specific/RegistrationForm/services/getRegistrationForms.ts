import { RegistrationForm } from '../models/RegistrationForm';
import { registrationForms } from './data';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';

export interface ResponseSuccess {
  items: RegistrationForm[];
  headers: ServiceHeaderResponse;
}

interface GetRegistrationForms {
  page?: number;
  perPage?: number;
  query?: string;
  courseIds?: string[];
  createdAt?: number;
}
export const getRegistrationForms = async ({
  courseIds,
  createdAt,
  page = 1,
  perPage = 20,
  query,
}: GetRegistrationForms) => {
  const filteredTemplates = registrationForms.filter(record => {
    let matchesQuery = true;
    let matchesCourses = true;
    let matchesCreatedAt = true;

    if (query) {
      matchesQuery =
        record.code.includes(query) || record.studentPhone.includes(query) || record.studentName.includes(query);
    }

    if (courseIds) {
      matchesCourses = courseIds.every(courseId => {
        return record.courses.some(studentCourse => {
          return studentCourse.id.toString() === courseId.toString();
        });
      });
    }

    if (createdAt) {
      matchesCreatedAt = new Date(record.createdAt).getTime() >= new Date(createdAt).getTime();
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
