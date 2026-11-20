import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    // In dev, forward /api to the local backend (in Docker, nginx does this)
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
