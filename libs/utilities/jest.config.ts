import { Config } from 'jest';

const config: Config = {
  testEnvironment: './FixJSDOMEnvironment.ts',
  displayName: 'utilities',
  preset: '../../jest.preset.js',
  coverageDirectory: './coverage/libs/utilities',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.[jt]s?(x)', '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)'],
  setupFiles: ['jsdom-worker', 'fake-indexeddb/auto'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};

export default config;
