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
    images/{hero,keunggulan,unit,galeri}/   Gambar properti (lihat Mengganti Foto)
  components/
    common/              Dipakai banyak halaman: Reveal, SectionHeading, icons, placeholder gambar
    layout/              Navbar, Footer, ThemeToggle, FloatingWhatsapp, ScrollToTop
    home/ unit/ galeri/ kontak/ simulasi/   Komponen khusus per fitur
  data/                  Seluruh konten (unit, perusahaan, galeri, kontak, nomor WhatsApp)
  hooks/                 Hook yang dipakai ulang
  layouts/               Kerangka halaman (MainLayout)
  pages/                 Satu berkas per rute
  utils/                 Fungsi murni dan penyimpanan alur: currency, loan, images, sprDocument (PDF),
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

## Mengganti Foto

Gambar di `src/assets/images/` sekarang adalah **visualisasi buatan AI**, bukan foto lokasi. Gambar dikenali lewat
nama berkas tanpa ekstensi, jadi untuk mengganti dengan foto asli cukup taruh foto dengan **nama yang sama**
(jpg, png, webp, atau avif) dan hapus berkas lamanya. Tidak ada kode yang perlu diubah. Berkas mentah (resolusi
penuh) disimpan di `private/`, yang tidak ikut ke Git maupun hosting.

| Folder        | Dipakai di                              | Nama berkas                                              |
| ------------- | --------------------------------------- | -------------------------------------------------------- |
| `hero/`       | Beranda                                 | `beranda`                                                |
| `keunggulan/` | Bagian "Mengapa Solaville" di Beranda   | sesuai field `gambar` di `data/company.js`               |
| `unit/`       | Kartu dan detail unit                   | sesuai field `gambar[].id` di `data/units.js`            |
| `galeri/`     | Halaman Galeri dan lightbox             | `gal-01`, `gal-02`, dan seterusnya sesuai `id` di `data/gallery.js` |

Nama yang belum punya berkas otomatis tampil sebagai placeholder. Kompres foto sebelum dipakai (lebar sekitar
1600px, di bawah 300 KB per foto). Teks alternatif foto ada di berkas data yang sama, sesuaikan dengan isi foto asli.

## Warna dan Mode Gelap

Warna didefinisikan sebagai token di `src/index.css` (blok `@theme`) dan diambil dari logo: hijau hutan
sebagai warna utama, emas sebagai aksen, krem sebagai netral. Nilai mode gelap ada di blok `.dark`.
Pakai nama token (`bg-base`, `text-primary`, `text-gold`), bukan kode warna langsung, agar kedua mode tetap konsisten.

## Alur Pemesanan

`/simulasi` (hitung cicilan) → `/spr` (data pemesanan, membuat PDF) → `/selesai`.
Hasil simulasi disimpan di sessionStorage. Data pribadi pemesan hanya ada di memori dan tidak ditulis ke storage browser.

## Catatan

- Gambar sekarang visualisasi AI. Setelah semuanya diganti dokumentasi asli, hapus keterangan "visualisasi ilustratif": komponen `ImageNote` (dipakai di Beranda dan Unit) dan kalimat di `GaleriPage.jsx`.
- Tulisan pada papan gerbang tol dan sekolah di gambar sudah dikosongkan agar tidak bertentangan dengan teks di `data/company.js`. Foto asli yang memuat papan nama harus sesuai dengan teks tersebut.
- Halaman Syarat & Ketentuan dan Kebijakan Privasi berisi teks placeholder yang wajib direview oleh notaris/legal sebelum go-live.
- Sebelum go-live, ganti data contoh: nomor WhatsApp, telepon, email, dan data legal developer.
