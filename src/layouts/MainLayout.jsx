import { useLayoutEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import FloatingWhatsapp from "../components/layout/FloatingWhatsapp"
import ScrollToTop from "../components/layout/ScrollToTop"
import useRouteSeo from "../hooks/useRouteSeo"

export default function MainLayout() {
  const { pathname } = useLocation()
  useRouteSeo()

  // Efek anak (Reveal menandai elemen yang sudah terlihat) berjalan sebelum efek ini dalam commit yang sama,
  // jadi konten di atas lipatan tidak sempat tersembunyi sebelum cat pertama
  useLayoutEffect(() => {
    document.documentElement.classList.add("reveal-ready")
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Fade singkat (0.25 detik) menandai pergantian halaman; tanpa ini konten berganti seketika.
          ScrollToTop sengaja jadi anak pertama agar scroll direset sebelum Reveal mengukur posisi. */}
      <main key={pathname} className="flex-1 animate-fade-in">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  )
}
