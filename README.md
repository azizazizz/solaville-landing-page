# Solaville, Landing Page Perumahan

Landing page developer perumahan, dibangun dengan React 19, Vite, Tailwind CSS v4, dan react-router-dom.

## Menjalankan Project

```bash
npm install
cp .env.example .env   # lalu isi VITE_SITE_URL setelah domain tersedia
npm run dev            # pengembangan
npm run build          # hasil produksi di dist/
npm run lint
```

## Struktur Folder

```
public/                  Berkas dengan URL tetap: favicon, apple-touch-icon, og-image
design/                  Master desain (logo resolusi tinggi). Tidak dipakai langsung oleh situs
src/
  assets/
    logo/                Logo yang dipakai situs (navbar, footer, PDF)
    images/{hero,unit,galeri}/   Foto properti asli (belum terisi, lihat Catatan)
  components/
    common/              Dipakai banyak halaman: Reveal, SectionHeading, icons, placeholder gambar
    layout/              Navbar, Footer, ThemeToggle, FloatingWhatsapp, ScrollToTop
    home/ unit/ galeri/ kontak/ simulasi/   Komponen khusus per fitur
  data/                  Seluruh konten (unit, perusahaan, galeri, kontak, nomor WhatsApp)
  hooks/                 Hook yang dipakai ulang
  layouts/               Kerangka halaman (MainLayout)
  pages/                 Satu berkas per rute
  utils/                 Fungsi murni dan penyimpanan alur: currency, loan, sprDocument (PDF),
                         sprValidation, sprDraft, simulationStore, theme
  index.css              Token warna (@theme), mode gelap, dan animasi
```

## Mengganti Konten

Konten ada di `src/data/*.js` dan bisa diganti tanpa menyentuh komponen:

- `siteConfig.js`: nama brand, tagline, nomor WhatsApp (nilai sekarang masih contoh)
- `company.js`: profil, keunggulan, nama developer
- `units.js`: tipe unit dan harga
- `contact.js`: alamat, telepon, email, peta
- `gallery.js`: daftar foto galeri

## Warna dan Mode Gelap

Warna didefinisikan sebagai token di `src/index.css` (blok `@theme`) dan diambil dari logo: hijau hutan
sebagai warna utama, emas sebagai aksen, krem sebagai netral. Nilai mode gelap ada di blok `.dark`.
Pakai nama token (`bg-base`, `text-primary`, `text-gold`), bukan kode warna langsung, agar kedua mode tetap konsisten.

## Alur Pemesanan

`/simulasi` (hitung cicilan) → `/spr` (data pemesanan, membuat PDF) → `/selesai`.
Hasil simulasi disimpan di sessionStorage. Data pribadi pemesan hanya ada di memori dan tidak ditulis ke storage browser.

## Catatan

- Foto properti masih berupa placeholder (`src/components/common/PlaceholderImage.jsx`). Foto asli ditaruh di
  `src/assets/images/` lalu disambungkan ke komponen.
- Halaman Syarat & Ketentuan dan Kebijakan Privasi berisi teks placeholder yang wajib direview oleh notaris/legal sebelum go-live.
- Sebelum go-live, ganti data contoh: nomor WhatsApp, telepon, email, dan data legal developer.
