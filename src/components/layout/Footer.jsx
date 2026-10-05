import { useMemo } from "react"
import { Link } from "react-router-dom"
import { siteConfig } from "../../data/siteConfig"
import { contact } from "../../data/contact"

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="bg-night text-on-night">
      <div className="max-w-6xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">{siteConfig.brandName}</p>
          <p className="mt-3 text-sm text-on-night/70 max-w-xs">{siteConfig.tagline}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-on-night/80">
          <p className="uppercase tracking-wide text-on-night/50 text-xs mb-1">Navigasi</p>
          <Link to="/tentang" className="hover:text-on-night">Tentang Kami</Link>
          <Link to="/unit" className="hover:text-on-night">Tipe Unit</Link>
          <Link to="/galeri" className="hover:text-on-night">Galeri</Link>
          <Link to="/simulasi" className="hover:text-on-night">Simulasi Pembelian</Link>
          <Link to="/kontak" className="hover:text-on-night">Kontak</Link>
        </div>

        <div className="flex flex-col gap-2 text-sm text-on-night/80">
          <p className="uppercase tracking-wide text-on-night/50 text-xs mb-1">Informasi</p>
          <p>{contact.alamat}</p>
          <p>{contact.telepon}</p>
          <p>{contact.email}</p>
          <Link to="/syarat-dan-ketentuan" className="hover:text-on-night mt-2">
            Syarat dan Ketentuan
          </Link>
          <Link to="/kebijakan-privasi" className="hover:text-on-night">
            Kebijakan Privasi
          </Link>
        </div>
      </div>

      {/* Dipisahkan dengan jalur yang lebih gelap, bukan garis */}
      <div className="bg-black/20">
        <p className="max-w-6xl mx-auto px-5 py-4 text-xs text-center text-on-night/60">
          {year} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
