module.exports = {
    testEnvironment: 'jsdom', // Use jsdom for testing React components
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS modules
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // Transform JS and JSX files using Babel
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Set up file for jest-dom
  };