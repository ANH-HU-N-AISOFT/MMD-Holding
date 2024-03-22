import { TypeOf } from 'zod';
import { getFormLoginZodSchema } from '../constants/zod';

export type FormLoginValues = TypeOf<ReturnType<typeof getFormLoginZodSchema>>;
