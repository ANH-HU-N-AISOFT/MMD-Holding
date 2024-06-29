export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  const appendFormData = (data: any, rootKey: string | null = null) => {
    if (data === undefined || data === null) {
      return;
    }

    if (data instanceof File) {
      if (rootKey) {
        formData.append(rootKey, data);
      }
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        appendFormData(item, rootKey ? `${rootKey}[${index}]` : String(index));
      });
    } else if (typeof data === 'object') {
      Object.keys(data).forEach(key => {
        const value = data[key];
        appendFormData(value, rootKey ? `${rootKey}[${key}]` : key);
      });
    } else if (rootKey) {
      formData.append(rootKey, data);
    }
  };

  appendFormData(obj);

  return formData;
};
