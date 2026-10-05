export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number)
}

export function formatThousands(value) {
  if (!value && value !== 0) return ""
  return new Intl.NumberFormat("id-ID").format(value)
}
