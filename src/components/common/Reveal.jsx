import { useEffect, useLayoutEffect, useRef } from "react"

/**
 * Konten di bawah layar muncul pelan (naik 16px + fade) saat pertama kali di-scroll ke dalam
 * tampilan, sekali saja. Tujuannya mengarahkan mata pembaca ke bagian yang baru masuk, bukan
 * menghias. Konten yang sudah terlihat saat halaman dibuka tidak dianimasikan lagi di sini.
 *
 * Status disimpan lewat atribut data-visible langsung di DOM (bukan state React) supaya tidak
 * memicu render ulang.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || el.dataset.visible) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.dataset.visible = "instant"
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || el.dataset.visible) return

    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "true"
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.visible = "true"
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
