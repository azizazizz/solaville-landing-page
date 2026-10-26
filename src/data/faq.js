// Tanya jawab yang tampil di Beranda dan masuk ke data terstruktur (FAQPage) serta llms.txt.
// Semua jawaban hanya memakai fakta dari brosur dan data situs; tidak ada janji baru.
// Impor memakai ekstensi .js karena berkas ini juga dibaca langsung oleh Node saat build.
import { company } from "./company.js"
import { siteConfig } from "./siteConfig.js"
import { units } from "./units.js"

const unit = units[0]
const { promo } = company
// Huruf awal dikecilkan hanya untuk kata biasa, bukan singkatan (CCTV, SHM, KPR tetap utuh)
const awalKecil = (teks) => (/^[A-Z][a-z]/.test(teks) ? teks.charAt(0).toLowerCase() + teks.slice(1) : teks)
const gratis = promo.gratis.map(awalKecil).join(", ")
const fasilitas = promo.fasilitas.map((item) => awalKecil(item.nama)).join(", ")

// tautan = ajakan lanjut di bawah jawaban (hanya tampil di halaman, tidak masuk data terstruktur)
export const faq = [
  {
    id: "dp",
    pertanyaan: "Berapa DP rumah di Solaville?",
    jawaban: `DP rumah di Solaville adalah ${promo.dp}. Cukup booking ${siteConfig.bookingLabel} untuk langsung memilih unit. Syarat dan ketentuan berlaku, termasuk persetujuan pembiayaan dari bank.`,
    tautan: { teks: "Hitung cicilan", ke: "/simulasi" },
  },
  {
    id: "booking",
    pertanyaan: "Berapa biaya booking di Solaville?",
    jawaban: `Cukup booking ${siteConfig.bookingLabel}, lalu Anda langsung memilih unit impian Anda. Booking bisa dimulai dari Surat Pesanan Rumah (SPR) online di situs ini, atau lewat tim pemasaran di WhatsApp.`,
    tautan: { teks: "Mulai dari simulasi", ke: "/simulasi" },
  },
  {
    id: "gratis",
    pertanyaan: "Biaya apa saja yang gratis di Solaville?",
    jawaban: `Gratis ${gratis}. Syarat dan ketentuan berlaku.`,
  },
  {
    id: "lokasi",
    pertanyaan: "Di mana lokasi perumahan Solaville?",
    jawaban: `Solaville berada di Kp. Sampora, Jayasampurna, Kecamatan Serang Baru, Kabupaten Bekasi, Jawa Barat 17330. Lokasinya dekat pintu Tol Sukaragam (Japek 2), kawasan industri (MM2100 dan Jababeka), pasar tradisional, sekolah, dan rumah sakit.`,
    tautan: { teks: "Lihat peta dan petunjuk arah", ke: "/kontak" },
  },
  {
    id: "tipe",
    pertanyaan: "Rumah tipe apa yang dijual di Solaville?",
    jawaban: `Rumah Mezzanine Premium tipe 36/72, dibangun pada tahun ${company.tahunPembangunan}. Luas bangunan ${unit.luasBangunan} m2 dan luas tanah ${unit.luasTanah} m2, dengan ${unit.kamarTidur} kamar tidur, ${unit.kamarMandi} kamar mandi, mezzanine, dan carport.`,
    tautan: { teks: "Lihat detail dan denah", ke: "/unit" },
  },
  {
    id: "spesifikasi",
    pertanyaan: "Apa spesifikasi bangunan Solaville?",
    jawaban: `${unit.spesifikasi.join("; ")}.`,
    tautan: { teks: "Lihat spesifikasi lengkap", ke: "/unit" },
  },
  {
    id: "fasilitas",
    pertanyaan: "Apa saja fasilitas dan sistem keamanan Solaville?",
    jawaban: `Fasilitas Solaville: ${fasilitas}. Kawasannya hijau dan asri, dengan lingkungan yang nyaman untuk keluarga.`,
  },
  {
    id: "sertifikat",
    pertanyaan: "Apakah rumah di Solaville bersertifikat SHM?",
    jawaban: "Sertifikatnya berupa Sertifikat Hak Milik (SHM). Biaya balik nama dan SHM gratis.",
  },
  {
    id: "memesan",
    pertanyaan: "Bagaimana cara memesan unit di Solaville?",
    jawaban:
      "Hitung cicilan di halaman Simulasi, lanjutkan dengan mengisi data pemesanan untuk membuat Surat Pesanan Rumah (SPR) dalam bentuk PDF, lalu hubungi tim pemasaran lewat WhatsApp.",
    tautan: { teks: "Buka simulasi", ke: "/simulasi" },
  },
  {
    id: "kpr",
    pertanyaan: "Apakah bisa membeli rumah Solaville dengan KPR?",
    jawaban:
      "Biaya proses KPR gratis. Besaran cicilan dan persetujuan pembiayaan mengikuti kebijakan bank. Anda bisa menghitung estimasinya di halaman Simulasi.",
    tautan: { teks: "Hitung estimasi cicilan", ke: "/simulasi" },
  },
  {
    id: "harga",
    pertanyaan: "Berapa harga dan cicilan rumah Solaville?",
    jawaban:
      "Harga disampaikan langsung oleh tim pemasaran. Isi harga itu di halaman Simulasi untuk memperkirakan cicilan dengan tenor 15, 20, atau 25 tahun, atau tanyakan harga lewat WhatsApp.",
    tautan: { teks: "Hubungi tim pemasaran", ke: "/kontak" },
  },
  {
    id: "gambar",
    pertanyaan: "Apakah gambar di situs ini sama dengan rumah sebenarnya?",
    jawaban:
      "Gambar dan denah di situs ini adalah ilustrasi desain. Detail aktual dapat menyesuaikan kondisi pada bangunan asli.",
    tautan: { teks: "Lihat galeri", ke: "/galeri" },
  },
]
