export const removeEmptyStringKeys = <T extends Record<string, any>>(obj: T): T => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Recursively remove empty string keys in nested objects
        newObj[key] = removeEmptyStringKeys(obj[key]);
      } else if (obj[key] !== '') {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj as T;
};
