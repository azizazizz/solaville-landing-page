// Semua gambar di src/assets/images dikenali lewat nama relatifnya tanpa ekstensi, misalnya "galeri/gal-01".
// Foto asli cukup ditaruh dengan nama yang sama (jpg, png, webp, atau avif) dan menggantikan gambar yang ada,
// tanpa mengubah kode. Nama yang belum punya berkas akan jatuh ke komponen placeholder.
//
// Setiap gambar diubah saat build menjadi WebP dalam lima ukuran (vite-imagetools), sehingga ponsel hanya
// mengunduh ukuran yang dibutuhkan layarnya. Foto sumber boleh besar; yang dikirim ke pengunjung tetap kecil.
const files = import.meta.glob("../assets/images/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: { w: "480;800;1200;1600;2000", format: "webp", quality: 82, as: "srcset" },
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

// Slot yang sementara memakai gambar yang sama dengan galeri. Satu gambar hanya boleh ada sebagai satu berkas:
// berkas kembar membuat nama hasil build bentrok di mesin build tertentu (Vercel) dan merusak prerender.
// Begitu foto asli ditaruh dengan nama slotnya (mis. unit/tipe-36-eksterior.jpg), foto itu otomatis dipakai.
const CADANGAN = {
  "hero/beranda": "galeri/gal-10",
  "unit/tipe-36-eksterior": "galeri/gal-01",
  "unit/tipe-36-ruang-tamu": "galeri/gal-03",
  "unit/tipe-36-kamar": "galeri/gal-04",
  "keunggulan/akses-tol": "galeri/gal-11",
  "keunggulan/sekolah": "galeri/gal-12",
  "keunggulan/rth": "galeri/gal-08",
}

// Mengembalikan { src, srcSet, largest } atau undefined bila berkasnya belum ada
export function getImage(name) {
  return imageByName.get(name) ?? imageByName.get(CADANGAN[name])
}
