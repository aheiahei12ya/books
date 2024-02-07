import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      styles: path.resolve(__dirname, 'src/styles')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  envDir: 'config'
})
