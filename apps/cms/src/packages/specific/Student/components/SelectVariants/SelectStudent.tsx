import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Empty,
  IconAddLinear,
  Modal,
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
  notification,
} from 'reactjs';
import { createStudent } from '../../services/createStudent';
import { formMutationValuesToCreateStudentService } from '../../utils/formMutationValuesToCreateStudentService';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';
import { GetAllParams } from '~/constants/GetAllParams';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudents } from '~/packages/specific/Student/services/getStudents';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

interface Props {
  student?: Student['id'];
  onChange?: SelectSingleDecouplingProps<Student, Student['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  label?: (student: Student) => string;
}

const FormCreateUid = 'FormCreateUid';
export const SelectStudent = ({ disabled, student, allowClear = true, placeholder, onChange, label }: Props) => {
  const { t } = useTranslation(['student', 'components']);

  const transformToOption: SelectSingleDecouplingProps<Student, Student['id']>['transformToOption'] = student => {
    const display = label ? label(student) : [student.fullName, student.phoneNumber].filter(Boolean).join(' - ');
    return {
      label: display,
      searchValue: display,
      value: student.id,
      rawData: student,
    };
  };

  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateStudent = async (data: FormValues) => {
    try {
      const student = await createStudent(formMutationValuesToCreateStudentService(data));
      notification.success({
        message: t('student:create_success'),
      });
      onChange?.(student.id, transformToOption(student));
    } catch (error) {
      const message = handleGetMessageToToast(t, await handleCatchClauseSimpleAtClient(error));
      notification.error({
        message: t('student:create_failure'),
        description: message,
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <SelectSingleDecoupling<Student, Student['id']>
        notFoundContent={
          <div className="just-center flex flex-col items-center gap-2">
            <Empty description={t('components:Listing.Table.empty')} />
            <Button
              loading={isCreating}
              onClick={() => setIsOpenFormCreate(true)}
              color="primary"
              icon={<IconAddLinear className="text-lg" />}
            >
              {t('student:add_new')}
            </Button>
          </div>
        }
        allowClear={allowClear}
        placeholder={placeholder ?? t('student:student')}
        disabled={disabled}
        value={student}
        onChange={onChange}
        service={async () => {
          const response = await getStudents({
            ...GetAllParams,
            sortByName: 1,
          });
          return response.items;
        }}
        transformToOption={transformToOption}
        className="w-full"
      />
      <Modal
        centered
        title={t('student:add_student')}
        zIndex={999999}
        width="100dvw"
        onCancel={() => setIsOpenFormCreate(false)}
        open={isOpenFormCreate}
        okButtonProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onOk={() => undefined}
      >
        <FormMutation
          onSubmit={handleCreateStudent}
          student={undefined}
          defaultValues={{
            personalInformation: {
              notifyResultToParent: false,
              departments: getSession()?.profile?.organizationId ? [getSession()?.profile?.organizationId] : [],
            },
            roleSystem: {
              accessStatus: SystemAccessStatus.GRANTED,
              password: 'Abc@123456',
            },
          }}
          isSubmiting={isCreating}
          uid={FormCreateUid}
        />
      </Modal>
    </>
  );
};
