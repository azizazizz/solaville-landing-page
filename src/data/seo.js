// Sumber tunggal SEO dan GEO: judul, deskripsi, data terstruktur (JSON-LD), sitemap, robots, dan llms.txt.
// Dipakai dua pihak dari data yang sama agar teksnya tidak bisa berbeda:
//   - klien: src/hooks/useRouteSeo.js memperbarui <head> saat berpindah halaman
//   - build: scripts/prerender.mjs menulis HTML tiap rute, sitemap.xml, robots.txt, dan llms.txt
// Impor memakai ekstensi .js karena berkas ini dibaca langsung oleh Node saat build.
// Menambah rute baru di src/AppRoutes.jsx berarti menambah entri di `routes` di bawah (build akan gagal bila lupa).
import { company } from "./company.js"
import { contact } from "./contact.js"
import { faq } from "./faq.js"
import { siteConfig } from "./siteConfig.js"
import { units } from "./units.js"

export const SITE_URL = "https://perumahansolaville.com"

export const OG_IMAGE = {
  path: "/og-solaville.jpg",
  width: 1200,
  height: 630,
  alt: `${siteConfig.brandName}, ${siteConfig.tagline}. Rumah Mezzanine Premium, DP 0%, cukup booking ${siteConfig.bookingLabel}.`,
}

// mode: full   = HTML prerender lengkap (isi halaman ada di HTML)
//       shell  = hanya <head>, isi dibuat di browser (halaman yang membaca sessionStorage)
// noindex: tidak boleh diindeks; sitemap: masuk sitemap.xml
export const routes = {
  "/": {
    mode: "full",
    nama: "Beranda",
    sitemap: true,
    title: "Perumahan Solaville Bekasi, Rumah Mezzanine DP 0%",
    description: `Perumahan Solaville di Serang Baru, Kabupaten Bekasi. Rumah Mezzanine Premium tipe 36/72, DP 0%, cukup booking ${siteConfig.bookingLabel}, dekat Tol Sukaragam.`,
  },
  "/tentang": {
    mode: "full",
    nama: "Tentang",
    sitemap: true,
    schemaType: "AboutPage",
    title: "Tentang Solaville | Perumahan Hijau di Serang Baru",
    description: `Tentang perumahan Solaville: Rumah Mezzanine Premium yang eksklusif, modern, dan terjangkau, dibangun ${company.tahunPembangunan} di Serang Baru, Kabupaten Bekasi.`,
  },
  "/unit": {
    mode: "full",
    nama: "Tipe Unit",
    sitemap: true,
    title: "Rumah Mezzanine Tipe 36/72 di Solaville Bekasi",
    description:
      "Rumah Mezzanine tipe 36/72 di Solaville: 2 kamar tidur, 1 kamar mandi, carport, tanah 72 m2, bangunan 36 m2. Lihat spesifikasi, denah, dan foto.",
  },
  "/galeri": {
    mode: "full",
    nama: "Galeri",
    sitemap: true,
    schemaType: "ImageGallery",
    title: "Galeri Visualisasi Solaville",
    description:
      "Galeri visualisasi perumahan Solaville: fasad, interior, taman bermain, jalan lingkungan, dan kawasan sekitar. Gambar adalah ilustrasi desain.",
  },
  "/kontak": {
    mode: "full",
    nama: "Kontak",
    sitemap: true,
    schemaType: "ContactPage",
    title: "Lokasi dan Kontak Solaville | Serang Baru Bekasi",
    description:
      "Lokasi Solaville di Kp. Sampora, Jayasampurna, Serang Baru, Kabupaten Bekasi, dekat Tol Sukaragam. Minta petunjuk arah atau hubungi tim pemasaran.",
  },
  // Dua halaman hukum masih teks contoh yang belum ditinjau notaris: jangan diindeks dulu
  "/syarat-dan-ketentuan": {
    mode: "full",
    nama: "Syarat dan Ketentuan",
    noindex: true,
    title: "Syarat dan Ketentuan | Solaville",
    description: "Syarat dan ketentuan penggunaan situs dan program pemasaran perumahan Solaville.",
  },
  "/kebijakan-privasi": {
    mode: "full",
    nama: "Kebijakan Privasi",
    noindex: true,
    title: "Kebijakan Privasi | Solaville",
    description: "Kebijakan privasi situs perumahan Solaville: data apa yang diproses dan bagaimana digunakan.",
  },
  // Halaman alur pemesanan: membaca sessionStorage saat render, jadi hanya <head> yang diprerender
  "/simulasi": {
    mode: "shell",
    nama: "Simulasi",
    noindex: true,
    title: "Simulasi Cicilan Rumah | Solaville",
    description: "Hitung estimasi cicilan rumah Solaville dengan metode anuitas tanpa uang muka.",
  },
  "/spr": {
    mode: "shell",
    nama: "Data Pemesanan",
    noindex: true,
    title: "Data Pemesanan SPR | Solaville",
    description: "Lengkapi data pemesanan untuk membuat Surat Pesanan Rumah (SPR) perumahan Solaville.",
  },
  "/selesai": {
    mode: "shell",
    nama: "Selesai",
    noindex: true,
    title: "Pemesanan Selesai | Solaville",
    description: "Surat Pesanan Rumah (SPR) dan simulasi cicilan Solaville telah dibuat.",
  },
}

