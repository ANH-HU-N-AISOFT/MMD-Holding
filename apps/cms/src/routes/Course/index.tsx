import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as CourseList from './src/_dashboard.course';
import * as DeleteCourse from './src/_dashboard.course.$id.delete';
import * as CourseDetail from './src/_dashboard.course.$id.detail';
import * as EditCourse from './src/_dashboard.course.$id.edit';
import * as CreateCourse from './src/_dashboard.course.create';
import * as ExportCourses from './src/_dashboard.course.export';

const CourseRoutes: RouteObject[] = [
  {
    path: '/course',
    loader: CourseList.loader,
    shouldRevalidate: CourseList.shouldRevalidate,
    errorElement: <CourseList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <CourseList.Page />
      </Suspense>
    ),
  },
  {
    path: '/course/:id/detail',
    loader: CourseDetail.loader,
    element: <CourseDetail.Page />,
    errorElement: <CourseDetail.ErrorBoundary />,
  },
  {
    path: '/course/:id/edit',
    loader: EditCourse.loader,
    action: EditCourse.action,
    shouldRevalidate: EditCourse.shouldRevalidate,
    element: <EditCourse.Page />,
    errorElement: <EditCourse.ErrorBoundary />,
  },
  {
    path: '/course/create',
    action: CreateCourse.action,
    element: <CreateCourse.Page />,
    errorElement: <CreateCourse.ErrorBoundary />,
  },
  {
    path: '/course/export',
    action: ExportCourses.action,
  },
  {
    path: '/course/:id/delete',
    action: DeleteCourse.action,
  },
];

export default CourseRoutes;
