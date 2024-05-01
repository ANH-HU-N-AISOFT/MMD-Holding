import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { GenderEnum } from '~/packages/specific/Employee/models/Employee';

interface Props {
  gender?: GenderEnum;
  onChange?: SelectSingleProps<GenderEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectGender = ({ gender, disabled, allowClear, onChange }: Props) => {
  const { t } = useTranslation(['common', 'employee']);
  const genderMappingToLabels = useMemo(() => {
    return {
      [GenderEnum.MALE]: t('employee:genderLabels.male'),
      [GenderEnum.FEMALE]: t('employee:genderLabels.female'),
    };
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('employee:gender')}
      value={gender}
      onChange={onChange}
      options={Object.values(GenderEnum).map(item => {
        return {
          label: genderMappingToLabels[item],
          value: item,
        };
      })}
    />
  );
};
