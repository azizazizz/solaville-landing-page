// Keterangan wajib untuk gambar ilustrasi (bukan foto lokasi). Hapus pemakaiannya bila semua gambar sudah foto asli.
export default function ImageNote({ className = "", children }) {
  return (
    <p className={`text-xs text-fg-soft ${className}`}>
      {children ?? "Gambar hanya ilustrasi. Kondisi sebenarnya dapat berbeda."}
    </p>
  )
}
