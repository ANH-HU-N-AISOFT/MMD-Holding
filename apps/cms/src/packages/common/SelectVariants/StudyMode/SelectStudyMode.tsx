import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StudyMode } from './constants/StudyMode';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getStudyModeMappingToLabels } from '~/packages/common/SelectVariants/StudyMode/constants/StudyModeMappingToLabels';

interface Props {
  studyMode?: StudyMode;
  onChange?: SelectSingleProps<StudyMode>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectStudyMode = ({ studyMode, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const studyModeMappingToLabels = useMemo(() => {
    return getStudyModeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:studyMode.label')}
      value={studyMode}
      onChange={onChange}
      options={Object.values(StudyMode).map(item => {
        return {
          label: studyModeMappingToLabels[item],
          searchValue: studyModeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};