// Prerender saat build: mengubah dist/index.html (kerangka SPA) menjadi satu berkas HTML per rute,
// lengkap dengan isi halaman, <head> SEO, dan data terstruktur. Berjalan setelah:
//   vite build                                          -> dist/ (klien)
//   vite build --ssr src/entry-server.jsx --outDir dist-ssr  -> dist-ssr/entry-server.js
// Sumber data SEO: src/data/seo.js (juga dipakai klien lewat src/hooks/useRouteSeo.js).
// Build GAGAL bila ada yang janggal (judul kepanjangan, H1 ganda, JSON-LD rusak, aset hilang, data contoh bocor).
import { createHash } from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = path.resolve(import.meta.dirname, "..")
const dist = path.join(root, "dist")
const distSsr = path.join(root, "dist-ssr")
const impor = (berkas) => import(pathToFileURL(path.join(root, berkas)).href)

const seo = await impor("src/data/seo.js")
const { render } = await impor("dist-ssr/entry-server.js")
const { contact } = await impor("src/data/contact.js")
const { siteConfig } = await impor("src/data/siteConfig.js")

const masalah = []
const gagalBila = (kondisi, pesan) => {
  if (kondisi) masalah.push(pesan)
}

// ---------- templat ----------
const templat = fs.readFileSync(path.join(dist, "index.html"), "utf8")
if (templat.includes("data-prerendered")) {
  console.error("dist/index.html sudah diprerender. Jalankan `vite build` dulu agar templat bersih.")
  process.exit(1)
}
const ROOT_KOSONG = '<div id="root"><!--app-html--></div>'
if (!templat.includes("<!--app-head-->") || !templat.includes(ROOT_KOSONG)) {
  console.error("Penanda <!--app-head--> atau <!--app-html--> hilang dari dist/index.html (dihapus Vite?).")
  process.exit(1)
}
// Catatan penjelasan untuk pengembang tidak perlu ikut ke HTML produksi
const dasar = templat.replace(/<!--\s*Judul, deskripsi, canonical[\s\S]*?-->\s*/, "")

// ---------- pembuat <head> ----------
const esc = (nilai) =>
  String(nilai).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
const meta = (atribut, kunci, isi) => `<meta ${atribut}="${kunci}" content="${esc(isi)}" />`

function buatHead(info) {
  const baris = [`<title>${esc(info.title)}</title>`, meta("name", "description", info.description), meta("name", "robots", info.robots)]
  if (info.canonical) baris.push(`<link rel="canonical" href="${esc(info.canonical)}" />`)
  const og = info.og
  if (og) {
    baris.push(
      meta("property", "og:type", og.type),
      meta("property", "og:locale", og.locale),
      meta("property", "og:site_name", og.siteName),
      meta("property", "og:title", og.title),
      meta("property", "og:description", og.description),
      meta("property", "og:url", og.url),
      meta("property", "og:image", og.image),
      meta("property", "og:image:width", og.imageWidth),
      meta("property", "og:image:height", og.imageHeight),
      meta("property", "og:image:alt", og.imageAlt),
      meta("name", "twitter:card", "summary_large_image"),
      meta("name", "twitter:title", og.title),
      meta("name", "twitter:description", og.description),
      meta("name", "twitter:image", og.image),
    )
  }
  if (info.jsonLd) {
    // "<" di-escape agar teks apa pun di dalam JSON tidak bisa menutup tag <script>
    const json = JSON.stringify(info.jsonLd).replace(/</g, "\\u003c")
    baris.push(`<script type="application/ld+json" id="ld-json">${json}</script>`)
  }
  return baris.join("\n    ")
}

// React menaruh petunjuk preload gambar (hero, logo) di awal keluaran render. Dipindah ke <head>
// agar DOM di dalam #root hanya berisi isi halaman, dan browser menemukan gambar LCP lebih awal.
function pisahPreload(isi) {
  const petunjuk = []
  const badan = isi.replace(/^(?:<link rel="preload"[^>]*\/>)+/, (cocok) => {
    petunjuk.push(...cocok.match(/<link rel="preload"[^>]*\/>/g))
    return ""
  })
  return { petunjuk, badan }
}

// ---------- rute yang terdaftar harus sama dengan rute di AppRoutes ----------
const rutePeta = [...fs.readFileSync(path.join(root, "src/AppRoutes.jsx"), "utf8").matchAll(/path="([^"]+)"/g)]
  .map((cocok) => cocok[1])
  .filter((rute) => rute !== "*")
for (const rute of rutePeta) gagalBila(!seo.routes[rute], `Rute ${rute} ada di AppRoutes.jsx tetapi belum ada di src/data/seo.js`)
for (const rute of Object.keys(seo.routes)) gagalBila(!rutePeta.includes(rute), `Rute ${rute} ada di seo.js tetapi tidak ada di AppRoutes.jsx`)

// ---------- tulis HTML ----------
const hasil = [] // { berkas, path, info, html }
function tulis(berkas, html, path_, info) {
  fs.writeFileSync(path.join(dist, berkas), html)
  hasil.push({ berkas, path: path_, info, html })
}

for (const [rute, konfigurasi] of Object.entries(seo.routes)) {
  const info = seo.getRouteSeo(rute)
  const { petunjuk, badan } = konfigurasi.mode === "full" ? pisahPreload(render(rute)) : { petunjuk: [], badan: "" }
  const penanda = konfigurasi.mode === "full" ? ` data-prerendered="${rute}"` : ""
  const html = dasar
    .replace("<!--app-head-->", [buatHead(info), ...petunjuk].join("\n    "))
    .replace(ROOT_KOSONG, `<div id="root"${penanda}>${badan}</div>`)
  tulis(rute === "/" ? "index.html" : `${rute.slice(1)}.html`, html, rute, { ...info, mode: konfigurasi.mode })
}

