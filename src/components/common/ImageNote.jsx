// Keterangan wajib untuk gambar visualisasi (bukan foto lokasi). Hapus pemakaiannya bila semua gambar sudah foto asli.
export default function ImageNote({ className = "" }) {
  return (
    <p className={`text-xs text-fg-soft ${className}`}>
      Gambar hanya visualisasi ilustratif. Kondisi sebenarnya dapat berbeda.
    </p>
  )
}
