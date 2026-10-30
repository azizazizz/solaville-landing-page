import { formatRupiah } from "../../utils/currency"
import useAnimatedNumber from "../../hooks/useAnimatedNumber"

// Panel gelap tetap (tidak ikut berganti tema): satu-satunya titik fokus di halaman ini
export default function SimulatorResult({ result, tenorBulan, canContinue = true, onContinue }) {
  const monthlyInstallment = useAnimatedNumber(result.monthlyInstallment)
  const totalPayment = useAnimatedNumber(result.totalPayment)
  const totalInterest = useAnimatedNumber(result.totalInterest)

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-night p-6 text-on-night md:p-8">
      <h2 className="text-xl">Hasil Simulasi</h2>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-on-night/70">Estimasi Cicilan per Bulan</span>
        <span className="text-4xl font-medium text-gold tabular-nums">
          {formatRupiah(Math.round(monthlyInstallment))}
        </span>
      </div>

      <dl className="flex flex-col gap-3 text-sm text-on-night/80 tabular-nums">
        <div className="flex justify-between gap-4">
          <dt>Jangka waktu</dt>
          <dd>{tenorBulan} bulan</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Total pembayaran</dt>
          <dd>{formatRupiah(Math.round(totalPayment))}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Total bunga</dt>
          <dd>{formatRupiah(Math.round(totalInterest))}</dd>
        </div>
      </dl>

      <div className="flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-xl bg-gold px-6 py-3 font-medium text-night transition-colors hover:bg-on-night disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gold"
        >
          Lanjut Buat SPR
        </button>
        {!canContinue ? (
          <p className="text-sm text-on-night/80">Isi harga unit terlebih dahulu untuk melanjutkan.</p>
        ) : null}
      </div>

      <p className="mt-auto text-xs text-on-night/70">
        Memakai metode bunga anuitas tanpa uang muka. Cicilan sebenarnya mengikuti kebijakan bank penyedia KPR.
      </p>
    </div>
  )
}
