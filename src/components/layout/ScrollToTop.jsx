import { useLayoutEffect } from "react"
import { useNavigationType } from "react-router-dom"

/**
 * Halaman baru selalu dibuka dari atas. Navigasi mundur/maju (POP) dan muat ulang dibiarkan,
 * agar browser tetap memulihkan posisi scroll sebelumnya.
 */
export default function ScrollToTop() {
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (navigationType !== "POP") window.scrollTo(0, 0)
  }, [navigationType])

  return null
}
