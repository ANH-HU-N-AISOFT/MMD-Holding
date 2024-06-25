import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { GenderEnum } from './constants/GenderEnum';

interface Props {
  gender?: GenderEnum;
  onChange?: SelectSingleProps<GenderEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectGender = ({ gender, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);
  const genderMappingToLabels = useMemo(() => {
    return {
      [GenderEnum.MALE]: t('enum:gender.options.male'),
      [GenderEnum.FEMALE]: t('enum:gender.options.female'),
    };
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:gender.label')}
      value={gender}
      onChange={onChange}
      options={Object.values(GenderEnum).map(item => {
        return {
          label: genderMappingToLabels[item],
          searchValue: genderMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