export const NOT_FOUND = {
  title: "Halaman Tidak Ditemukan | Solaville",
  description: "Halaman yang Anda cari tidak ditemukan di situs perumahan Solaville.",
}

// ---------- bot AI (kebijakan di robots.txt; bersifat imbauan, bukan penghalang teknis) ----------
export const BOT_PENCARIAN_AI = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
]
export const BOT_PELATIHAN_AI = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Bytespider",
]

// ---------- pembantu ----------
export function normalizePath(pathname) {
  const bersih = String(pathname || "/").split("?")[0].split("#")[0].replace(/\/+$/, "")
  return bersih === "" ? "/" : bersih
}

export const absoluteUrl = (path) => `${SITE_URL}${path === "/" ? "/" : path}`

const ID = {
  org: `${SITE_URL}/#organization`,
  web: `${SITE_URL}/#website`,
  place: `${SITE_URL}/#perumahan`,
  unit: (u) => `${SITE_URL}/unit#${u.id}`,
}

const alamatPos = () => ({
  "@type": "PostalAddress",
  streetAddress: "Kp. Sampora, Jayasampurna, Kec. Serang Baru",
  addressLocality: "Kabupaten Bekasi",
  addressRegion: "Jawa Barat",
  postalCode: "17330",
  addressCountry: "ID",
})

const koordinat = () => ({ "@type": "GeoCoordinates", latitude: contact.lat, longitude: contact.lng })

const deskripsiSingkat = `Perumahan ${siteConfig.brandName}: Rumah Mezzanine Premium yang eksklusif, modern, dan terjangkau di Serang Baru, Kabupaten Bekasi. DP 0%, cukup booking ${siteConfig.bookingLabel}.`

