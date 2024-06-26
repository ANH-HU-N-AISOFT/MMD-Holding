import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as StudentList from './src/_dashboard.student';
import * as DeleteStudent from './src/_dashboard.student.$id.delete';
import * as StudentDetail from './src/_dashboard.student.$id.detail';
import * as EditStudent from './src/_dashboard.student.$id.edit';
import * as ResetPasswordStudent from './src/_dashboard.student.$id.reset-password';
import * as CreateStudent from './src/_dashboard.student.create';
import * as ExportStudents from './src/_dashboard.student.export';

const StudentRoutes: RouteObject[] = [
  {
    path: '/student',
    loader: StudentList.loader,
    shouldRevalidate: StudentList.shouldRevalidate,
    errorElement: <StudentList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <StudentList.Page />
      </Suspense>
    ),
  },
  {
    path: '/student/:id/detail',
    loader: StudentDetail.loader,
    shouldRevalidate: StudentDetail.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <StudentDetail.Page />
      </Suspense>
    ),
    errorElement: <StudentDetail.ErrorBoundary />,
  },
  {
    path: '/student/:id/edit',
    loader: EditStudent.loader,
    action: EditStudent.action,
    shouldRevalidate: EditStudent.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <EditStudent.Page />
      </Suspense>
    ),
    errorElement: <EditStudent.ErrorBoundary />,
  },
  {
    path: '/student/create',
    loader: CreateStudent.loader,
    action: CreateStudent.action,
    shouldRevalidate: CreateStudent.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <CreateStudent.Page />
      </Suspense>
    ),
    errorElement: <CreateStudent.ErrorBoundary />,
  },
  {
    path: '/student/export',
    action: ExportStudents.action,
  },
  {
    path: '/student/:id/delete',
    action: DeleteStudent.action,
  },
  {
    path: '/student/:id/reset-password',
    action: ResetPasswordStudent.action,
  },
];

export default StudentRoutes;
