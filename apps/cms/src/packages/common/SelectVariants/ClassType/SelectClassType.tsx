import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClassType } from './constants/ClassType';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getClassTypeMappingToLabels } from '~/packages/common/SelectVariants/ClassType/constants/ClassTypeMappingToLabels';

interface Props {
  classType?: ClassType;
  onChange?: SelectSingleProps<ClassType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectClassType = ({ classType, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const classTypeMappingToLabels = useMemo(() => {
    return getClassTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:classType.label')}
      value={classType}
      onChange={onChange}
      options={Object.values(ClassType).map(item => {
        return {
          label: classTypeMappingToLabels[item],
          searchValue: classTypeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
