import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';

export const Page = () => {
  return (
    <div>
      <h1 className="text-2xl">Tính năng đang phát triển</h1>
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
