import { Config } from 'jest';

const config: Config = {
  displayName: 'remixjs',
  preset: '../../jest.preset.js',
  coverageDirectory: './coverage/libs/remixjs',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.[jt]s?(x)', '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)'],
  testEnvironment: 'jsdom',
};

export default config;
