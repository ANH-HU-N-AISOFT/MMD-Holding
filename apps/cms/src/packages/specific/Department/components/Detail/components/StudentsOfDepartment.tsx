import { Department } from '../../../models/Department';
import { RecordsPerPage } from '~/constants/RecordsPerPage';
import { FormSearchNFilter } from '~/packages/specific/Student/components/Listing/FormSearchNFilter';
import { Table } from '~/packages/specific/Student/components/Listing/Table';
import { useGetStudentsOfDepartment } from '~/packages/specific/Student/hooks/useGetStudentsOfDepartment';

interface Props {
  department: Department;
}

export const StudentsOfDepartment = ({ department }: Props) => {
  const { data, loading, page, changePage, search, changeSearch } = useGetStudentsOfDepartment({
    departmentCode: department.code,
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
        appointmentBookable={false}
        consultantCreatable={false}
        departmentViewable={false}
        trialCreatable={false}
        onView={record => window.open(`/student/${record.id}/detail`)}
      />
    </div>
  );
};
