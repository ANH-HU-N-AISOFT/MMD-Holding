import type { ParseKeys, TFunction } from 'i18next';

export const getRequiredMessage = <NameSpace extends ['common', ...any[]]>(
  t: TFunction<NameSpace>,
  key: ParseKeys<NameSpace>,
) => {
  const t_ = t as TFunction<['common']>;
  const type: any = t(key as any);
  return t_('common:type_required', { type: type?.toLowerCase?.() }).toString();
};
