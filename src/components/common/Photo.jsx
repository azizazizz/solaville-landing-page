import { getImage } from "../../utils/images"
import PlaceholderImage from "./PlaceholderImage"

/**
 * Foto dari src/assets/images berdasarkan nama ("galeri/gal-01"), disajikan sebagai WebP responsif.
 * Bila berkasnya belum ada, tampil PlaceholderImage supaya tata letak tetap utuh. Ukuran tampil ditentukan
 * lewat className pemanggil; sizes sengaja sedikit di bawah lebar tampil sebenarnya (misalnya 65vw untuk gambar selebar
 * layar di ponsel) agar layar beresolusi tinggi tidak memilih ukuran terbesar. Gambar sudah berupa render ilustratif,
 * jadi selisih ketajamannya nyaris tidak terlihat.
 * alt kosong berarti gambar dekoratif (isinya sudah disebut teks di dekatnya).
 */
export default function Photo({
  name,
  alt = "",
  label,
  category,
  sizes = "100vw",
  priority = false,
  className = "",
}) {
  const image = getImage(name)

  if (!image) {
    return <PlaceholderImage label={label ?? alt} category={category} className={className} />
  }

  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`bg-base-alt object-cover ${className}`}
    />
  )
}
