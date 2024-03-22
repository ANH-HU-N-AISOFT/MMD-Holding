import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Course } from '../../models/Course';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';

export interface ConfirmDeleteActions {
  open: (record: Course) => void;
  close: () => void;
}

export interface ConfirmDeleteProps {
  onSubmit: (record: Course) => void;
}
export const ConfirmDelete = forwardRef<ConfirmDeleteActions, ConfirmDeleteProps>(({ onSubmit }, ref) => {
  const { t } = useTranslation(['courses']);
  const [openState, setOpenState] = useState<Course | null>(null);

  const handleClose = () => {
    setOpenState(null);
  };

  const handleOk = () => {
    if (openState) {
      onSubmit?.(openState);
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: record => {
          setOpenState(record);
        },
        close: () => {
          handleClose();
        },
      };
    },
    [],
  );

  return (
    <ModalConfirmDelete
      title={t('courses:delete_title')}
      description={t('courses:delete_description')}
      open={!!openState}
      onCancel={handleClose}
      onOk={handleOk}
    />
  );
});

ConfirmDelete.displayName = 'ConfirmDelete';
