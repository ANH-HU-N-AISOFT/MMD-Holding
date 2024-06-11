import { Student } from '../../../models/Student';
import { Table } from '~/packages/specific/Appointment/components/Listing/Table';
import { useGetAppointmentsOfStudent } from '~/packages/specific/Appointment/hooks/useGetAppointmentsOfStudent';

interface Props {
  student: Student;
}

export const AppointmentsOfStudent = ({ student }: Props) => {
  const { data, loading, page, changePage } = useGetAppointmentsOfStudent({
    studentId: student.id,
  });

  return (
    <div>
      <Table
        hideColumnStudentName
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
        onViewExpectInspectationDepartment={record => window.open(`/department/${record.organization?.id}/detail`)}
        onViewAdmin={record => window.open(`/employee/${record.admin?.id}/detail`)}
        onViewTester={record => window.open(`/employee/${record.tester?.id}/detail`)}
        onViewConsultant={record => window.open(`/employee/${record.consultant?.id}/detail`)}
      />
    </div>
  );
};
