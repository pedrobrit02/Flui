import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mantenha apenas esta configuração única:
export default defineConfig({
  plugins: [react()],
  base: './', 
})