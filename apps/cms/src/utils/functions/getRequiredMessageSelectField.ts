import type { ParseKeys, TFunction } from 'i18next';

export const getRequiredMessageSelectField = <NameSpace extends ['common', ...any[]]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
) => {
  const t_ = t as TFunction<['common']>;
  const type: any = t(key as any);
  return t_('common:type_must_be_select', { type: type?.toLowerCase?.() }).toString();
};
