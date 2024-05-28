import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LearningType } from './constants/LearningType';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getLearningTypeMappingToLabels } from '~/packages/common/SelectVariants/LearningType/constants/LearningTypeMappingToLabels';

interface Props {
  learningType?: LearningType;
  onChange?: SelectSingleProps<LearningType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectLearningType = ({ learningType, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const learningTypeMappingToLabels = useMemo(() => {
    return getLearningTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:learningType.label')}
      value={learningType}
      onChange={onChange}
      options={Object.values(LearningType).map(item => {
        return {
          label: learningTypeMappingToLabels[item],
          searchValue: learningTypeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
