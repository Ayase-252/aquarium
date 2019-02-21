module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/tests/**/*.spec.(ts|js)'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,ts}', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: '.coverage'
}
