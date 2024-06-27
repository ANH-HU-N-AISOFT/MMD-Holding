import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DocumentTemplateList from './src/_dashboard.document-template';
import * as DeleteDocumentTemplate from './src/_dashboard.document-template.$id.delete';
import * as DocumentTemplateDetail from './src/_dashboard.document-template.$id.detail';
import * as EditDocumentTemplate from './src/_dashboard.document-template.$id.edit';
import * as CreateDocumentTemplate from './src/_dashboard.document-template.create';

const DocumentTemplateRoutes: RouteObject[] = [
  {
    path: '/document-template',
    loader: DocumentTemplateList.loader,
    shouldRevalidate: DocumentTemplateList.shouldRevalidate,
    errorElement: <DocumentTemplateList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <DocumentTemplateList.Page />
      </Suspense>
    ),
  },
  {
    path: '/document-template/:id/detail',
    loader: DocumentTemplateDetail.loader,
    shouldRevalidate: DocumentTemplateDetail.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <DocumentTemplateDetail.Page />
      </Suspense>
    ),
    errorElement: <DocumentTemplateDetail.ErrorBoundary />,
  },
  {
    path: '/document-template/:id/edit',
    loader: EditDocumentTemplate.loader,
    action: EditDocumentTemplate.action,
    shouldRevalidate: EditDocumentTemplate.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <EditDocumentTemplate.Page />
      </Suspense>
    ),
    errorElement: <EditDocumentTemplate.ErrorBoundary />,
  },
  {
    path: '/document-template/create',
    action: CreateDocumentTemplate.action,
    shouldRevalidate: CreateDocumentTemplate.shouldRevalidate,
    element: (
      <Suspense fallback={null}>
        <CreateDocumentTemplate.Page />
      </Suspense>
    ),
    errorElement: <CreateDocumentTemplate.ErrorBoundary />,
  },
  // {
  //   path: '/document-template/export',
  //   action: ExportDocumentTemplates.action,
  // },
  {
    path: '/document-template/:id/delete',
    action: DeleteDocumentTemplate.action,
  },
];

export default DocumentTemplateRoutes;
