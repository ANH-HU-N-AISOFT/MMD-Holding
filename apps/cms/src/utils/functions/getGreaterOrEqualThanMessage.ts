import type { ParseKeys, TFunction } from 'i18next';

export const getGreaterOrEqualThanMessage = <NameSpace extends ['common', ...any[]]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
  min: number,
) => {
  const t_ = t as TFunction<['common']>;
  return t_('common:type_greater_than_or_equal', { type: t(key as any), number: min }).toString();
};
