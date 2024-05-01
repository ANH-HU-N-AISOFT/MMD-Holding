import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectMultiple, SelectMultipleProps } from '~/components/AntCustom/Select';
import { getRoleMappingToLabels } from '~/packages/specific/Employee/constants/RoleMappingToLabels';
import { Role } from '~/packages/specific/Employee/models/Employee';

interface Props {
  roles?: Role[];
  onChange?: SelectMultipleProps<Role[]>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectRoles = ({ roles, disabled, allowClear, onChange }: Props) => {
  const { t } = useTranslation(['common', 'employee']);
  const roleMappingToLabels = useMemo(() => {
    return getRoleMappingToLabels(t);
  }, [t]);

  return (
    <SelectMultiple
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('employee:role')}
      value={roles}
      onChange={onChange}
      options={Object.values(Role).map(item => {
        return {
          label: roleMappingToLabels[item],
          value: item,
        };
      })}
    />
  );
};
