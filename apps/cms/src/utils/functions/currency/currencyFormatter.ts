export const currencyFormatter =
  (locale = 'vi-VN') =>
  (value: number | undefined): string | undefined => {
    if (!value) {
      return undefined;
    }
    return new Intl.NumberFormat(locale).format(value);
  };
