import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // Минификация включена для production (используем встроенный esbuild)
    minify: 'esbuild',
    // Оптимизация chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'yet-another-react-lightbox'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
    // Оптимизация размера bundle
    chunkSizeWarningLimit: 1000,
    // CSS код сплиттинг
    cssCodeSplit: true,
    // Source maps для production (можно отключить)
    sourcemap: false,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