// 404.html: dipakai Vercel bila catch-all rewrite suatu saat dihapus. Tidak di-hydrate (tanpa data-prerendered).
{
  const info = seo.getRouteSeo("/__tidak-ada")
  const { petunjuk, badan } = pisahPreload(render("/__tidak-ada"))
  const html = dasar
    .replace("<!--app-head-->", [buatHead(info), ...petunjuk].join("\n    "))
    .replace(ROOT_KOSONG, `<div id="root">${badan}</div>`)
  tulis("404.html", html, "/__tidak-ada", { ...info, mode: "full", notfound: true })
}

// ---------- berkas statis dari data yang sama ----------
const tulisStatis = (nama, isi) => fs.writeFileSync(path.join(dist, nama), isi)
tulisStatis("sitemap.xml", seo.buildSitemap())
tulisStatis("robots.txt", seo.buildRobots())
tulisStatis("llms.txt", seo.buildLlmsTxt())
tulisStatis("llms-full.txt", seo.buildLlmsFullTxt())

// ---------- validasi ----------
// Berkas gambar kembar menghasilkan nama aset yang bergantung urutan build (bentrok di Vercel). Satu gambar, satu berkas.
{
  const sidik = new Map()
  const telusuri = (dir) => {
    for (const entri of fs.readdirSync(dir, { withFileTypes: true })) {
      const jalur = path.join(dir, entri.name)
      if (entri.isDirectory()) telusuri(jalur)
      else if (/\.(jpe?g|png|webp|avif)$/i.test(entri.name)) {
        const kunci = createHash("sha1").update(fs.readFileSync(jalur)).digest("hex")
        sidik.set(kunci, [...(sidik.get(kunci) ?? []), path.relative(root, jalur).replaceAll("\\", "/")])
      }
    }
  }
  telusuri(path.join(root, "src/assets"))
  for (const berkas of sidik.values())
    gagalBila(berkas.length > 1, `Gambar kembar (isi sama): ${berkas.join(", ")}. Simpan satu saja dan pakai CADANGAN di src/utils/images.js`)
}
const dataContoh = [siteConfig.waNumber, contact.telepon, contact.email]
const asetAda = new Set(fs.readdirSync(path.join(dist, "assets")))

for (const { berkas, path: rute, info, html } of hasil) {
  const label = `${berkas} (${rute})`
  gagalBila(info.title.length > 60, `${label}: judul ${info.title.length} karakter (maksimal 60)`)
  gagalBila(info.description.length > 155, `${label}: deskripsi ${info.description.length} karakter (maksimal 155)`)
  gagalBila(html.includes("%VITE_"), `${label}: sisa penanda %VITE_`)
  gagalBila(html.includes("<!--app-"), `${label}: penanda <!--app-...--> belum terisi`)
  gagalBila((html.match(/<title>/g) ?? []).length !== 1, `${label}: harus tepat satu <title>`)

  if (info.mode === "full" && !info.notfound) {
    gagalBila((html.match(/<h1[\s>]/g) ?? []).length !== 1, `${label}: harus tepat satu <h1>`)
    gagalBila(!html.includes(`data-prerendered="${rute}"`), `${label}: penanda data-prerendered hilang`)
    gagalBila(/<div id="root"[^>]*><link rel="preload"/.test(html), `${label}: petunjuk preload masih ada di dalam #root`)
  }
  if (info.known) {
    const canonicalSeharusnya = seo.absoluteUrl(rute)
    gagalBila(info.canonical !== canonicalSeharusnya, `${label}: canonical ${info.canonical} != ${canonicalSeharusnya}`)
  }

  // JSON-LD harus JSON valid dan bebas data contoh
  for (const cocok of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const teks = JSON.parse(cocok[1].replace(/\\u003c/g, "<"))
      const mentah = JSON.stringify(teks)
      for (const contoh of dataContoh) gagalBila(mentah.includes(contoh), `${label}: data contoh "${contoh}" bocor ke JSON-LD`)
    } catch {
      masalah.push(`${label}: JSON-LD bukan JSON valid`)
    }
  }

  // Setiap aset yang dirujuk HTML harus benar-benar ada (menangkap URL gambar SSR yang tak sama dengan build klien)
  for (const cocok of html.matchAll(/\/assets\/([^"'\s,)<>]+)/g)) {
    gagalBila(!asetAda.has(cocok[1]), `${label}: aset /assets/${cocok[1]} tidak ada di dist/assets`)
  }
}

for (const nama of ["llms.txt", "llms-full.txt", "robots.txt", "sitemap.xml"]) {
  const isi = fs.readFileSync(path.join(dist, nama), "utf8")
  for (const contoh of dataContoh) gagalBila(isi.includes(contoh), `${nama}: data contoh "${contoh}" bocor`)
  gagalBila(isi.includes("—"), `${nama}: mengandung tanda pisah panjang`)
}
gagalBila((fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8").match(/<loc>/g) ?? []).length !== Object.values(seo.routes).filter((r) => r.sitemap).length, "sitemap.xml: jumlah URL tidak sesuai seo.js")

if (masalah.length > 0) {
  console.error(`\nPrerender GAGAL (${masalah.length} masalah):`)
  for (const pesan of masalah) console.error(`  - ${pesan}`)
  process.exit(1)
}

fs.rmSync(distSsr, { recursive: true, force: true })
console.log(`Prerender selesai: ${hasil.length} HTML (${hasil.filter((h) => h.info.mode === "full").length} penuh), sitemap, robots, llms.`)
for (const { berkas, info } of hasil) console.log(`  ${berkas.padEnd(30)} ${info.mode}${info.robots?.startsWith("noindex") ? " (noindex)" : ""}`)
