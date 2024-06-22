import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as CourseRoadmapList from './src/_dashboard.course-roadmap';
import * as DeleteCourseRoadmap from './src/_dashboard.course-roadmap.$id.delete';
import * as CourseRoadmapDetail from './src/_dashboard.course-roadmap.$id.detail';
import * as EditCourseRoadmap from './src/_dashboard.course-roadmap.$id.edit';
import * as CreateCourseRoadmap from './src/_dashboard.course-roadmap.create';
import * as ExportCourseRoadmaps from './src/_dashboard.course-roadmap.export';

const CourseRoadmapRoutes: RouteObject[] = [
  {
    path: '/course-roadmap',
    loader: CourseRoadmapList.loader,
    shouldRevalidate: CourseRoadmapList.shouldRevalidate,
    errorElement: <CourseRoadmapList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <CourseRoadmapList.Page />
      </Suspense>
    ),
  },
  {
    path: '/course-roadmap/:id/detail',
    loader: CourseRoadmapDetail.loader,
    shouldRevalidate: CourseRoadmapDetail.shouldRevalidate,
    element: <CourseRoadmapDetail.Page />,
    errorElement: <CourseRoadmapDetail.ErrorBoundary />,
  },
  {
    path: '/course-roadmap/:id/edit',
    loader: EditCourseRoadmap.loader,
    action: EditCourseRoadmap.action,
    shouldRevalidate: EditCourseRoadmap.shouldRevalidate,
    element: <EditCourseRoadmap.Page />,
    errorElement: <EditCourseRoadmap.ErrorBoundary />,
  },
  {
    path: '/course-roadmap/create',
    action: CreateCourseRoadmap.action,
    shouldRevalidate: CreateCourseRoadmap.shouldRevalidate,
    element: <CreateCourseRoadmap.Page />,
    errorElement: <CreateCourseRoadmap.ErrorBoundary />,
  },
  {
    path: '/course-roadmap/export',
    action: ExportCourseRoadmaps.action,
  },
  {
    path: '/course-roadmap/:id/delete',
    action: DeleteCourseRoadmap.action,
  },
];

export default CourseRoadmapRoutes;
