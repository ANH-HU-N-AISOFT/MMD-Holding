import { TypeOf } from 'zod';
import { sessionSchema } from '../sessionStorage';

export type Session = TypeOf<typeof sessionSchema>;
