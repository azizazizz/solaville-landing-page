import { getUnitById } from "../data/units"
import { TENOR_OPTIONS } from "./loan"

const STORAGE_KEY = "solaville-simulasi"

// Simulasi yang menunjuk tipe unit yang sudah tidak ada (mis. daftar tipe berubah setelah deploy)
// dianggap tidak valid, supaya tidak menampilkan data basi.
const isValid = (v) =>
  v &&
  typeof v.unitId === "string" &&
  (v.unitId === "" || Boolean(getUnitById(v.unitId))) &&
  Number.isFinite(v.harga) &&
  v.harga > 0 &&
  TENOR_OPTIONS.some((option) => option.value === v.tenorBulan) &&
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

export function saveSimulation(values) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  } catch {
    // sessionStorage tidak tersedia: simulasi tetap berjalan, hanya tidak terbawa antar halaman
  }
}
