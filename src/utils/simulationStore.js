import { getUnitById } from "../data/units"

const STORAGE_KEY = "solaville-simulasi"

// Simulasi yang menunjuk tipe unit yang sudah tidak ada (mis. daftar tipe berubah setelah deploy)
// dianggap tidak valid, supaya tidak menampilkan data basi.
const isValid = (v) =>
  v &&
  typeof v.unitId === "string" &&
  (v.unitId === "" || Boolean(getUnitById(v.unitId))) &&
  Number.isFinite(v.harga) &&
  v.harga > 0 &&
  Number.isFinite(v.tenorBulan) &&
  Number.isFinite(v.ratePercent)

// Hanya parameter simulasi (bukan data pribadi) yang disimpan, dan hanya selama tab terbuka.
export function loadSimulation() {
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY))
    return isValid(parsed) ? parsed : null
  } catch {
    return null
  }
}

// Simulasi untuk unit tertentu: tipe & harga dari unit itu, tenor/bunga memakai pilihan terakhir
// pengguna (atau 10 tahun, 8% bila belum pernah mengatur).
export function simulationForUnit(unit) {
  const stored = loadSimulation()
  return {
    unitId: unit.id,
    harga: unit.hargaMulai,
    tenorBulan: stored ? stored.tenorBulan : 120,
    ratePercent: stored ? stored.ratePercent : 8,
  }
}

export function saveSimulation(values) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  } catch {
    // sessionStorage tidak tersedia: simulasi tetap berjalan, hanya tidak terbawa antar halaman
  }
}
