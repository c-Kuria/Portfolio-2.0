import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-swipeable-views', 'react-swipeable-views-utils'],
    force: true
  },
  server: {
    hmr: true
  }
})
