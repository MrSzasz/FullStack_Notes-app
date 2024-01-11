import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['**/src/**/*.{ts,tsx}'],
      exclude: [
        '**/src/components/ui/**.*',
        '**/src/app/layout.tsx',
        '**/src/app/page.tsx',
        '**/src/components/theme-provider.tsx',
        '**/src/types/**',
        '**/src/types/*.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
