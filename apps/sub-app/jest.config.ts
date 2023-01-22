export default {
  roots: ['<rootDir>/src', '<rootDir>/tests/__tests__'],
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src', 'tests'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  testMatch: [
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/tests/server/',
    '<rootDir>/tests/__mocks__/',
    '/node_modules/',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: ['<rootDir>/tests/__mocks__/', '/node_modules/'],
  moduleNameMapper: {
    '\\.(vs|fs|vert|frag|glsl|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/file-mock.ts',
    '\\.(sass|s?css|less)$': '<rootDir>/tests/__mocks__/style-mock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.(t|j)sx?'],
  coveragePathIgnorePatterns: ['^.+\\.d\\.ts$'],
  coverageProvider: 'v8',
  /** Link: [setup](tests/jest.setup.ts) */
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
};
