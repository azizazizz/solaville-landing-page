import { IconHouse } from "./icons"

// Dibedakan lewat warna isi, bukan garis tepi. Radius ditentukan pemanggil/pembungkusnya.
const TONES = {
  eksterior: "bg-primary/15",
  interior: "bg-base-alt",
  fasilitas: "bg-gold/25",
  lingkungan: "bg-primary/10",
  default: "bg-primary/15",
}

/**
 * Representasi visual sementara untuk foto properti yang belum tersedia.
 * Diganti dengan foto asli (unit, fasilitas, lingkungan) saat aset sudah siap.
 */
export default function PlaceholderImage({
  label,
  category = "default",
  className = "",
}) {
  const tone = TONES[category] || TONES.default

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 text-primary ${tone} ${className}`}
    >
      <IconHouse className="w-10 h-10 opacity-70" />
      {label ? <span className="text-xs text-fg text-center px-3">{label}</span> : null}
    </div>
  )
}
