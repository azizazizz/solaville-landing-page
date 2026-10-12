import { getImageUrl } from "../../utils/images"
import PlaceholderImage from "./PlaceholderImage"

/**
 * Foto dari src/assets/images berdasarkan nama ("galeri/gal-01"). Bila berkasnya belum ada,
 * tampil PlaceholderImage supaya tata letak tetap utuh. Ukuran ditentukan lewat className pemanggil.
 * alt kosong berarti gambar dekoratif (isinya sudah disebut teks di dekatnya).
 */
export default function Photo({
  name,
  alt = "",
  label,
  category,
  priority = false,
  className = "",
}) {
  const src = getImageUrl(name)

  if (!src) {
    return <PlaceholderImage label={label ?? alt} category={category} className={className} />
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`bg-base-alt object-cover ${className}`}
    />
  )
}
