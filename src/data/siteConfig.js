const BOOKING_FEE = 3000000

export const siteConfig = {
  brandName: "Solaville",
  tagline: "Harmoni Sempurna untuk Keluarga",
  // Program "cukup booking Rp3 juta": nilai awal kolom booking fee di form SPR (pembeli tetap bisa mengubahnya)
  bookingFee: BOOKING_FEE,
  // Teks promo diturunkan dari angka yang sama agar tidak bisa berbeda dengan form
  bookingLabel: `Rp${BOOKING_FEE / 1000000} juta`,
  // Format internasional tanpa tanda + atau spasi (+62 877-8812-0242)
  waNumber: "6287788120242",
  waMessageTemplate:
    "Halo Solaville, saya tertarik dengan informasi perumahan dan ingin bertanya lebih lanjut.",
}

export function buildWaLink(customMessage) {
  const message = customMessage || siteConfig.waMessageTemplate
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`
}
