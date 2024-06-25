import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getStudyModeMappingToLabels } from '../../constants/StudyModeMappingToLabels';
import { StudyMode } from '../../models/StudyMode';

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
