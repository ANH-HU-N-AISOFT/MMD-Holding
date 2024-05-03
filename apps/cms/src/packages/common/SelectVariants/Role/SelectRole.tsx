import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Role } from './constants/Role';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getRoleMappingToLabels } from '~/packages/common/SelectVariants/Role/constants/RoleMappingToLabels';

interface Props {
  role?: Role;
  onChange?: SelectSingleProps<Role>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectRole = ({ role, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);
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
          label: roleMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
