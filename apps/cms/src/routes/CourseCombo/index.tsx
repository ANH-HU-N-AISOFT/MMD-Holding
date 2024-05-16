import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as CourseComboList from './src/_dashboard.course-combo';
import * as DeleteCourseCombo from './src/_dashboard.course-combo.$id.delete';
import * as CourseComboDetail from './src/_dashboard.course-combo.$id.detail';
import * as EditCourseCombo from './src/_dashboard.course-combo.$id.edit';
import * as CreateCourseCombo from './src/_dashboard.course-combo.create';
import * as ExportCourseCombos from './src/_dashboard.course-combo.export';

const CourseComboRoutes: RouteObject[] = [
  {
    path: '/course-combo',
    loader: CourseComboList.loader,
    shouldRevalidate: CourseComboList.shouldRevalidate,
    errorElement: <CourseComboList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <CourseComboList.Page />
      </Suspense>
    ),
  },
  {
    path: '/course-combo/:id/detail',
    loader: CourseComboDetail.loader,
    element: <CourseComboDetail.Page />,
    errorElement: <CourseComboDetail.ErrorBoundary />,
  },
  {
    path: '/course-combo/:id/edit',
    loader: EditCourseCombo.loader,
    action: EditCourseCombo.action,
    shouldRevalidate: EditCourseCombo.shouldRevalidate,
    element: <EditCourseCombo.Page />,
    errorElement: <EditCourseCombo.ErrorBoundary />,
  },
  {
    path: '/course-combo/create',
    action: CreateCourseCombo.action,
    element: <CreateCourseCombo.Page />,
    errorElement: <CreateCourseCombo.ErrorBoundary />,
  },
  {
    path: '/course-combo/export',
    action: ExportCourseCombos.action,
  },
  {
    path: '/course-combo/:id/delete',
    action: DeleteCourseCombo.action,
  },
];

export default CourseComboRoutes;
