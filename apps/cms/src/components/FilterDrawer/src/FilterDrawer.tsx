import { FilterOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../AntCustom/Button';
import type { ReactNode } from 'react';
import './styles.css';

interface Props {
  children?: ReactNode;
  formId: string;
  count: number;
  onReset?: () => void;
  onApply?: () => void;
  isLoading?: boolean;
  containerClassName?: string;
}
export const FilterDrawer = ({ containerClassName, children, count, formId, onApply, onReset, isLoading }: Props) => {
  const { t } = useTranslation(['components']);

  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    onReset?.();
    setIsOpen(false);
  };

  const handleApply = () => {
    onApply?.();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        className={containerClassName}
        size="large"
        onClick={() => setIsOpen(true)}
        disabled={isLoading}
        icon={<FilterOutlined />}
      >
        <div
          className={classNames(
            'py-1 px-2 text-white font-medium rounded-md flex items-center justify-center text-xs bg-brand-base',
            { hidden: !count },
          )}
        >
          {count}
        </div>
      </Button>
      <Drawer
        className="FilterDrawer__container"
        footer={
          <div className="flex gap-2 items-center justify-end">
            <Button disabled={isLoading} onClick={handleReset} danger htmlType="reset" form={formId}>
              {t('components:FilterDrawer.reset')}
            </Button>
            <Button loading={isLoading} onClick={handleApply} type="primary" htmlType="submit" form={formId}>
              {t('components:FilterDrawer.apply')}
            </Button>
          </div>
        }
        title={t('components:FilterDrawer.filter')}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Drawer>
    </>
  );
};
