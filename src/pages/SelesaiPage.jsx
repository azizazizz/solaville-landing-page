import { useEffect, useRef, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { getUnitById } from "../data/units"
import { buildWaLink } from "../data/siteConfig"
import { formatRupiah } from "../utils/currency"
import { calculateInstallment } from "../utils/loan"
import { clearSprData, getCompletedSpr } from "../utils/sprDraft"
import { IconCheck, IconWhatsapp } from "../components/common/icons"
import StepIndicator from "../components/simulasi/StepIndicator"

function SummaryItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm text-fg-soft">{label}</dt>
      <dd className="text-fg">{value}</dd>
    </div>
  )
}

export default function SelesaiPage() {
  const navigate = useNavigate()
  const headingRef = useRef(null)
  const [downloadError, setDownloadError] = useState("")
  const [mengunduh, setMengunduh] = useState(false)
  const completed = getCompletedSpr()

  // Memindahkan fokus ke judul agar pembaca layar langsung mendengar bahwa SPR sudah dibuat
  useEffect(() => {
    headingRef.current?.focus()
    // Pembuat PDF (jsPDF) dimuat diam-diam supaya "Unduh Ulang" langsung berjalan
    import("../utils/sprDocument").catch(() => {})
  }, [])

  // Tanpa SPR yang baru dibuat (mis. halaman dimuat ulang), tidak ada yang bisa ditampilkan
  if (!completed) return <Navigate to="/spr" replace />

  const { sprNumber, tanggal, buyer, unitIdentity, simulasi } = completed
  const unit = getUnitById(simulasi.unitId)
  const result = calculateInstallment(simulasi.harga, simulasi.tenorBulan, simulasi.ratePercent)
  const tanggalLabel = new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const unitLabel = [
    unit ? unit.nama : "Unit pilihan",
    unitIdentity.blok ? `Blok ${unitIdentity.blok}` : "",
    unitIdentity.noUnit ? `No. ${unitIdentity.noUnit}` : "",
  ]
    .filter(Boolean)
    .join(", ")

  // NIK dan data sensitif lain sengaja tidak dimasukkan ke pesan WhatsApp
  const waMessage = `Halo Solaville, saya ${buyer.namaLengkap}. Saya sudah membuat SPR nomor ${sprNumber} untuk ${unitLabel}. Mohon info proses selanjutnya.`

  async function handleDownloadAgain() {
    setDownloadError("")
    setMengunduh(true)
    try {
      const { generateSprPdf } = await import("../utils/sprDocument")
      generateSprPdf({
        buyer,
        unitIdentity,
        unit,
        harga: simulasi.harga,
        tenorBulan: simulasi.tenorBulan,
        ratePercent: simulasi.ratePercent,
        result,
        sprNumber,
        tanggal,
      })
    } catch {
      setDownloadError("SPR gagal diunduh. Coba lagi.")
    } finally {
      setMengunduh(false)
    }
  }

  function handleNewSpr() {
    clearSprData()
    navigate("/spr")
  }

  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <StepIndicator current={3} />

      <div className="mt-6 flex flex-col gap-6 rounded-3xl bg-night p-6 text-on-night md:p-10">
        <span className="animate-pop-in flex h-14 w-14 items-center justify-center rounded-full bg-gold text-night">
          <IconCheck className="h-7 w-7" />
        </span>

        <div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-3xl font-medium outline-none md:text-4xl"
          >
            SPR dan simulasi telah dibuat!
          </h1>
          <p className="mt-3 max-w-2xl text-on-night/80">
            Dokumen SPR sudah diunduh ke perangkat Anda. Simpan dokumen ini untuk proses berikutnya.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={buildWaLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-whatsapp px-6 py-3 font-medium text-night transition-colors hover:bg-whatsapp-dark"
          >
            <IconWhatsapp className="h-5 w-5" />
            Hubungi Tim Pemasaran
          </a>
          <button
            type="button"
            onClick={handleDownloadAgain}
            disabled={mengunduh}
            aria-busy={mengunduh}
            className="rounded-xl bg-on-night/10 px-6 py-3 text-on-night transition-colors hover:bg-on-night/20 disabled:cursor-wait disabled:opacity-60"
          >
            {mengunduh ? "Menyiapkan PDF..." : "Unduh Ulang SPR (PDF)"}
          </button>
        </div>
        {downloadError ? (
          <p role="alert" className="text-sm text-on-night/90">
            {downloadError}
          </p>
        ) : null}
      </div>

      <div className="mt-6 rounded-3xl bg-base-alt p-6 md:p-8">
        <h2 className="text-xl text-fg">Ringkasan</h2>
        <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          <SummaryItem label="Nomor SPR" value={sprNumber} />
          <SummaryItem label="Tanggal" value={tanggalLabel} />
          <SummaryItem label="Nama Pemesan" value={buyer.namaLengkap} />
          <SummaryItem label="Unit" value={unitLabel} />
          <SummaryItem label="Harga Jual" value={formatRupiah(simulasi.harga)} />
          <SummaryItem label="Booking Fee" value={formatRupiah(unitIdentity.bookingFee)} />
          <SummaryItem label="Tenor" value={`${simulasi.tenorBulan} bulan`} />
          <SummaryItem label="Suku Bunga" value={`${simulasi.ratePercent}% per tahun`} />
          <SummaryItem
            label="Estimasi Cicilan per Bulan"
            value={formatRupiah(Math.round(result.monthlyInstallment))}
          />
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-8">
        <button
          type="button"
          onClick={handleNewSpr}
          className="-my-3 py-3 text-sm uppercase tracking-wide text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
        >
          Buat SPR Baru
        </button>
        <Link
          to="/"
          className="-my-3 py-3 text-sm uppercase tracking-wide text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  )
}
