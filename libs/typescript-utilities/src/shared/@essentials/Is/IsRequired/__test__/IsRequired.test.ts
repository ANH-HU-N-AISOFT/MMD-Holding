import { expectNotAssignable, expectType } from 'tsd';
import { IsRequired } from '../src/IsRequired';

interface UserProfile {
  id: number;
  name?: string;
  age: number;
}
type Case1 = IsRequired<UserProfile, 'name'>;
// Result type: false
const happyStandardCase: Case1 = false;
expectType<Case1>(happyStandardCase);

const happyErrorCase = {
  name: 'Lê Mạnh Tưởng',
};
expectNotAssignable<Case1>(happyErrorCase);
