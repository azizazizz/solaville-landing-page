import { useEffect, useMemo, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getUnitById, units } from "../data/units"
import { formatRupiah } from "../utils/currency"
import { calculateInstallment } from "../utils/loan"
import { loadSimulation, saveSimulation, simulationForUnit } from "../utils/simulationStore"
import { getSprDraft, saveCompletedSpr, saveSprDraft } from "../utils/sprDraft"
import SectionHeading from "../components/common/SectionHeading"
import SprForm from "../components/simulasi/SprForm"
import StepIndicator from "../components/simulasi/StepIndicator"

function SummaryItem({ label, value, highlight = false }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm text-fg-soft">{label}</dt>
      <dd className={highlight ? "text-xl font-medium text-primary" : "text-fg"}>{value}</dd>
    </div>
  )
}

function UnitPicker({ onPick }) {
  return (
    <div className="mt-8 rounded-3xl bg-base-alt p-6 md:p-8">
      <h3 className="text-xl text-fg">Pilih Tipe Unit</h3>
      <p className="mt-1 max-w-xl text-sm text-fg-soft">
        Pilih tipe unit yang ingin dipesan untuk melanjutkan. Ingin menghitung cicilan dulu?{" "}
        <Link
          to="/simulasi"
          className="underline decoration-fg/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
        >
          Buka simulasi
        </Link>
        .
      </p>

      <label className="mt-5 flex max-w-md flex-col gap-1">
        <span className="text-sm text-fg-soft">Tipe Unit</span>
        <select
          value=""
          onChange={(event) => onPick(event.target.value)}
          className="rounded-xl bg-base px-4 py-3 text-fg outline-none ring-2 ring-transparent transition-shadow focus:ring-primary"
        >
          <option value="" disabled>
            Pilih tipe unit
          </option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.nama} - mulai {formatRupiah(unit.hargaMulai)}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default function SprPage() {
  const location = useLocation()
  const navigate = useNavigate()
  // Prioritas: unit dari tombol "Pesan Unit Ini", lalu simulasi tersimpan. Tanpa keduanya tidak ada
  // nilai bawaan: pengunjung diminta memilih unit dulu.
  const [simulasi, setSimulasi] = useState(() => {
    const unitFromState = getUnitById(location.state?.unitId)
    return unitFromState ? simulationForUnit(unitFromState) : loadSimulation()
  })
  const [buyer, setBuyer] = useState(() => getSprDraft().buyer)
  const [unitIdentity, setUnitIdentity] = useState(() => getSprDraft().unitIdentity)

  useEffect(() => {
    if (simulasi) saveSimulation(simulasi)
  }, [simulasi])

  useEffect(() => {
    saveSprDraft({ buyer, unitIdentity })
  }, [buyer, unitIdentity])

  const unit = simulasi ? getUnitById(simulasi.unitId) : undefined
  const result = useMemo(
    () =>
      simulasi
        ? calculateInstallment(simulasi.harga, simulasi.tenorBulan, simulasi.ratePercent)
        : null,
    [simulasi],
  )

  function handlePickUnit(unitId) {
    const picked = getUnitById(unitId)
    if (picked) setSimulasi(simulationForUnit(picked))
  }

  // Simpan salinan SPR yang baru dibuat (untuk ringkasan dan unduh ulang), lalu ke langkah 3
  function handleComplete({ sprNumber, tanggal }) {
    saveCompletedSpr({ sprNumber, tanggal, buyer, unitIdentity, simulasi })
    navigate("/selesai")
  }

  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeading
        eyebrow="Surat Pesanan Rumah"
        title="Lengkapi Data Pemesanan"
        description="Isi data diri dan data unit untuk membuat dokumen SPR dalam bentuk PDF. Data diproses di perangkat Anda dan tidak dikirim ke server."
      />

      <div className="mt-6">
        <StepIndicator current={2} />
      </div>

      {!simulasi ? (
        <UnitPicker onPick={handlePickUnit} />
      ) : (
        <>
          <div className="mt-6 rounded-3xl bg-base-alt p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl text-fg">Ringkasan Simulasi</h3>
              <Link
                to="/simulasi"
                className="-my-3 py-3 text-sm uppercase tracking-wide text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                Ubah Simulasi
              </Link>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-5">
              <SummaryItem label="Tipe Unit" value={unit ? unit.nama : "Harga manual"} />
              <SummaryItem label="Harga Jual" value={formatRupiah(simulasi.harga)} />
              <SummaryItem label="Tenor" value={`${simulasi.tenorBulan} bulan`} />
              <SummaryItem label="Suku Bunga" value={`${simulasi.ratePercent}% per tahun`} />
              <SummaryItem
                label="Estimasi Cicilan per Bulan"
                value={formatRupiah(Math.round(result.monthlyInstallment))}
                highlight
              />
            </dl>
          </div>

          <div className="mt-8">
            <SprForm
              buyer={buyer}
              onBuyerChange={setBuyer}
              unitIdentity={unitIdentity}
              onUnitIdentityChange={setUnitIdentity}
              unit={unit}
              harga={simulasi.harga}
              tenorBulan={simulasi.tenorBulan}
              ratePercent={simulasi.ratePercent}
              result={result}
              onComplete={handleComplete}
            />
          </div>
        </>
      )}
    </section>
  )
}
