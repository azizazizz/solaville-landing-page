import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

const GAMBAR = /\.(webp|jpe?g|png|avif|svg|ico)$/i

// https://vite.dev/config/
export default defineConfig({
  // imagetools membuat varian WebP berbagai ukuran dari gambar sumber saat build (lihat src/utils/images.js)
  plugins: [react(), tailwindcss(), imagetools()],
  build: {
    rollupOptions: {
      output: {
        // Gambar dinamai dari hash isinya saja. Dua sumber dengan isi sama (mis. foto yang dipakai di Beranda dan
        // Galeri) menjadi satu berkas, dan build klien serta build SSR untuk prerender menghasilkan URL yang persis
        // sama. Bila nama sumber ikut dipakai, keduanya bisa berbeda dan HTML prerender merujuk berkas yang tidak ada.
        assetFileNames: (aset) => {
          const nama = aset.names?.[0] ?? aset.name ?? ''
          return GAMBAR.test(nama) ? 'assets/[hash][extname]' : 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
