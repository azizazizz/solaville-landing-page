# Solaville, Landing Page Perumahan

Landing page developer perumahan, dibangun dengan React 19, Vite, Tailwind CSS v4, dan react-router-dom.

## Menjalankan Project

```bash
npm install
npm run dev            # pengembangan (tanpa prerender)
npm run build          # produksi: build klien + build server + prerender, hasil di dist/
npm run build:klien    # hanya build klien (tanpa prerender)
npm run lint
npm run preview        # melihat dist/ (tidak meniru aturan cleanUrls Vercel)
```

## Struktur Folder

```
public/                  Berkas dengan URL tetap: favicon, apple-touch-icon, og-solaville.jpg (gambar pratinjau sosial)
scripts/                 prerender.mjs (HTML tiap rute saat build), og-image.html (templat gambar pratinjau)
vercel.json              Konfigurasi hosting Vercel (lihat Hosting)
design/                  Master desain (logo resolusi tinggi). Tidak dipakai langsung oleh situs
src/
  assets/
    logo/                Logo yang dipakai situs (navbar, footer, PDF)
    images/{hero,keunggulan,unit,galeri}/   Gambar properti (lihat Mengganti Foto)
  components/
    common/              Dipakai banyak halaman: Reveal, SectionHeading, icons, placeholder gambar
    layout/              Navbar, Footer, ThemeToggle, FloatingWhatsapp, ScrollToTop
    home/ unit/ galeri/ kontak/ simulasi/   Komponen khusus per fitur
  data/                  Seluruh konten (unit, perusahaan, galeri, kontak, nomor WhatsApp) + seo.js dan faq.js
  hooks/                 Hook yang dipakai ulang
  layouts/               Kerangka halaman (MainLayout)
  pages/                 Satu berkas per rute
  utils/                 Fungsi murni dan penyimpanan alur: currency, loan, images, sprDocument (PDF),
                         sprValidation, sprDraft, simulationStore, theme
  index.css              Token warna (@theme), mode gelap, dan animasi
```

## Mengganti Konten

Konten ada di `src/data/*.js` dan bisa diganti tanpa menyentuh komponen:

- `siteConfig.js`: nama brand, tagline, nomor WhatsApp (nilai sekarang masih contoh), dan nilai awal booking fee di form SPR
- `company.js`: profil, keunggulan, nama developer
- `units.js`: tipe unit, harga, spesifikasi, dan denah (gambar denah ada di `src/assets/images/unit/`, bisa diperbesar di detail unit)
- `contact.js`: alamat, telepon, email, peta
- `gallery.js`: daftar foto galeri
- `faq.js`: tanya jawab di Beranda, otomatis ikut ke data terstruktur dan llms.txt (hanya fakta dari brosur)
- `seo.js`: judul, deskripsi, dan data terstruktur tiap halaman (lihat SEO dan GEO)

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

Nama yang belum punya berkas otomatis tampil sebagai placeholder. Teks alternatif foto ada di berkas data yang sama,
sesuaikan dengan isi foto asli.

**Kompresi otomatis.** Saat `npm run build`, setiap gambar diubah menjadi WebP dalam lima ukuran (480, 800, 1200, 1600,
2000 piksel) oleh `vite-imagetools` (diatur di `vite.config.js` dan `src/utils/images.js`), dan peramban memilih ukuran yang
sesuai layarnya lewat `srcset`. Karena itu foto sumber tidak perlu dikompres manual: cukup lebar minimal 2000px dan
format JPG atau PNG. Komponen `Photo` menerima prop `sizes`; isi dengan lebar tampil gambar yang sebenarnya (misalnya
`calc(100vw - 40px)` untuk gambar selebar layar di ponsel). Terlalu kecil membuat gambar buram. Logo diubah ke WebP lewat
parameter di URL impor, misalnya `logo-full.png?w=500&format=webp&quality=85`.

## Warna dan Mode Gelap

Warna didefinisikan sebagai token di `src/index.css` (blok `@theme`) dan diambil dari logo: hijau hutan
sebagai warna utama, emas sebagai aksen, putih dan krem sebagai netral. Nilai mode gelap ada di blok `.dark`.
Pakai nama token (`bg-base`, `text-primary`, `text-gold`), bukan kode warna langsung, agar kedua mode tetap konsisten.

## SEO dan GEO

Situs ini SPA, tetapi `npm run build` menghasilkan **satu berkas HTML lengkap per halaman** (prerender), sehingga
mesin pencari dan crawler AI, yang umumnya tidak menjalankan JavaScript, langsung membaca isi halaman. Di browser
HTML itu di-hydrate seperti biasa.

- **Sumber tunggal: `src/data/seo.js`.** Berisi judul, deskripsi, canonical, robots, data terstruktur (JSON-LD), sitemap,
  robots.txt, dan llms.txt. Dipakai klien (`src/hooks/useRouteSeo.js`, saat berpindah halaman) dan build
  (`scripts/prerender.mjs`), jadi teksnya tidak bisa berbeda.
