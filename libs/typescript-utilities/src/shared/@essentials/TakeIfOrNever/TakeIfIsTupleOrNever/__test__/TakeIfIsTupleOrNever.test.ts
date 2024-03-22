import { expectNotAssignable, expectType } from 'tsd';
import { TakeIfIsTupleOrNever } from '../src/TakeIfIsTupleOrNever';

type SomeTuple = [string, number];
type Case1 = TakeIfIsTupleOrNever<SomeTuple>; // Result type: [string, number]
const happyStandardCase1: Case1 = ['', 1];
expectType<Case1>(happyStandardCase1);

const happyErrorCase1 = {
  name: 'Lê Mạnh Tưởng',
};
expectNotAssignable<Case1>(happyErrorCase1);

// type Case2 = TakeIfIsTupleOrNever<SomeArray>; // Result type: never
