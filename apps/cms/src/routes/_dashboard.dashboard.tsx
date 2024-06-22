import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';

export const Page = () => {
  return (
    <div>
      <h1 className="mb-8">Trang chủ</h1>
      <div className="text-center">
        <img width={900} alt="Background" className="inline-block" src="assets/images/dashboard2.jpg" />
      </div>
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
