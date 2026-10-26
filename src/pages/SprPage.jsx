import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUnitById, units } from "../data/units"
import { formatRupiah } from "../utils/currency"
import { calculateInstallment } from "../utils/loan"
import { loadSimulation, saveSimulation } from "../utils/simulationStore"
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

// SPR butuh harga unit, yang diisi di langkah Simulasi. Tanpa itu pengunjung diarahkan kembali ke sana.
function PerluSimulasi() {
  return (
    <div className="mt-8 rounded-3xl bg-base-alt p-6 md:p-8">
      <h2 className="text-xl text-fg">Isi harga unit di simulasi dulu</h2>
      <p className="mt-1 max-w-xl text-sm text-fg-soft">
        Surat Pesanan Rumah dibuat dari hasil simulasi. Isi harga unit dari tim pemasaran, pilih tenor, lalu lanjutkan ke sini.
      </p>
      <Link
        to="/simulasi"
        className="mt-5 inline-block rounded-xl bg-primary px-6 py-3 text-on-primary transition-colors hover:bg-primary-dark"
      >
        Buka Simulasi
      </Link>
    </div>
  )
}

// Bila katalog hanya punya satu tipe, tidak ada yang perlu dipilih: SPR otomatis untuk tipe itu
const ONLY_UNIT = units.length === 1 ? units[0] : undefined

export default function SprPage() {
  const navigate = useNavigate()
  // Simulasi tersimpan (harga sudah diisi di langkah 1). Tanpa itu tidak ada harga untuk dicantumkan di SPR.
  const [simulasi, setSimulasi] = useState(() => loadSimulation())
  const [buyer, setBuyer] = useState(() => getSprDraft().buyer)
  const [unitIdentity, setUnitIdentity] = useState(() => getSprDraft().unitIdentity)

  useEffect(() => {
    if (simulasi) saveSimulation(simulasi)
  }, [simulasi])

  useEffect(() => {
    saveSprDraft({ buyer, unitIdentity })
  }, [buyer, unitIdentity])

  // Harga manual di simulasi tetap dipakai, tetapi tipenya otomatis bila hanya ada satu tipe
  const unit = simulasi ? (getUnitById(simulasi.unitId) ?? ONLY_UNIT) : undefined
  const result = useMemo(
    () =>
      simulasi
        ? calculateInstallment(simulasi.harga, simulasi.tenorBulan, simulasi.ratePercent)
        : null,
    [simulasi],
  )

  // Dipakai saat harga diisi manual di simulasi (belum ada tipe): harga tetap, tipe ditambahkan
  function handleUnitChange(unitId) {
    setSimulasi((prev) => (prev ? { ...prev, unitId } : prev))
  }

  // Simpan salinan SPR yang baru dibuat (untuk ringkasan dan unduh ulang), lalu ke langkah 3
  function handleComplete({ sprNumber, tanggal }) {
    // unitId disimpan sudah terselesaikan, supaya unduh ulang di halaman Selesai persis sama
    saveCompletedSpr({
      sprNumber,
      tanggal,
      buyer,
      unitIdentity,
      simulasi: { ...simulasi, unitId: unit ? unit.id : simulasi.unitId },
    })
    navigate("/selesai")
  }

  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeading
        level={1}
        eyebrow="Surat Pesanan Rumah"
        title="Lengkapi Data Pemesanan"
        description="Isi data diri dan data unit untuk membuat dokumen SPR dalam bentuk PDF. Data diproses di perangkat Anda dan tidak dikirim ke server."
      />

      <div className="mt-6">
        <StepIndicator current={2} />
      </div>

      {!simulasi ? (
        <PerluSimulasi />
      ) : (
        <>
          <div className="mt-6 rounded-3xl bg-base-alt p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl text-fg">Ringkasan Simulasi</h2>
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
              onUnitChange={handleUnitChange}
              onComplete={handleComplete}
            />
          </div>
        </>
      )}
    </section>
  )
}
