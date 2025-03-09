/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/app': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        headers: {
          Referer: 'http://localhost:8001'
        }
      }
    }
  }
})
