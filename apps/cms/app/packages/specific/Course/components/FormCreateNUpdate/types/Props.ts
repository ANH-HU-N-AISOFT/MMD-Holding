import { FormCreateCourseValues, FormUpdateCourseValues } from './Values';

interface FormBaseProps {
  uid: string;
  isSubmiting: boolean;
}

export interface FormCreateCourseProps extends FormBaseProps {
  variant: 'Create';
  defaultValues?: Partial<FormCreateCourseValues>;
  fieldsError?: Partial<Record<keyof FormCreateCourseValues, string>>;
  onSubmit?: (values: FormCreateCourseValues) => void;
}
export interface FormUpdateCourseProps extends FormBaseProps {
  variant: 'Update';
  defaultValues?: Partial<FormUpdateCourseValues>;
  fieldsError?: Partial<Record<keyof FormUpdateCourseValues, string>>;
  onSubmit?: (values: FormUpdateCourseValues) => void;
}
export type FormCreateNUpdateCourseProps = FormCreateCourseProps | FormUpdateCourseProps;
