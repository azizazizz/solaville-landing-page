import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  // imagetools membuat varian WebP berbagai ukuran dari gambar sumber saat build (lihat src/utils/images.js)
  plugins: [react(), tailwindcss(), imagetools()],
})
