import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectMultiple, SelectMultipleProps } from 'reactjs';
import { Role } from './constants/Role';
import { getRoleMappingToLabels } from '~/packages/common/SelectVariants/Role/constants/RoleMappingToLabels';

interface Props {
  roles?: Role[];
  onChange?: SelectMultipleProps<Role[]>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  ignoreRoles?: Role[];
}

export const SelectRoles = ({ roles, disabled, allowClear = true, onChange, ignoreRoles = [] }: Props) => {
  const { t } = useTranslation(['enum']);
  const roleMappingToLabels = useMemo(() => {
    return getRoleMappingToLabels(t);
  }, [t]);

  return (
    <SelectMultiple
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:role.label')}
      value={roles}
      onChange={onChange}
      options={Object.values(Role).map(item => {
        return {
          label: roleMappingToLabels[item as keyof typeof roleMappingToLabels],
          value: item,
          rawData: item,
          hidden: [...ignoreRoles, Role.SuperAdmin]?.includes(item),
        };
      })}
    />
  );
};
