export const company = {
  namaPerumahan: "Solaville",
  tahunPembangunan: 2026,
  lokasiSingkat: "Kecamatan Serang Baru, Kabupaten Bekasi, Jawa Barat",

  tentang:
    "Solaville adalah perumahan Rumah Mezzanine Premium yang eksklusif, modern, dan terjangkau, dibangun pada tahun 2026 di Kp. Sampora, Jayasampurna, Kecamatan Serang Baru, Kabupaten Bekasi. Kawasannya hijau dan asri, dengan lingkungan yang nyaman untuk keluarga. Lokasinya strategis, dekat pintu Tol Sukaragam (Japek 2), kawasan industri, pasar tradisional, sekolah, dan rumah sakit.",

  visi: "Harmoni sempurna untuk keluarga: hunian yang eksklusif, modern, dan terjangkau di kawasan yang hijau dan asri.",

  misi: [
    "Menghadirkan Rumah Mezzanine Premium tipe 36/72 dengan spesifikasi bangunan yang jelas dan harga yang terjangkau.",
    "Menjaga kawasan tetap hijau dan asri, dengan lingkungan yang nyaman untuk keluarga.",
    "Menyediakan keamanan melalui pos security, CCTV, dan sistem satu pintu (one gate system), dengan jalan lingkungan ROW lebar.",
    "Memudahkan kepemilikan rumah melalui DP 0% dan cukup booking Rp3 juta.",
  ],

  // Sumber tunggal penawaran dari brosur: dipakai PromoBand, FAQ, llms.txt, dan data terstruktur.
  // ikon = kunci yang dipetakan ke ikon di komponen (berkas data ini tidak boleh mengimpor React).
  promo: {
    dp: "0%",
    gratis: [
      "Kanopi",
      "Biaya notaris",
      "Biaya AJB dan BPHTB",
      "Biaya balik nama dan SHM",
      "Biaya proses KPR",
    ],
    fasilitas: [
      { nama: "Pos security", ikon: "security" },
      { nama: "CCTV keamanan", ikon: "cctv" },
      { nama: "One gate system", ikon: "gerbang" },
      { nama: "ROW jalan lebar", ikon: "jalan" },
    ],
    pilar: [
      "Kawasan hijau dan asri",
      "Lingkungan nyaman untuk keluarga",
      "Lokasi strategis dan view tol eksklusif",
    ],
  },

  // gambar = nama berkas di src/assets/images/keunggulan (tanpa ekstensi)
  keunggulan: [
    {
      judul: "Dekat Pintu Tol Sukaragam (Japek 2)",
      gambar: "keunggulan/akses-tol",
      deskripsi:
        "Akses tol dekat dari rumah, di lokasi strategis dengan view tol yang eksklusif.",
    },
    {
      judul: "Dekat dengan Kawasan Industri",
      gambar: "keunggulan/kawasan-industri",
      deskripsi:
        "Lokasinya berdekatan dengan kawasan industri MM2100 dan Jababeka. Tinggal dekat dari tempat kerja, praktis bagi karyawan dan pekerja kawasan industri.",
    },
    {
      judul: "Dekat Pasar, Sekolah, dan Rumah Sakit",
      gambar: "keunggulan/sekolah",
      deskripsi:
        "Pasar tradisional, sekolah, dan rumah sakit berada dekat dari perumahan, memudahkan kebutuhan harian keluarga.",
    },
    {
      judul: "Kawasan Hijau dan Asri",
      gambar: "keunggulan/rth",
      deskripsi: "Lingkungan yang nyaman untuk keluarga, di kawasan yang hijau dan asri.",
    },
    {
      judul: "Satu Pintu dan Jalan Lebar",
      gambar: "keunggulan/keamanan",
      deskripsi:
        "Pos security, CCTV keamanan, dan one gate system menjaga akses keluar masuk perumahan, dengan ROW jalan lebar.",
    },
  ],

  legalitas: [
    "Sertifikat Hak Milik (SHM), dengan biaya balik nama dan SHM gratis",
    "Biaya notaris, AJB, BPHTB, dan proses KPR gratis",
  ],
}
