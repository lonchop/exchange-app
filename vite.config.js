import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Exchange App',
        short_name: 'exchange',
        description: 'Exchange App is a project development by Orangel Jose Gonzalez',
        theme_color: '#75AAAD',
        icons: [
          {
            src: 'exchange-app-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'exchange-app-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      display: 'standalone',
      display_override: ['window-controls-overlay'],
      lang: 'es-ES',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true, // Permite que el servidor sea accesible externamente
    port: 3000 // Puedes especificar un puerto si lo deseas, es opcional
  }
})
