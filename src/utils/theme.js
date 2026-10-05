const STORAGE_KEY = "solaville-theme"

export function getPreferredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {
    // localStorage tidak tersedia (mis. private browsing), tetap jatuh ke default terang
  }
  // Tanpa preferensi tersimpan, kunjungan pertama selalu mode terang (tidak mengikuti OS)
  return "light"
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export function storeTheme(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // abaikan jika localStorage tidak bisa ditulis
  }
}
