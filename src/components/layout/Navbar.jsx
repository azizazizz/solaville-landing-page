import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { siteConfig } from "../../data/siteConfig"
import { IconClose, IconMenu } from "../common/icons"
import logoMark from "../../assets/logo/logo-mark.png"
import logoWordmark from "../../assets/logo/logo-wordmark.png"
import ThemeToggle from "./ThemeToggle"

const NAV_LINKS = [
  { to: "/", label: "Beranda" },
  { to: "/tentang", label: "Tentang" },
  { to: "/unit", label: "Unit" },
  { to: "/galeri", label: "Galeri" },
  // /spr adalah langkah lanjutan dari simulasi, jadi menu "Simulasi" tetap menandai posisi pengguna
  { to: "/simulasi", label: "Simulasi", alsoActiveOn: ["/spr", "/selesai"] },
  { to: "/kontak", label: "Kontak" },
]

// Garis bawah yang memanjang dari kiri: penanda halaman aktif yang tidak hanya bergantung pada
// warna, sekaligus umpan balik saat kursor diarahkan ke link.
function linkClass({ isActive }) {
  return `relative w-fit text-sm uppercase tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300 after:ease-out ${
    isActive
      ? "text-primary after:scale-x-100"
      : "text-fg hover:text-primary after:scale-x-0 hover:after:scale-x-100"
  }`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const linkStateClass = (link) => (state) =>
    linkClass({ isActive: state.isActive || Boolean(link.alsoActiveOn?.includes(pathname)) })

  return (
    <header className="bg-base">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo: monogram + tulisan. Nama aksesibel tautan berasal dari alt tulisan; monogram dekoratif. */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <img src={logoMark} alt="" width="191" height="128" className="h-10 w-auto" />
          <img
            src={logoWordmark}
            alt={siteConfig.brandName}
            width="560"
            height="105"
            className="h-4 w-auto"
          />
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkStateClass(link)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-fg"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="animate-[rise-in_0.2s_ease-out_backwards] [--rise:-6px] md:hidden mx-3 mb-3 rounded-2xl bg-base-alt px-5 py-5 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkStateClass(link)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
