import { defineConfig } from 'eslint-define-config';

export default defineConfig({
    env: {
        browser: true, // Enables browser global variables
        es2021: true,  // Allows ES2021 syntax
        node: true,    // Enables Node.js global variables
    },
    extends: [
        'eslint:recommended',                   // Use recommended ESLint rules
        'plugin:react/recommended',             // Use recommended React rules
        'plugin:@typescript-eslint/recommended', // Use recommended TypeScript rules
        'plugin:prettier/recommended',          // Use Prettier rules
    ],
    parser: '@typescript-eslint/parser',       // Specify ESLint parser for TypeScript
    parserOptions: {
        ecmaVersion: 12,                        // Allow modern ECMAScript features
        sourceType: 'module',                   // Allows using import/export
    },
    plugins: ['react', '@typescript-eslint', 'prettier'], // Enable the necessary plugins
    rules: {
        'react/react-in-jsx-scope': 'off',     // Not needed in React 17+
        'no-unused-vars': 'warn',               // Warn about unused variables
        '@typescript-eslint/no-unused-vars': ['warn'], // Warn for unused vars in TypeScript
        'prettier/prettier': 'error',           // Show Prettier issues as ESLint errors
        // Add more custom rules as needed
    },
    settings: {
        react: {
            version: 'detect',                   // Automatically detect React version
        },
    },
});
