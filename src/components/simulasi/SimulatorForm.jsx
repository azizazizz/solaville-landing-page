import { useState } from "react"
import { units } from "../../data/units"
import { formatThousands, parseRupiahInput } from "../../utils/currency"
import { TENOR_OPTIONS } from "../../utils/loan"

const MAX_RATE = 30

// Field terisi di atas panel tonal: dibedakan lewat warna isi, fokus ditandai ring (bukan outline permanen).
// w-full + min-w-0 mencegah <select> melebarkan panel di layar sempit.
const fieldClass =
  "w-full min-w-0 rounded-xl bg-base px-4 py-3 text-fg outline-none ring-2 ring-transparent transition-shadow focus:ring-primary"
const groupClass =
  "flex items-center rounded-xl bg-base ring-2 ring-transparent transition-shadow focus-within:ring-primary"

const rateToText = (rate) => String(rate).replace(".", ",")

// Menerima titik maupun koma sebagai pemisah desimal, maksimal 2 digit desimal dan batas MAX_RATE
function parseRateInput(raw) {
  const cleaned = raw.replace(/[^\d.,]/g, "").replace(/\./g, ",")
  const [intPart = "", ...rest] = cleaned.split(",")
  const decimals = rest.join("").slice(0, 2)
  let text = intPart.slice(0, 2) + (rest.length > 0 ? `,${decimals}` : "")
  let value = parseFloat(`${intPart.slice(0, 2) || 0}.${decimals || 0}`)
  if (value > MAX_RATE) {
    value = MAX_RATE
    text = String(MAX_RATE)
  }
  return { text, value }
}

export default function SimulatorForm({ values, onChange }) {
  // Teks bunga disimpan terpisah dari angkanya supaya "8," atau kolom kosong bisa diketik
  const [rateText, setRateText] = useState(() => rateToText(values.ratePercent))

  // Harga tidak ditentukan oleh tipe unit: pengunjung mengisi sendiri sesuai harga dari tim pemasaran
  function handleUnitChange(event) {
    onChange({ ...values, unitId: event.target.value })
  }

  function handleHargaChange(event) {
    onChange({ ...values, harga: parseRupiahInput(event.target.value) })
  }

  function handleRateChange(event) {
    const { text, value } = parseRateInput(event.target.value)
    setRateText(text)
    onChange({ ...values, ratePercent: value })
  }

  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-base-alt p-6 md:p-8">
      <label className="flex flex-col gap-1">
        <span className="text-sm text-fg-soft">Pilih Tipe Unit</span>
        <select value={values.unitId} onChange={handleUnitChange} className={fieldClass}>
          <option value="">Belum memilih tipe</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.nama}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-fg-soft">Harga Unit</span>
        <div className={groupClass}>
          <span className="shrink-0 pl-4 text-fg-soft">Rp</span>
          <input
            type="text"
            inputMode="numeric"
            value={values.harga ? formatThousands(values.harga) : ""}
            onChange={handleHargaChange}
            placeholder="Isi harga unit"
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-fg outline-none"
          />
        </div>
        <span className="text-xs text-fg-soft">Harga unit disampaikan oleh tim pemasaran.</span>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-fg-soft">Tenor</span>
        <select
          value={values.tenorBulan}
          onChange={(event) => onChange({ ...values, tenorBulan: Number(event.target.value) })}
          className={fieldClass}
        >
          {TENOR_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-fg-soft">Suku Bunga (maksimal {MAX_RATE}%)</span>
        <div className={groupClass}>
          <input
            type="text"
            inputMode="decimal"
            value={rateText}
            onChange={handleRateChange}
            onBlur={() => setRateText(rateToText(values.ratePercent))}
            placeholder="0"
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-fg outline-none"
          />
          <span className="shrink-0 whitespace-nowrap pr-4 text-fg-soft">% / tahun</span>
        </div>
      </label>
    </div>
  )
}
