module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/tests/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
