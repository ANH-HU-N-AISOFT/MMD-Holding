export const currencyFormatter = (value: number | undefined, withSymbol?: boolean): string | undefined => {
  if (!value) {
    return undefined;
  }
  return new Intl.NumberFormat('vi-VN', withSymbol ? { style: 'currency', currency: 'VND' } : undefined).format(value);
};
