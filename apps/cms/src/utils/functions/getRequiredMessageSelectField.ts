import type { ParseKeys, TFunction } from 'i18next';

export const getRequiredMessageSelectField = <NameSpace extends ['common', ...any[]]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
) => {
  const t_ = t as TFunction<['common']>;
  return t_('common:type_must_be_select', { type: t(key as any)?.toLowerCase?.() }).toString();
};
