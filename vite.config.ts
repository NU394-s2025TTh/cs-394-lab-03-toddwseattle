/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'], // Include test files in the src directory
    setupFiles: './vitest.setup.ts', // Add the setup file
  },
  plugins: [react()],
});
