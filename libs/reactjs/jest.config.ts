import { Config } from 'jest';

const config: Config = {
  displayName: 'reactjs',
  preset: '../../jest.preset.js',
  coverageDirectory: './coverage/libs/reactjs',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.[jt]s?(x)', '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};

export default config;
