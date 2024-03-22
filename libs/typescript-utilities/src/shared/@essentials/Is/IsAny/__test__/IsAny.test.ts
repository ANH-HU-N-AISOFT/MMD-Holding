import { expectNotAssignable, expectType } from 'tsd';
import { IsAny } from '../src/IsAny';

type UnconstrainedType = any;
type Case1 = IsAny<UnconstrainedType>;
// Result type: true
const happyStandardCase: Case1 = true;
expectType<Case1>(happyStandardCase);

const happyErrorCase = {
  name: 'Lê Mạnh Tưởng',
};
expectNotAssignable<Case1>(happyErrorCase);
