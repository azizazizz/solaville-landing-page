import { formatRupiah } from "../../utils/currency"
import useAnimatedNumber from "../../hooks/useAnimatedNumber"

// Panel gelap tetap (tidak ikut berganti tema): satu-satunya titik fokus di halaman ini
export default function SimulatorResult({ result, tenorBulan, onContinue }) {
  const monthlyInstallment = useAnimatedNumber(result.monthlyInstallment)
  const totalPayment = useAnimatedNumber(result.totalPayment)
  const totalInterest = useAnimatedNumber(result.totalInterest)

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-night p-6 text-on-night md:p-8">
      <h3 className="text-xl">Hasil Simulasi</h3>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-on-night/70">Estimasi Cicilan per Bulan</span>
        <span className="text-4xl font-medium text-sky tabular-nums">
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

      <button
        type="button"
        onClick={onContinue}
        className="self-start rounded-xl bg-sky px-6 py-3 font-medium text-night transition-colors hover:bg-on-night"
      >
        Lanjut Buat SPR
      </button>

      <p className="mt-auto text-xs text-on-night/70">
        Simulasi ini bersifat estimasi, menggunakan metode bunga anuitas tanpa uang muka.
        Nilai cicilan sebenarnya mengikuti kebijakan bank penyedia KPR.
      </p>
    </div>
  )
}
