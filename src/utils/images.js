// Semua gambar di src/assets/images dikenali lewat nama relatifnya tanpa ekstensi, misalnya "galeri/gal-01".
// Foto asli cukup ditaruh dengan nama yang sama (jpg, png, webp, atau avif) dan menggantikan gambar yang ada,
// tanpa mengubah kode. Nama yang belum punya berkas akan jatuh ke komponen placeholder.
const files = import.meta.glob("../assets/images/**/*.{jpg,jpeg,png,webp,avif,svg}", {
  eager: true,
  query: "?url",
  import: "default",
})

const urlByName = new Map(
  Object.entries(files).map(([path, url]) => [
    path.replace(/^.*\/images\//, "").replace(/\.[^.]+$/, ""),
    url,
  ]),
)

export function getImageUrl(name) {
  return urlByName.get(name)
}
