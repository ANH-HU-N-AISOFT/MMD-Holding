import { Student } from '../../../models/Student';
import { Table } from '~/packages/specific/TrialRequest/components/Listing/Table';
import { useGetTrialRequestsOfStudent } from '~/packages/specific/TrialRequest/hooks/useGetTrialRequestsOfStudent';

interface Props {
  student: Student;
}

export const TrialRequestsOfStudent = ({ student }: Props) => {
  const { data, loading, page, changePage } = useGetTrialRequestsOfStudent({
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
        onView={record => window.open(`/trial-request/${record.id}/detail`)}
        onViewAdmin={record => window.open(`/employee/${record.admin?.id}/detail`)}
        onViewConsultant={record => window.open(`/employee/${record.consultant?.id}/detail`)}
        onViewLecture={record => window.open(`/employee/${record.lecturer?.id}/detail`)}
        onViewExpectLearningDepartment={record => {
          window.open(`/department/${record.learningOrganization?.id}/detail`);
        }}
      />
    </div>
  );
};
