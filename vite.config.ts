import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Mengupdate Service Worker secara otomatis
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Nama Aplikasi Anda',
        short_name: 'AppAnda',
        description: 'Deskripsi aplikasi Anda',
        theme_color: '#ffffff',
        icons: [
          {
            // Path di bawah ini merujuk ke public/ICON/
            src: '/ICON/android-chrome-192x192.png', 
            sizes: '192x192',
            type: 'any'
          },
          {
            src: '/ICON/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'any'
          },
          {
            src: '/ICON/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Penting agar ikon terlihat bagus di Android
          }
        ]
      }
    })
  ],
})
