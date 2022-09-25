import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.ELECTRON ? path.resolve(__dirname, "./dist/") : './',
  plugins: [vue()]
})
