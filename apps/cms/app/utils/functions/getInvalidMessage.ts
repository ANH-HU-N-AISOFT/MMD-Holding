import type { ParseKeys, TFunction } from 'i18next';

export const getInvalidMessage = <NameSpace extends ['common', ...any[]]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
) => {
  const t_ = t as TFunction<['common']>;
  return t_('common:type_invalid', { type: t(key as any) }).toString();
};
