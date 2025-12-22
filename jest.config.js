/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  resolver: 'ts-jest-resolver',
  // Allow transforming lodash-es (ESM) even when resolved via pnpm's store path.
  transformIgnorePatterns: ['node_modules/(?!.*lodash-es)'],
};

export default config;
