export const units = [
  {
    id: "tipe-36",
    nama: "Tipe 36/72",
    luasTanah: 72,
    luasBangunan: 36,
    kamarTidur: 2,
    kamarMandi: 1,
    carport: 1,
    lantai: "Rumah mezzanine",
    featured: true,
    deskripsi:
      "Rumah Mezzanine Premium tipe 36/72 yang eksklusif, modern, dan terjangkau. Dua kamar tidur dan satu kamar mandi, dengan mezzanine yang terhubung tangga, serta carport di halaman depan.",
    // Sesuai brosur pemasaran; luas bangunan sudah tampil terpisah
    spesifikasi: [
      "Struktur dan pondasi: batu kali dan beton bertulang",
      "Dinding: bata ringan double, plester aci halus, dan finishing cat",
      "Atap dan plafon: rangka baja ringan anti-rayap, genteng beton, dan plafon gypsum rapi",
      "Lantai utama: granite polos 60 x 60 cm",
      "Kusen dan pintu: kusen aluminium tahan cuaca dengan pintu utama High Pressure Laminate",
      "Kamar mandi: full keramik lantai hingga dinding, dilengkapi kloset duduk dan shower",
      "Instalasi air bersih: jaringan air bersih siap pakai",
      "Kapasitas listrik: 1.300 VA",
    ],
    // id = nama berkas di src/assets/images/unit (tanpa ekstensi)
    gambar: [
      { id: "tipe-36-eksterior", alt: "Tampak depan rumah Tipe 36/72 dengan balkon dan carport" },
      { id: "tipe-36-ruang-tamu", alt: "Ruang tamu Tipe 36/72 dengan sofa dan tangga" },
      { id: "tipe-36-kamar", alt: "Kamar tidur utama Tipe 36/72 dengan jendela dan lemari" },
    ],
    // Denah dari brosur pemasaran; rasio = lebar / tinggi gambar, untuk menahan ruangnya sebelum gambar termuat
    denah: {
      id: "tipe-36-denah",
      alt: "Denah Tipe 36/72: ruang keluarga dengan tangga ke mezzanine, dua kamar tidur, satu kamar mandi, taman, dan carport",
      rasio: "1821 / 2799",
    },
  },
]

export function getUnitById(id) {
  return units.find((unit) => unit.id === id)
}

export function getFeaturedUnits() {
  return units.filter((unit) => unit.featured)
}
