export const removeEmptyStringKeys = <T extends Record<string, any>>(obj: T, setNull?: boolean): T => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
        newObj[key] = removeEmptyStringKeys(obj[key], setNull);
      } else if (obj[key] === '' && setNull) {
        newObj[key] = null;
      } else if (obj[key] !== '') {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj as T;
};
