/**
 * Simulasi cicilan KPR sederhana menggunakan metode anuitas (bunga efektif),
 * tanpa memperhitungkan uang muka/DP. Seluruh harga unit dianggap sebagai pokok pinjaman.
 */
export function calculateInstallment(price, tenorMonths, annualRatePercent) {
  if (!price || !tenorMonths || annualRatePercent == null) {
    return { monthlyInstallment: 0, totalPayment: 0, totalInterest: 0 }
  }

  const monthlyRate = annualRatePercent / 100 / 12

  if (monthlyRate === 0) {
    const monthlyInstallment = price / tenorMonths
    return {
      monthlyInstallment,
      totalPayment: price,
      totalInterest: 0,
    }
  }

  const factor = Math.pow(1 + monthlyRate, tenorMonths)
  const monthlyInstallment = (price * monthlyRate * factor) / (factor - 1)
  const totalPayment = monthlyInstallment * tenorMonths
  const totalInterest = totalPayment - price

  return { monthlyInstallment, totalPayment, totalInterest }
}
