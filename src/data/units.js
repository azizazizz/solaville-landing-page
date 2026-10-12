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
      "Hunian satu lantai dengan dua kamar tidur, cocok untuk pasangan muda atau keluarga kecil yang baru membangun rumah tangga. Ruang tamu dan ruang keluarga menyatu dalam konsep terbuka sehingga rumah terasa lebih luas.",
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
]

export function getUnitById(id) {
  return units.find((unit) => unit.id === id)
}

export function getFeaturedUnits() {
  return units.filter((unit) => unit.featured)
}
