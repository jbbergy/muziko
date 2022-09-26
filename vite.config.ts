import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

const pathSrc = path.resolve(__dirname, "./src");

export default defineConfig({
  base: process.env.ELECTRON ? path.resolve(__dirname, "./dist/") : './',
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "@/styles/index.scss";` },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
})
