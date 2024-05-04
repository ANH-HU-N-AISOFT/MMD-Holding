import { AxiosResponse } from 'axios';
import { Department } from '../models/Department';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { BusinessStatusEnum } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusEnum';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Department[];
  headers: ServiceHeaderResponse;
}

interface GetDepartments {
  query?: string;
  businessStatus?: BusinessStatusEnum;
  page?: number;
  perPage?: number;
  isManagementUnit?: boolean;
  sortByName?: 1 | -1;
}
export const getDepartments = async ({
  businessStatus,
  page,
  query,
  perPage,
  isManagementUnit,
  sortByName,
}: GetDepartments) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/organizations',
    params: {
      businessStatus,
      page,
      query,
      perPage,
      isManagementUnit,
      sortByName,
    },
  });

  return response.data;
};