- **Menambah halaman baru:** tambahkan `<Route>` di `src/AppRoutes.jsx` **dan** entri di `routes` pada `seo.js`.
  Build gagal bila salah satunya terlupa. Judul maksimal 60 karakter, deskripsi maksimal 155.
- **Mode rute:** `full` (isi diprerender; untuk halaman konten) atau `shell` (hanya `<head>`; untuk halaman yang membaca
  sessionStorage seperti `/simulasi`, `/spr`, `/selesai`). Rute `noindex` tidak masuk sitemap.
- **Build akan gagal** bila ada judul atau deskripsi kepanjangan, H1 ganda, JSON-LD rusak, aset yang dirujuk HTML tidak ada,
  atau data contoh (WhatsApp, telepon, email) bocor ke data terstruktur dan llms.txt.
- **Data contoh tidak dipublikasikan ke mesin pencari.** Telepon dan email masuk ke JSON-LD dan llms.txt hanya bila
  `contact.diverifikasi.telepon` / `.email` bernilai `true`, 
  Ubah setelah data asli dipasang.
- **Harga tidak tampil di halaman pemasaran** dan tidak masuk data terstruktur. Di Simulasi harga diisi sendiri oleh
  pengunjung (tanpa harga bawaan); tenor yang tersedia 15, 20, dan 25 tahun (`TENOR_OPTIONS` di `utils/loan.js`).
- **Kebijakan crawler AI** ada di `seo.js` (`BOT_PENCARIAN_AI` diizinkan, `BOT_PELATIHAN_AI` diblokir) dan menjadi `robots.txt`.
  robots.txt hanya imbauan, bukan penghalang teknis.
- **Gambar pratinjau sosial:** `public/og-solaville.jpg`, dibuat dari `scripts/og-image.html` (petunjuk di dalam berkasnya).
  Ganti nama berkasnya (dan `OG_IMAGE.path` di `seo.js`) bila gambar diubah agar cache media sosial tidak memakai versi lama.
- Domain utama adalah konstanta `SITE_URL` di `seo.js`.

## Hosting

Situs berjalan di Vercel. `vercel.json`:

- `cleanUrls: true` dan `trailingSlash: false`: `/kontak` melayani `kontak.html` hasil prerender; `/kontak/` dan `/kontak.html`
  dialihkan ke `/kontak`.
- Catch-all rewrite ke `/index.html` tetap ada sebagai pengaman untuk alamat tak dikenal (klien lalu menampilkan halaman
  Tidak Ditemukan dengan `noindex`). Tanpa aturan semacam ini, membuka atau memuat ulang halaman selain beranda menghasilkan 404.
- Cache setahun untuk `/assets/*` (nama berkas sudah memuat hash isi), `Content-Type` untuk `llms.txt`, dan
  `X-Robots-Tag: noindex` untuk host `*.vercel.app` agar domain preview tidak ikut terindeks.

Pengalihan `www` ke domain utama diatur di pengaturan domain Vercel. Bila pindah ke hosting lain, terapkan aturan yang setara
(Netlify: `public/_redirects` berisi `/* /index.html 200`; Nginx: `try_files $uri $uri.html /index.html;`).
Perilaku `cleanUrls` hanya bisa diuji sebenarnya di Preview Deployment Vercel (push ke branch), jadi uji di sana sebelum merge.

## Alur Pemesanan

`/simulasi` (hitung cicilan) → `/spr` (data pemesanan, membuat PDF) → `/selesai`.
Hasil simulasi disimpan di sessionStorage. Data pribadi pemesan hanya ada di memori dan tidak ditulis ke storage browser.

## Catatan

- Gambar sekarang visualisasi AI. Setelah semuanya diganti dokumentasi asli, hapus keterangan "visualisasi ilustratif": komponen `ImageNote` (dipakai di Beranda dan Unit) dan kalimat di `GaleriPage.jsx`.
- Tulisan pada papan gerbang tol dan sekolah di gambar sudah dikosongkan agar tidak bertentangan dengan teks di `data/company.js`. Foto asli yang memuat papan nama harus sesuai dengan teks tersebut.
- Halaman Syarat & Ketentuan dan Kebijakan Privasi berisi teks placeholder yang wajib direview oleh notaris/legal sebelum go-live.
- Sebelum go-live, ganti data contoh: nomor WhatsApp, telepon, email, dan lalu aktifkan flag `contact.diverifikasi` agar masuk ke data terstruktur.
- Halaman Syarat & Ketentuan dan Kebijakan Privasi bertanda `noindex` dan di luar sitemap sampai ditinjau notaris;
  setelah itu ubah di `seo.js` (hapus `noindex`, tambah `sitemap: true`).
