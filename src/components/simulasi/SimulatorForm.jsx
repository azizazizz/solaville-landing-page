import { units } from "../../data/units"
import { formatThousands } from "../../utils/currency"

const TENOR_OPTIONS = [
  { value: 60, label: "5 tahun (60 bulan)" },
  { value: 120, label: "10 tahun (120 bulan)" },
  { value: 180, label: "15 tahun (180 bulan)" },
  { value: 240, label: "20 tahun (240 bulan)" },
]

// Field terisi di atas panel tonal: dibedakan lewat warna isi, fokus ditandai ring (bukan outline permanen)
const fieldClass =
  "rounded-xl bg-base px-4 py-3 text-fg outline-none ring-2 ring-transparent transition-shadow focus:ring-primary"
const groupClass =
  "flex items-center rounded-xl bg-base ring-2 ring-transparent transition-shadow focus-within:ring-primary"

export default function SimulatorForm({ values, onChange }) {
  function handleUnitChange(event) {
    const unitId = event.target.value
    const unit = units.find((item) => item.id === unitId)
    onChange({
      ...values,
      unitId,
      harga: unit ? unit.hargaMulai : values.harga,
    })
  }

  function handleHargaChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, "")
    onChange({
      ...values,
      unitId: "",
      harga: digitsOnly ? Number(digitsOnly) : 0,
    })
  }

  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-base-alt p-6 md:p-8">
      <label className="flex flex-col gap-1">
        <span className="text-sm text-fg-soft">Pilih Tipe Unit</span>
        <select value={values.unitId} onChange={handleUnitChange} className={fieldClass}>
          <option value="">Isi harga secara manual</option>
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
            value={formatThousands(values.harga)}
            onChange={handleHargaChange}
            placeholder="0"
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-fg outline-none"
          />
        </div>
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
        <span className="text-sm text-fg-soft">Suku Bunga</span>
        <div className={groupClass}>
          <input
            type="number"
            min="0"
            step="0.1"
            value={values.ratePercent}
            onChange={(event) =>
              onChange({ ...values, ratePercent: Number(event.target.value) })
            }
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-fg outline-none"
          />
          <span className="shrink-0 whitespace-nowrap pr-4 text-fg-soft">% / tahun</span>
        </div>
      </label>
    </div>
  )
}
