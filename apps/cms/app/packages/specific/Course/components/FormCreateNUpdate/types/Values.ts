import { TypeOf } from 'zod';
import { getCreateCourseZodSchema, getUpdateCourseZodSchema } from '../constants/zod';

export type FormCreateCourseValues = TypeOf<ReturnType<typeof getCreateCourseZodSchema>>;
export type FormUpdateCourseValues = TypeOf<ReturnType<typeof getUpdateCourseZodSchema>>;
