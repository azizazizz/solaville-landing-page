import { getImage } from "../../utils/images"
import PlaceholderImage from "./PlaceholderImage"

/**
 * Foto dari src/assets/images berdasarkan nama ("galeri/gal-01"), disajikan sebagai WebP responsif.
 * Bila berkasnya belum ada, tampil PlaceholderImage supaya tata letak tetap utuh. Ukuran tampil ditentukan
 * lewat className pemanggil; sizes harus sama dengan lebar tampil sebenarnya (hitung dari tata letaknya) supaya
 * peramban memilih varian yang tepat: terlalu kecil membuat gambar buram, terlalu besar membuang kuota.
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
