export const currencyParser = (value: string | null | undefined, locale = 'vi-VN'): number | undefined => {
  try {
    // for when the input gets clears
    if (typeof value === 'string' && !value.length) {
      value = '0.0';
    }

    // detecting and parsing between comma and dot
    const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    let reversedVal = value?.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal?.replace(new RegExp('\\' + decimal, 'g'), '.');
    //  => 1232.21 €

    // removing everything except the digits and dot
    reversedVal = reversedVal?.replace(/[^0-9.]/g, '');
    //  => 1232.21

    // appending digits properly
    const digitsAfterDecimalCount = (reversedVal?.split('.')[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = (Number(reversedVal) * Math.pow(10, digitsAfterDecimalCount - 2)).toString();
    }

    const result = Number(reversedVal);
    return Number.isNaN(result) ? undefined : result;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
