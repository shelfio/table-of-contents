/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  resolver: 'ts-jest-resolver',
  transformIgnorePatterns: ['node_modules/(?!(lodash-es)/)'],
};

export default config;
