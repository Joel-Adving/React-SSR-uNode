import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { injectScript } from './inject-script.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), injectScript()],
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    rollupOptions: {
      input: path.resolve(__dirname, 'src/entry.client.tsx'),
      output: {
        entryFileNames: 'static/[name]-[hash].js',
        chunkFileNames: 'static/[name]-[hash].js',
        assetFileNames: 'static/[name]-[hash][extname]'
      }
    },
    emptyOutDir: true
  },
  publicDir: path.resolve(__dirname, 'src/public'),
  esbuild: {
    minify: true
  }
})
