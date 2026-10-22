export const siteConfig = {
  brandName: "Solaville",
  tagline: "Harmoni Sempurna untuk Keluarga",
  // Program "cukup booking Rp3 juta": nilai awal kolom booking fee di form SPR (pembeli tetap bisa mengubahnya)
  bookingFee: 3000000,
  waNumber: "6281234567890",
  waMessageTemplate:
    "Halo Solaville, saya tertarik dengan informasi perumahan dan ingin bertanya lebih lanjut.",
}

export function buildWaLink(customMessage) {
  const message = customMessage || siteConfig.waMessageTemplate
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`
}
