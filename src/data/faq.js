// Tanya jawab yang tampil di Beranda dan masuk ke data terstruktur (FAQPage) serta llms.txt.
// Semua jawaban hanya memakai fakta dari brosur dan data situs; tidak ada janji baru.
// Satu fakta dijawab di satu tempat: pertanyaan yang tumpang tindih sudah digabung.
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
    pertanyaan: "Berapa DP dan biaya booking di Solaville?",
    jawaban: `DP ${promo.dp}. Cukup booking ${siteConfig.bookingLabel} untuk langsung memilih unit. Syarat dan ketentuan berlaku, termasuk persetujuan pembiayaan dari bank.`,
    tautan: { teks: "Hitung cicilan", ke: "/simulasi" },
  },
  {
    id: "gratis",
    pertanyaan: "Biaya apa saja yang gratis?",
    jawaban: `Gratis ${gratis}, dengan syarat dan ketentuan yang berlaku.`,
  },
  {
    id: "lokasi",
    pertanyaan: "Di mana lokasi perumahan Solaville?",
    jawaban: `Di Kp. Sampora, Jayasampurna, Kecamatan Serang Baru, Kabupaten Bekasi, Jawa Barat 17330. Dekat pintu Tol Sukaragam (Japek 2), kawasan industri MM2100 dan Jababeka, pasar tradisional, sekolah, dan rumah sakit.`,
    tautan: { teks: "Lihat peta dan petunjuk arah", ke: "/kontak" },
  },
  {
    id: "tipe",
    pertanyaan: "Rumah tipe apa yang dijual?",
    jawaban: `Rumah Mezzanine Premium tipe 36/72, dibangun pada tahun ${company.tahunPembangunan}. Luas bangunan ${unit.luasBangunan} m2 dan luas tanah ${unit.luasTanah} m2, dengan ${unit.kamarTidur} kamar tidur, ${unit.kamarMandi} kamar mandi, mezzanine, dan carport.`,
    tautan: { teks: "Lihat detail dan denah", ke: "/unit" },
  },
  {
    id: "spesifikasi",
    pertanyaan: "Apa spesifikasi bangunannya?",
    jawaban: `${unit.spesifikasi.join("; ")}.`,
    tautan: { teks: "Lihat spesifikasi lengkap", ke: "/unit" },
  },
  {
    id: "fasilitas",
    pertanyaan: "Apa saja fasilitas dan sistem keamanannya?",
    jawaban: `Fasilitasnya: ${fasilitas}.`,
  },
  {
    id: "sertifikat",
    pertanyaan: "Apakah rumah bersertifikat SHM?",
    jawaban: "Ya, berupa Sertifikat Hak Milik. Biaya balik nama dan SHM gratis.",
  },
  {
    id: "memesan",
    pertanyaan: "Bagaimana cara memesan unit?",
    jawaban:
      "Hitung cicilan di halaman Simulasi, isi data pemesanan untuk membuat Surat Pesanan Rumah (SPR) dalam bentuk PDF, lalu hubungi tim pemasaran lewat WhatsApp.",
    tautan: { teks: "Buka simulasi", ke: "/simulasi" },
  },
  {
    id: "harga",
    pertanyaan: "Berapa harganya, dan bisakah dengan KPR?",
    jawaban:
      "Harga disampaikan langsung oleh tim pemasaran. Biaya proses KPR gratis, sedangkan besaran cicilan dan persetujuan pembiayaan mengikuti kebijakan bank. Isi harganya di halaman Simulasi untuk memperkirakan cicilan dengan tenor 15, 20, atau 25 tahun.",
    tautan: { teks: "Hitung estimasi cicilan", ke: "/simulasi" },
  },
]
