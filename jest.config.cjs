module.exports = {
  preset: 'vite-jest',
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS modules
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Transform JS and JSX files using Babel
    '^.+\\.ts$': 'ts-jest', // For TypeScript support
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Set up file for jest-dom
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
    // If you're using TypeScript, ensure the following:
    globals: {
        'ts-jest': {
            useESM: true, // If you are using ES modules
        },
    },
};