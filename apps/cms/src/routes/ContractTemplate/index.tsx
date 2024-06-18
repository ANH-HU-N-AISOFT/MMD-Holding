import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as ContractTemplateList from './src/_dashboard.contract-template';
import * as DeleteContractTemplate from './src/_dashboard.contract-template.$id.delete';
import * as ContractTemplateDetail from './src/_dashboard.contract-template.$id.detail';
import * as EditContractTemplate from './src/_dashboard.contract-template.$id.edit';
import * as CreateContractTemplate from './src/_dashboard.contract-template.create';
import * as ExportContractTemplates from './src/_dashboard.contract-template.export';

const ContractTemplateRoutes: RouteObject[] = [
  {
    path: '/contract-template',
    loader: ContractTemplateList.loader,
    shouldRevalidate: ContractTemplateList.shouldRevalidate,
    errorElement: <ContractTemplateList.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <ContractTemplateList.Page />
      </Suspense>
    ),
  },
  {
    path: '/contract-template/:id/detail',
    loader: ContractTemplateDetail.loader,
    element: <ContractTemplateDetail.Page />,
    errorElement: <ContractTemplateDetail.ErrorBoundary />,
  },
  {
    path: '/contract-template/:id/edit',
    loader: EditContractTemplate.loader,
    action: EditContractTemplate.action,
    shouldRevalidate: EditContractTemplate.shouldRevalidate,
    element: <EditContractTemplate.Page />,
    errorElement: <EditContractTemplate.ErrorBoundary />,
  },
  {
    path: '/contract-template/create',
    action: CreateContractTemplate.action,
    element: <CreateContractTemplate.Page />,
    errorElement: <CreateContractTemplate.ErrorBoundary />,
  },
  {
    path: '/contract-template/export',
    action: ExportContractTemplates.action,
  },
  {
    path: '/contract-template/:id/delete',
    action: DeleteContractTemplate.action,
  },
];

export default ContractTemplateRoutes;
