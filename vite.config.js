import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    origin: 'https://crepe-oozy-sampling.ngrok-free.dev',
    hmr: {
      host: 'crepe-oozy-sampling.ngrok-free.dev',
      protocol: 'wss',
      clientPort: 443
    },
    allowedHosts: [
      'crepe-oozy-sampling.ngrok-free.dev'
    ]
  }
})