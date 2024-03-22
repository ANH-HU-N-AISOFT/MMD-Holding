import { expectNotAssignable, expectType } from 'tsd';
import { IsUnknown } from '../src/IsUnknown';

type AmbiguousType = unknown;
type Case1 = IsUnknown<AmbiguousType>;
// Result type:
// true
const happyStandardCase: Case1 = true;
expectType<Case1>(happyStandardCase);

const happyErrorCase = {
  name: 'Lê Mạnh Tưởng',
};
expectNotAssignable<Case1>(happyErrorCase);
