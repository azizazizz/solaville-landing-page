import { useEffect, useState } from "react"
import PlaceholderImage from "./PlaceholderImage"

/**
 * Bungkus PlaceholderImage dengan skeleton loading sederhana,
 * meniru perilaku blur-up saat foto asli nanti dimuat dari server.
 * Pergantian dari skeleton ke konten dibuat fade supaya tidak terasa "berkedip".
 */
export default function ImagePlaceholder({
  label,
  category = "default",
  className = "",
  loadDelay = 400,
}) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), loadDelay)
    return () => clearTimeout(timer)
  }, [loadDelay])

  if (!loaded) {
    return <div className={`animate-pulse bg-fg/10 ${className}`} />
  }

  return (
    <PlaceholderImage label={label} category={category} className={`animate-fade-in ${className}`} />
  )
}
