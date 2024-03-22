import { expectNotAssignable, expectType } from 'tsd';
import { GetGeneric } from '../src/GetGeneric';

type Case1 = GetGeneric<'GENERIC'>;
const happyStandardCase: Case1 = 'GENERIC';
expectType<Case1>(happyStandardCase);

const happyErrorCase = {
  name: 'Lê Mạnh Tưởng',
};
expectNotAssignable<Case1>(happyErrorCase);
