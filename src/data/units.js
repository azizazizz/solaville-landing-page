export const units = [
  {
    id: "tipe-36",
    nama: "Tipe 36",
    hargaMulai: 385000000,
    luasTanah: 72,
    luasBangunan: 36,
    kamarTidur: 2,
    kamarMandi: 1,
    carport: 1,
    lantai: 1,
    featured: true,
    stokTersedia: 6,
    deskripsi:
      "Pilihan hunian paling terjangkau di Solaville, cocok untuk pasangan muda yang baru membangun rumah tangga. Ruang tamu dan ruang keluarga menyatu dalam konsep terbuka sehingga rumah terasa lebih luas.",
    spesifikasi: [
      "Pondasi batu kali, struktur beton bertulang",
      "Dinding bata merah plester aci, cat eksterior Dulux Weathershield",
      "Atap genteng beton dengan rangka baja ringan",
      "Lantai keramik 40x40 cm pada seluruh ruangan",
      "Kusen pintu dan jendela aluminium",
      "Instalasi listrik 2200 watt, air PDAM dan sumur bor",
    ],
    gambar: ["tipe-36-eksterior", "tipe-36-ruang-tamu", "tipe-36-kamar"],
  },
  {
    id: "tipe-45",
    nama: "Tipe 45",
    hargaMulai: 495000000,
    luasTanah: 90,
    luasBangunan: 45,
    kamarTidur: 2,
    kamarMandi: 2,
    carport: 1,
    lantai: 1,
    featured: true,
    stokTersedia: 9,
    deskripsi:
      "Tipe menengah dengan tambahan satu kamar mandi dan ruang makan terpisah dari ruang keluarga. Taman kecil di depan rumah memberi ruang hijau tambahan untuk penghuni.",
    spesifikasi: [
      "Pondasi batu kali, struktur beton bertulang",
      "Dinding bata merah plester aci, cat eksterior Dulux Weathershield",
      "Atap genteng beton dengan rangka baja ringan",
      "Lantai keramik 50x50 cm pada ruang utama, 20x25 cm pada kamar mandi",
      "Kusen pintu dan jendela aluminium, pintu utama panel kayu solid",
      "Instalasi listrik 3500 watt, air PDAM dan sumur bor",
    ],
    gambar: ["tipe-45-eksterior", "tipe-45-ruang-keluarga", "tipe-45-dapur"],
  },
  {
    id: "tipe-60",
    nama: "Tipe 60",
    hargaMulai: 650000000,
    luasTanah: 120,
    luasBangunan: 60,
    kamarTidur: 3,
    kamarMandi: 2,
    carport: 2,
    lantai: 1,
    featured: true,
    stokTersedia: 5,
    deskripsi:
      "Dirancang untuk keluarga dengan anak yang membutuhkan kamar tambahan. Carport dapat menampung dua kendaraan roda empat, dan terdapat ruang servis di belakang rumah.",
    spesifikasi: [
      "Pondasi batu kali, struktur beton bertulang",
      "Dinding bata merah plester aci, cat eksterior Dulux Weathershield",
      "Atap genteng beton dengan rangka baja ringan, plafon gypsum",
      "Lantai granit 60x60 cm pada ruang utama",
      "Kusen pintu dan jendela aluminium, pintu utama panel kayu solid",
      "Instalasi listrik 4400 watt, air PDAM dan sumur bor, water heater di kamar mandi utama",
    ],
    gambar: ["tipe-60-eksterior", "tipe-60-ruang-makan", "tipe-60-kamar-utama"],
  },
  {
    id: "tipe-72",
    nama: "Tipe 72",
    hargaMulai: 825000000,
    luasTanah: 150,
    luasBangunan: 72,
    kamarTidur: 3,
    kamarMandi: 3,
    carport: 2,
    lantai: 2,
    featured: false,
    stokTersedia: 3,
    deskripsi:
      "Rumah dua lantai dengan kamar utama di lantai dasar dan dua kamar anak di lantai atas, masing-masing dengan kamar mandi sendiri. Terdapat balkon kecil di lantai dua yang menghadap taman depan.",
    spesifikasi: [
      "Pondasi footplat, struktur beton bertulang dua lantai",
      "Dinding bata merah plester aci, cat eksterior Dulux Weathershield",
      "Atap genteng beton dengan rangka baja ringan, plafon gypsum",
      "Lantai granit 60x60 cm pada ruang utama, tangga granit",
      "Kusen pintu dan jendela aluminium, railing balkon besi tempa",
      "Instalasi listrik 5500 watt, air PDAM dan sumur bor, water heater pada dua kamar mandi",
    ],
    gambar: ["tipe-72-eksterior", "tipe-72-balkon", "tipe-72-tangga"],
  },
]

export function getUnitById(id) {
  return units.find((unit) => unit.id === id)
}

export function getFeaturedUnits() {
  return units.filter((unit) => unit.featured)
}
