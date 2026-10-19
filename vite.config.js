import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // Forces Vite to error out if port 5173 is busy instead of silently failing on another port
    host: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      clientPort: 5173, // Ensures browser connects to the right WebSocket
    },
  },
})