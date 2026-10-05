export const siteConfig = {
  brandName: "Solaville",
  tagline: "Hunian Nyaman di Tengah Kehijauan",
  waNumber: "6281234567890",
  waMessageTemplate:
    "Halo Solaville, saya tertarik dengan informasi perumahan dan ingin bertanya lebih lanjut.",
}

export function buildWaLink(customMessage) {
  const message = customMessage || siteConfig.waMessageTemplate
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`
}