// Telepon dan email hanya masuk bila sudah diverifikasi (lihat contact.diverifikasi)
function nodeOrganisasi() {
  const node = {
    "@type": ["Organization", "RealEstateAgent"],
    "@id": ID.org,
    name: siteConfig.brandName,
    alternateName: "Sola Ville",
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-192x192.png`, width: 192, height: 192 },
    image: `${SITE_URL}${OG_IMAGE.path}`,
    description: deskripsiSingkat,
    address: alamatPos(),
    geo: koordinat(),
    hasMap: contact.mapsUrl,
  }
  if (contact.diverifikasi.telepon) node.telephone = contact.telepon
  if (contact.diverifikasi.email) node.email = contact.email
  return node
}

const nodeWebsite = () => ({
  "@type": "WebSite",
  "@id": ID.web,
  name: siteConfig.brandName,
  url: absoluteUrl("/"),
  inLanguage: "id-ID",
  publisher: { "@id": ID.org },
})

function nodeUnit(unit) {
  return {
    "@type": "SingleFamilyResidence",
    "@id": ID.unit(unit),
    name: `Rumah Mezzanine Premium ${unit.nama}`,
    description: `${unit.deskripsi} Luas tanah ${unit.luasTanah} m2.`,
    image: `${SITE_URL}${OG_IMAGE.path}`,
    floorSize: { "@type": "QuantitativeValue", value: unit.luasBangunan, unitCode: "MTK" },
    numberOfBedrooms: unit.kamarTidur,
    numberOfBathroomsTotal: unit.kamarMandi,
    address: alamatPos(),
    geo: koordinat(),
  }
}

function nodePerumahan() {
  return {
    "@type": "GatedResidenceCommunity",
    "@id": ID.place,
    name: `Perumahan ${siteConfig.brandName}`,
    alternateName: "Sola Ville",
    description: deskripsiSingkat,
    url: absoluteUrl("/"),
    image: `${SITE_URL}${OG_IMAGE.path}`,
    address: alamatPos(),
    geo: koordinat(),
    hasMap: contact.mapsUrl,
    amenityFeature: company.promo.fasilitas.map((item) => ({
      "@type": "LocationFeatureSpecification",
      name: item.nama,
      value: true,
    })),
    containsPlace: units.map((unit) => ({ "@id": ID.unit(unit) })),
  }
}

function nodeHalaman(path, route) {
  const url = absoluteUrl(path)
  return {
    "@type": route.schemaType ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: "id-ID",
    isPartOf: { "@id": ID.web },
    about: { "@id": ID.place },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  }
}

function nodeBreadcrumb(path, route) {
  const url = absoluteUrl(path)
  const item = (posisi, nama, tautan) => ({ "@type": "ListItem", position: posisi, name: nama, item: tautan })
  const daftar =
    path === "/"
      ? [item(1, "Beranda", absoluteUrl("/"))]
      : [item(1, "Beranda", absoluteUrl("/")), item(2, route.nama, url)]
  return { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: daftar }
}

function nodeFaq() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pertanyaan,
      acceptedAnswer: { "@type": "Answer", text: item.jawaban },
    })),
  }
}

function buildJsonLd(path, route) {
  if (route.noindex) return null
  const graph = [nodeOrganisasi(), nodeWebsite(), nodePerumahan(), ...units.map(nodeUnit), nodeHalaman(path, route), nodeBreadcrumb(path, route)]
  if (path === "/") graph.push(nodeFaq())
  return { "@context": "https://schema.org", "@graph": graph }
}

/**
 * Semua yang dibutuhkan <head> untuk satu alamat. Alamat yang tidak dikenal mendapat noindex tanpa canonical.
 */
export function getRouteSeo(pathname) {
  const path = normalizePath(pathname)
  const route = routes[path]

  if (!route) {
    return { path, known: false, ...NOT_FOUND, canonical: null, robots: "noindex,follow", og: null, jsonLd: null }
  }

  const canonical = absoluteUrl(path)
  return {
    path,
    known: true,
    mode: route.mode,
    title: route.title,
    description: route.description,
    canonical,
    robots: route.noindex ? "noindex,follow" : "index,follow",
    og: {
      type: "website",
      locale: "id_ID",
      siteName: siteConfig.brandName,
      title: route.title,
      description: route.description,
      url: canonical,
      image: `${SITE_URL}${OG_IMAGE.path}`,
      imageWidth: OG_IMAGE.width,
      imageHeight: OG_IMAGE.height,
      imageAlt: OG_IMAGE.alt,
    },
    jsonLd: buildJsonLd(path, route),
  }
}

// ---------- berkas statis yang dibuat saat build ----------
export function buildSitemap() {
  const urls = Object.entries(routes)
    .filter(([, route]) => route.sitemap)
    .map(([path]) => `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n  </url>`)
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobots() {
  const blok = (bots, aturan) => `${bots.map((bot) => `User-agent: ${bot}`).join("\n")}\n${aturan}\n`
  return [
    "# Mesin pencari: semua halaman boleh dirayapi. Halaman noindex memakai meta robots, bukan Disallow,",
    "# supaya mesin pencari tetap bisa membaca tag noindex-nya.",
    blok(["*"], "Allow: /"),
    "# Bot pencarian dan jawaban AI: diizinkan agar Solaville bisa muncul di jawaban asisten AI",
    blok(BOT_PENCARIAN_AI, "Allow: /"),
    "# Bot pelatihan model AI: diblokir",
    blok(BOT_PELATIHAN_AI, "Disallow: /"),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n")
}

const halamanLlms = () =>
  Object.entries(routes)
    .filter(([, route]) => route.sitemap)
    .map(([path, route]) => `- [${route.nama}](${absoluteUrl(path)}): ${route.description}`)
    .join("\n")

const faktaLlms = () => {
  const unit = units[0]
  const baris = [
    `Nama: ${siteConfig.brandName} (di Google Maps tertulis "Sola Ville")`,
    `Produk: Rumah Mezzanine Premium tipe 36/72, ${unit.kamarTidur} kamar tidur, ${unit.kamarMandi} kamar mandi, carport`,
    `Ukuran: luas bangunan ${unit.luasBangunan} m2, luas tanah ${unit.luasTanah} m2`,
    "Alamat: Kp. Sampora, Jayasampurna, Kecamatan Serang Baru, Kabupaten Bekasi, Jawa Barat 17330",
    `Dibangun: ${company.tahunPembangunan}`,
    `Penawaran: DP ${company.promo.dp}, cukup booking ${siteConfig.bookingLabel}`,
    `Gratis: ${company.promo.gratis.join(", ")}`,
    `Fasilitas: ${company.promo.fasilitas.map((item) => item.nama).join(", ")}`,
    "Terdekat: pintu Tol Sukaragam (Japek 2), kawasan industri, pasar tradisional, sekolah, rumah sakit",
  ]
  if (contact.diverifikasi.telepon) baris.push(`Telepon: ${contact.telepon}`)
  if (contact.diverifikasi.email) baris.push(`Email: ${contact.email}`)
  return baris.map((item) => `- ${item}`).join("\n")
}

const ringkasLlms = `> ${deskripsiSingkat} Dibangun ${company.tahunPembangunan}, di Kp. Sampora, Jayasampurna, Kecamatan Serang Baru, Kabupaten Bekasi. Gambar di situs adalah ilustrasi desain.`

export function buildLlmsTxt() {
  const tanya = faq.map((item) => `- ${item.pertanyaan} ${item.jawaban}`).join("\n")
  return `# ${siteConfig.brandName}\n\n${ringkasLlms}\n\n## Halaman\n${halamanLlms()}\n\n## Fakta singkat\n${faktaLlms()}\n\n## Pertanyaan umum\n${tanya}\n`
}

export function buildLlmsFullTxt() {
  const unit = units[0]
  const tanya = faq.map((item) => `### ${item.pertanyaan}\n${item.jawaban}`).join("\n\n")
  const spesifikasi = unit.spesifikasi.map((item) => `- ${item}`).join("\n")
  return `# ${siteConfig.brandName}\n\n${ringkasLlms}\n\n## Halaman\n${halamanLlms()}\n\n## Fakta singkat\n${faktaLlms()}\n\n## Spesifikasi bangunan ${unit.nama}\n${spesifikasi}\n\n## Pertanyaan umum\n${tanya}\n`
}
