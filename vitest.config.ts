// vitest.config.ts
import { defineConfig } from 'vitest/config';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    test: {
        globals: true, // Use globals like describe, it, expect
        environment: 'jsdom', // or 'node', depending on your needs
        setupFiles: './setupTests.ts', // Optional: specify a setup file for your tests
        coverage: {
            provider: 'v8', // or 'istanbul'
            reporter: ['text', 'json', 'html'],
        },
        alias: {
            '@': resolve(__dirname, 'src'), // Ensure this matches your directory structure
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // Ensure the alias is also configured here
        },
    },
});