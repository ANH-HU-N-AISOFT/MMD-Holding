import type { ParseKeys, TFunction } from 'i18next';

export const getRangeLengthMessage = <NameSpace extends ['common', ...any[]]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
  from: number,
  to: number,
) => {
  const t_ = t as TFunction<['common']>;
  return t_('common:range_length', { type: t(key as any), from, to }).toString();
};
