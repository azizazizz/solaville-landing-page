export const units = [
  {
    id: "tipe-36",
    nama: "Tipe 36",
    hargaMulai: 395000000,
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
]

export function getUnitById(id) {
  return units.find((unit) => unit.id === id)
}

export function getFeaturedUnits() {
  return units.filter((unit) => unit.featured)
}
