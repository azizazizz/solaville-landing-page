# Solaville, Landing Page Perumahan

Landing page developer perumahan, dibangun dengan React + Vite + Tailwind CSS v4.

## Menjalankan Project

```bash
npm install
npm run dev
```

## Struktur Konten

Seluruh konten placeholder (unit, profil perusahaan, galeri, kontak) ada di `src/data/*.js`
dan bisa diganti kapan saja dengan data asli tanpa menyentuh komponen.

## Fitur

- Halaman Beranda, Tentang, Unit (dengan detail inline), Galeri (dengan lightbox), Kontak, Syarat & Ketentuan, Kebijakan Privasi.
- Simulasi cicilan KPR (tanpa DP, metode anuitas) di `/simulasi`.
- Generator dokumen Surat Pesanan Rumah (SPR) dalam bentuk PDF, dibuat 100% di client dengan jsPDF.

## Catatan

- Foto properti masih berupa placeholder bergaya flat (`src/components/common/PlaceholderImage.jsx`), belum berupa foto asli.
- Halaman Syarat & Ketentuan dan Kebijakan Privasi berisi teks placeholder yang wajib direview oleh notaris/legal sebelum go-live.
