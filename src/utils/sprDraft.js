import { EMPTY_BUYER, EMPTY_UNIT_IDENTITY } from "../components/simulasi/sprDefaults"

// Draf form SPR ditahan di memori saja (bukan sessionStorage/localStorage): data pribadi seperti NIK
// tidak boleh tertulis ke penyimpanan browser. Hilang saat halaman dimuat ulang atau tab ditutup.
let draft = { buyer: EMPTY_BUYER, unitIdentity: EMPTY_UNIT_IDENTITY }

export function getSprDraft() {
  return draft
}

export function saveSprDraft(next) {
  draft = next
}
