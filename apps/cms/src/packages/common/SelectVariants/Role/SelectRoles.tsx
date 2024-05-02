import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Role } from './constants/Role';
import { SelectMultiple, SelectMultipleProps } from '~/components/AntCustom/Select';
import { getRoleMappingToLabels } from '~/packages/common/SelectVariants/Role/constants/RoleMappingToLabels';

interface Props {
  roles?: Role[];
  onChange?: SelectMultipleProps<Role[]>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectRoles = ({ roles, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);
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
          label: roleMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
