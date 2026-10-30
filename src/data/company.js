export const company = {
  namaPerumahan: "Solaville",
  tahunPembangunan: 2026,
  lokasiSingkat: "Kecamatan Serang Baru, Kabupaten Bekasi, Jawa Barat",

  tentang:
    "Solaville adalah perumahan Rumah Mezzanine Premium yang eksklusif, modern, dan terjangkau. Kawasannya hijau dan asri, dengan lingkungan yang nyaman untuk keluarga.",

  visi: "Menghadirkan harmoni sempurna bagi keluarga.",

  misi: [
    "Membangun rumah dengan spesifikasi bangunan yang jelas dan harga terjangkau.",
    "Menjaga keamanan penghuni lewat pos security, CCTV, dan sistem satu pintu.",
    "Memudahkan kepemilikan rumah dengan DP 0%.",
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
  },

  // gambar = nama berkas di src/assets/images/keunggulan (tanpa ekstensi)
  keunggulan: [
    {
      judul: "Dekat Pintu Tol Sukaragam (Japek 2)",
      gambar: "keunggulan/akses-tol",
      deskripsi: "Lokasi strategis dengan view tol yang eksklusif.",
    },
    {
      judul: "Dekat Kawasan Industri",
      gambar: "keunggulan/kawasan-industri",
      deskripsi: "MM2100 dan Jababeka, praktis bagi karyawan yang ingin tinggal dekat tempat kerja.",
    },
    {
      judul: "Dekat Pasar, Sekolah, dan Rumah Sakit",
      gambar: "keunggulan/sekolah",
      deskripsi: "Memudahkan kebutuhan harian keluarga.",
    },
    {
      judul: "Kawasan Hijau dan Asri",
      gambar: "keunggulan/rth",
      deskripsi: "Lingkungan yang nyaman untuk keluarga.",
    },
  ],

  legalitas: [
    "Sertifikat Hak Milik (SHM)",
    "Biaya notaris, AJB, BPHTB, balik nama, SHM, dan proses KPR gratis",
  ],
}
