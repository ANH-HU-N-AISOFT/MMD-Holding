import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { Role } from './constants/Role';
import { getRoleMappingToLabels } from '~/packages/common/SelectVariants/Role/constants/RoleMappingToLabels';

interface Props {
  role?: Role;
  onChange?: SelectSingleProps<Role>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectRole = ({ role, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['enum']);
  const roleMappingToLabels = useMemo(() => {
    return getRoleMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:role.label')}
      value={role}
      onChange={onChange}
      options={Object.values(Role).map(item => {
        return {
          label: roleMappingToLabels[item as keyof typeof roleMappingToLabels],
          value: item,
          rawData: item,
          hidden: [Role.SuperAdmin].includes(item),
        };
      })}
    />
  );
};
