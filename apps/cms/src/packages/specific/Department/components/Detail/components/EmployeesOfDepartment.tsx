import { Department } from '../../../models/Department';
import { RecordsPerPage } from '~/constants/RecordsPerPage';
import { FormSearchNFilter } from '~/packages/specific/Employee/components/Listing/FormSearchNFilter';
import { Table } from '~/packages/specific/Employee/components/Listing/Table';
import { useGetEmployeesOfDepartment } from '~/packages/specific/Employee/hooks/useGetEmployeesOfDepartment';

interface Props {
  department: Department;
}

export const EmployeesOfDepartment = ({ department }: Props) => {
  const { data, loading, page, changePage, search, changeSearch } = useGetEmployeesOfDepartment({
    departmentId: department.id,
  });

  return (
    <div>
      <FormSearchNFilter
        containerClassName="justify-end mb-1"
        searchValue={search}
        isSubmiting={loading}
        onSearch={value => changeSearch(value)}
        hideFilter
      />
      <Table
        hideColumnDepartment
        paginationMode="none"
        currentPage={page}
        onChange={changePage}
        pageSize={RecordsPerPage}
        totalRecords={data?.total ?? 0}
        loading={loading}
        dataSource={data?.items}
        deletable={false}
        editable={false}
        onView={record => window.open(`/employee/${record.employeeId}/detail`)}
      />
    </div>
  );
};
