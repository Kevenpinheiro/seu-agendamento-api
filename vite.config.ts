import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      [
        'src/test/e2e/**',
        './prisma/vitest-environment-prisma/prisma-test-enviroment.ts',
      ],
    ],
    setupFiles: ['./src/test/setup.ts'],
  },
})
