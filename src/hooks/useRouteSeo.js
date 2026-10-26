import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getRouteSeo } from "../data/seo"

function cari(selector, buat) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = buat()
    document.head.appendChild(el)
  }
  return el
}

// Ubah tag yang sudah ada (hasil prerender) alih-alih menambah tag baru, supaya tidak ada duplikat
function setMeta(atribut, kunci, isi) {
  const selector = `meta[${atribut}="${kunci}"]`
  if (isi == null) {
    document.head.querySelector(selector)?.remove()
    return
  }
  const el = cari(selector, () => {
    const meta = document.createElement("meta")
    meta.setAttribute(atribut, kunci)
    return meta
  })
  el.setAttribute("content", String(isi))
}

function setCanonical(url) {
  if (!url) {
    document.head.querySelector('link[rel="canonical"]')?.remove()
    return
  }
  const el = cari('link[rel="canonical"]', () => {
    const link = document.createElement("link")
    link.rel = "canonical"
    return link
  })
  el.href = url
}

function setJsonLd(data) {
  if (!data) {
    document.getElementById("ld-json")?.remove()
    return
  }
  const el = cari("script#ld-json", () => {
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.id = "ld-json"
    return script
  })
  el.textContent = JSON.stringify(data)
}

/**
 * Menyamakan <head> dengan halaman yang sedang dibuka saat berpindah halaman di browser.
 * HTML prerender sudah memuat nilai yang sama untuk kunjungan pertama, jadi efek pertama tidak mengubah apa pun.
 */
export default function useRouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getRouteSeo(pathname)
    const og = seo.og

    document.title = seo.title
    setMeta("name", "description", seo.description)
    setMeta("name", "robots", seo.robots)
    setCanonical(seo.canonical)

    setMeta("property", "og:type", og?.type)
    setMeta("property", "og:locale", og?.locale)
    setMeta("property", "og:site_name", og?.siteName)
    setMeta("property", "og:title", og?.title)
    setMeta("property", "og:description", og?.description)
    setMeta("property", "og:url", og?.url)
    setMeta("property", "og:image", og?.image)
    setMeta("property", "og:image:width", og?.imageWidth)
    setMeta("property", "og:image:height", og?.imageHeight)
    setMeta("property", "og:image:alt", og?.imageAlt)
    setMeta("name", "twitter:card", og ? "summary_large_image" : null)
    setMeta("name", "twitter:title", og?.title)
    setMeta("name", "twitter:description", og?.description)
    setMeta("name", "twitter:image", og?.image)

    setJsonLd(seo.jsonLd)
  }, [pathname])
}
