import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, './src/composables'),
      '@comps': path.resolve(__dirname, './src/components'),
      '@img': path.resolve(__dirname, './src/assets/img'),
      '@scss': path.resolve(__dirname, './src/assets/scss'),
      '@ico': path.resolve(__dirname, './src/assets/icons'),
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './')
    }
  }
})
