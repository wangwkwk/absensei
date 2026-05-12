import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // VitePWA({
    //   registerType: 'autoUpdate', // Mengupdate Service Worker secara otomatis
    //   injectRegister:'auto',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    //   devOptions:{
    //     enabled:true,
    //     type:"module"
    //   },
    //   manifest: {
    //     name: 'Absensei',
    //     short_name: 'Absensei',
    //     description: 'Aplikasi absensi berbasis website',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         // Path di bawah ini merujuk ke public/ICON/
    //         src: '/ICON/android-chrome-192x192.png', 
    //         sizes: '192x192',
    //         type: 'any'
    //       },
    //       {
    //         src: '/ICON/android-chrome-512x512.png',
    //         sizes: '512x512',
    //         type: 'any'
    //       },
    //       {
    //         src: '/ICON/android-chrome-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable' // Penting agar ikon terlihat bagus di Android
    //       }
    //     ]
    //   },
    //   workbox:{
    //     cleanupOutdatedCaches: true, // Otomatis buang cache lama
    //     skipWaiting: true,           // Langsung pakai versi baru tanpa nunggu
    //     clientsClaim: true
    //   }
    // })
  ],
})
