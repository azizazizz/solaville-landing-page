// Semua gambar di src/assets/images dikenali lewat nama relatifnya tanpa ekstensi, misalnya "galeri/gal-01".
// Foto asli cukup ditaruh dengan nama yang sama (jpg, png, webp, atau avif) dan menggantikan gambar yang ada,
// tanpa mengubah kode. Nama yang belum punya berkas akan jatuh ke komponen placeholder.
//
// Setiap gambar diubah saat build menjadi WebP dalam empat ukuran (vite-imagetools), sehingga ponsel hanya
// mengunduh ukuran yang dibutuhkan layarnya. Foto sumber boleh besar; yang dikirim ke pengunjung tetap kecil.
const files = import.meta.glob("../assets/images/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: { w: "480;800;1200;1600", format: "webp", quality: 72, as: "srcset" },
  import: "default",
})

function parseSrcSet(srcSet) {
  const list = srcSet.split(",").map((entry) => {
    const [src, width] = entry.trim().split(/\s+/)
    return { src, width: parseInt(width, 10) }
  })
  list.sort((a, b) => a.width - b.width)
  return {
    srcSet,
    // src untuk peramban tanpa dukungan srcset; largest untuk tampilan layar penuh (lightbox)
    src: (list.find((item) => item.width >= 800) ?? list.at(-1)).src,
    largest: list.at(-1).src,
  }
}

const imageByName = new Map(
  Object.entries(files).map(([path, srcSet]) => [
    path.replace(/^.*\/images\//, "").replace(/\.[^.]+$/, ""),
    parseSrcSet(srcSet),
  ]),
)

// Mengembalikan { src, srcSet, largest } atau undefined bila berkasnya belum ada
export function getImage(name) {
  return imageByName.get(name)
}
