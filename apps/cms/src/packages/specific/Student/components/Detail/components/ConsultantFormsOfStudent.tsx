import { Student } from '../../../models/Student';
import { Table } from '~/packages/specific/ConsultantForm/components/Listing/Table';
import { useGetConsultantFormsOfStudent } from '~/packages/specific/ConsultantForm/hooks/useGetConsultantFormsOfStudent';

interface Props {
  student: Student;
}

export const ConsultantFormsOfStudent = ({ student }: Props) => {
  const { data, loading, page, changePage } = useGetConsultantFormsOfStudent({
    studentId: student.id,
  });

  return (
    <div>
      <Table
        hideColumnStudentName
        trialCreatable={false}
        paginationMode="none"
        currentPage={page}
        onChange={changePage}
        pageSize={data?.headers['x-per-page'] ?? 0}
        totalRecords={data?.headers['x-total-count'] ?? 0}
        loading={loading}
        dataSource={data?.items}
        deletable={false}
        editable={false}
        onView={record => window.open(`/appointment/${record.id}/detail`)}
      />
    </div>
  );
};
