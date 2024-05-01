// Khi submit form data sẽ luôn là object string và nested object string
// => JSON.stringify rồi gửi lên server parse để giữ lại data type primitive
const encrypt = (value: any) => {
  return { json: JSON.stringify(value) };
};

const decrypt = async <RT>(request: Request): Promise<RT | undefined> => {
  const formData = await request.formData();
  const requestJson = formData.get('json')?.toString();
  if (requestJson) {
    const values = JSON.parse(requestJson);
    return values as RT;
  }
  return undefined;
};

export const fetcherFormData = {
  encrypt,
  decrypt,
};
