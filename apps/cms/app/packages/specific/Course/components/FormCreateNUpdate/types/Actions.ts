import { FormCreateCourseValues, FormUpdateCourseValues } from './Values';

export interface FormCreateNUpdateCourseActions {
  open: (defaultValues?: FormCreateCourseValues | FormUpdateCourseValues) => void;
  close: () => void;
}
