import { Department } from '../../../models/Department';
import { FormSearchNFilter } from '~/packages/specific/Department/components/Listing/FormSearchNFilter';
import { Table } from '~/packages/specific/Department/components/Listing/Table';
import { useGetDepartmentsOfDepartment } from '~/packages/specific/Department/hooks/useGetDepartmentsOfDepartment';

interface Props {
  department: Department;
}

export const SubDepartmentsOfDepartment = ({ department }: Props) => {
  const { data, loading, page, changePage, search, changeSearch } = useGetDepartmentsOfDepartment({
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
        hideColumnManageDepartment
        paginationMode="none"
        currentPage={page}
        onChange={changePage}
        pageSize={data?.headers['x-per-page'] ?? 0}
        totalRecords={data?.headers['x-total-count'] ?? 0}
        loading={loading}
        dataSource={data?.items}
        deletable={false}
        editable={false}
        onView={record => window.open(`/department/${record.id}/detail`)}
        onViewManageDepartment={record => window.open(`/department/${record.managementUnit?.id}/detail`)}
        onViewPresentDepartment={record => window.open(`/employee/${record.unitManager?.employeeId}/detail`)}
      />
    </div>
  );
};
