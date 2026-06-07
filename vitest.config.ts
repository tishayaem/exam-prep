import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Separate from vite.config.ts so the build config stays focused. The React
// plugin is needed because the data modules under test import section files,
// which in turn import diagram .tsx components (JSX must be transformed even
// though the tests never render them).
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
