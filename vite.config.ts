import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/self_recorder-frontend/',
  server: {
    proxy: {
      '/api': {
        target: 'https://cautious-trout-jj9pprvjqgpqf5q6w-12799.app.github.dev/',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
