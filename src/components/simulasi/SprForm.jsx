import { useState } from "react"
import { formatRupiah, formatThousands } from "../../utils/currency"
import { buildSprNumber, generateSprPdf } from "./SprDocument"

function TextField({ label, required, error, className = "", ...inputProps }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-sm text-fg-soft">
        {label}
        {required ? <span className="text-danger"> *</span> : <span> (opsional)</span>}
      </span>
      <input
        {...inputProps}
        className={`rounded-xl bg-base px-4 py-3 text-fg outline-none ring-2 transition-shadow ${
          error ? "ring-danger" : "ring-transparent focus:ring-primary"
        }`}
      />
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  )
}

export default function SprForm({
  buyer,
  onBuyerChange,
  unitIdentity,
  onUnitIdentityChange,
  unit,
  harga,
  tenorBulan,
  ratePercent,
  result,
  onComplete,
}) {
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState("")

  function clearError(field) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function updateBuyer(field, value) {
    onBuyerChange({ ...buyer, [field]: value })
    clearError(field)
  }

  function updateUnitIdentity(field, value) {
    onUnitIdentityChange({ ...unitIdentity, [field]: value })
    clearError(field)
  }

  function handleNikChange(event) {
    updateBuyer("nikKtp", event.target.value.replace(/\D/g, "").slice(0, 16))
  }

  function handleBookingFeeChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, "")
    updateUnitIdentity("bookingFee", digitsOnly ? Number(digitsOnly) : 0)
  }

  function validate() {
    const next = {}
    if (!buyer.namaLengkap.trim()) next.namaLengkap = "Nama lengkap wajib diisi."
    if (buyer.nikKtp.length !== 16) next.nikKtp = "NIK KTP harus 16 digit."
    if (!buyer.alamat.trim()) next.alamat = "Alamat wajib diisi."
    if (!buyer.noHp.trim()) next.noHp = "Nomor HP/WhatsApp wajib diisi."
    if (!buyer.pekerjaan.trim()) next.pekerjaan = "Pekerjaan wajib diisi."
    if (buyer.email.trim() && !/^\S+@\S+\.\S+$/.test(buyer.email)) {
      next.email = "Format email tidak valid."
    }
    if (!unitIdentity.bookingFee) next.bookingFee = "Booking fee wajib diisi."

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleGenerate() {
    if (!validate()) return
    setSubmitError("")

    const sprNumber = buildSprNumber()
    const tanggal = new Date().toISOString()
    try {
      generateSprPdf({
        buyer,
        unitIdentity,
        unit,
        harga,
        tenorBulan,
        ratePercent,
        result,
        sprNumber,
        tanggal,
      })
    } catch {
      // Tidak lanjut ke langkah "Selesai" bila PDF gagal dibuat
      setSubmitError("SPR gagal dibuat. Periksa isian Anda lalu coba lagi.")
      return
    }
    onComplete({ sprNumber, tanggal })
  }

  return (
    <div className="rounded-3xl bg-base-alt p-6 md:p-8 flex flex-col gap-8">
      <p className="text-sm text-fg-soft">
        Field bertanda <span className="text-danger">*</span> wajib diisi.
      </p>

      <div>
        <h4 className="text-fg font-medium mb-4">Data Diri</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Nama Lengkap"
            required
            value={buyer.namaLengkap}
            error={errors.namaLengkap}
            onChange={(event) => updateBuyer("namaLengkap", event.target.value)}
            placeholder="Sesuai KTP"
          />
          <TextField
            label="NIK KTP"
            required
            value={buyer.nikKtp}
            error={errors.nikKtp}
            onChange={handleNikChange}
            inputMode="numeric"
            maxLength={16}
            placeholder="16 digit sesuai KTP"
          />
          <TextField
            label="NPWP"
            value={buyer.npwp}
            onChange={(event) => updateBuyer("npwp", event.target.value)}
            placeholder="Jika ada"
          />
          <TextField
            label="No. HP / WhatsApp"
            required
            value={buyer.noHp}
            error={errors.noHp}
            onChange={(event) => updateBuyer("noHp", event.target.value)}
            inputMode="tel"
            placeholder="08xxxxxxxxxx"
          />
          <TextField
            label="Email"
            value={buyer.email}
            error={errors.email}
            onChange={(event) => updateBuyer("email", event.target.value)}
            type="email"
            placeholder="nama@email.com"
          />
          <TextField
            label="Pekerjaan"
            required
            value={buyer.pekerjaan}
            error={errors.pekerjaan}
            onChange={(event) => updateBuyer("pekerjaan", event.target.value)}
            placeholder="Contoh: Karyawan Swasta"
          />
          <TextField
            label="Alamat"
            required
            value={buyer.alamat}
            error={errors.alamat}
            onChange={(event) => updateBuyer("alamat", event.target.value)}
            placeholder="Alamat sesuai KTP"
            className="sm:col-span-2"
          />
        </div>
      </div>

      <div>
        <h4 className="text-fg font-medium mb-4">Data Unit</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Blok"
            value={unitIdentity.blok}
            onChange={(event) => updateUnitIdentity("blok", event.target.value)}
            placeholder="Contoh: A"
          />
          <TextField
            label="No. Unit"
            value={unitIdentity.noUnit}
            onChange={(event) => updateUnitIdentity("noUnit", event.target.value)}
            placeholder="Contoh: 12"
          />

          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-sm text-fg-soft">
              Booking Fee<span className="text-danger"> *</span>
            </span>
            <div
              className={`flex items-center rounded-xl bg-base ring-2 transition-shadow ${
                errors.bookingFee ? "ring-danger" : "ring-transparent focus-within:ring-primary"
              }`}
            >
              <span className="shrink-0 pl-4 text-fg-soft">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatThousands(unitIdentity.bookingFee)}
                onChange={handleBookingFeeChange}
                placeholder="0"
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-fg outline-none"
              />
            </div>
            {errors.bookingFee ? <span className="text-xs text-danger">{errors.bookingFee}</span> : null}
          </label>
        </div>

        <dl className="mt-4 grid sm:grid-cols-2 gap-x-4 gap-y-1 rounded-xl bg-base px-5 py-4 text-sm">
          <dt className="text-fg-soft">Tipe Unit (mengikuti simulasi)</dt>
          <dd className="text-fg">{unit ? unit.nama : "Belum dipilih"}</dd>
          <dt className="text-fg-soft">Luas Tanah / Bangunan</dt>
          <dd className="text-fg">
            {unit ? `${unit.luasTanah} m² / ${unit.luasBangunan} m²` : "-"}
          </dd>
          <dt className="text-fg-soft">Harga Jual</dt>
          <dd className="text-fg">{formatRupiah(harga)}</dd>
        </dl>
      </div>

      <div className="flex flex-col items-start gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          className="rounded-xl bg-primary px-6 py-3 text-on-primary transition-colors hover:bg-primary-dark"
        >
          Buat SPR (PDF)
        </button>
        {submitError ? (
          <p role="alert" className="text-sm text-danger">
            {submitError}
          </p>
        ) : null}
      </div>
    </div>
  )
}
