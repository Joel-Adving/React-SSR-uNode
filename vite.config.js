import * as path from 'path'
import * as fs from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupReplace from '@rollup/plugin-replace'
import { fileURLToPath } from 'url'
import { createHtmlPlugin } from 'vite-plugin-html'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-script',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist/public')
        const htmlFilePath = path.join(distDir, 'static/index.html')
        const jsFiles = fs.readdirSync(path.join(distDir, 'static')).filter((file) => file.endsWith('.js'))
        if (jsFiles.length > 0) {
          const scriptTag = `<script type="module" src="/static/${jsFiles[0]}"></script>`
          let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8')
          htmlContent = htmlContent.replace('%injectScript%', scriptTag)
          fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8')
        }
      }
    }
  ],
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  publicDir: path.resolve(__dirname, 'src/public'),
  esbuild: {
    minify: true
  }
})
