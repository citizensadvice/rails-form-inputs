export default {
  restoreMocks: true,
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@citizensadvice/form-to-rack-params.*)',
  ],
};
