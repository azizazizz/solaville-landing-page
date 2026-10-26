import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { gallery, galleryCategories } from "../data/gallery"
import SectionHeading from "../components/common/SectionHeading"
import PlaceholderImage from "../components/common/PlaceholderImage"
import GalleryGrid from "../components/galeri/GalleryGrid"
import { getImage } from "../utils/images"
import HomeCTA from "../components/home/HomeCTA"

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState("semua")
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const items =
    activeCategory === "semua"
      ? gallery
      : gallery.filter((item) => item.kategori === activeCategory)

  const slides = items.map((item) => ({
    src: getImage(`galeri/${item.id}`)?.largest ?? "",
    alt: item.alt,
    label: item.label,
    kategori: item.kategori,
  }))

  return (
    <>
      <section className="max-w-6xl mx-auto px-5 py-16">
        <SectionHeading
          level={1}
          eyebrow="Galeri"
          title="Galeri Visualisasi Solaville"
          description="Gambar berikut adalah visualisasi ilustratif dan akan diganti dengan dokumentasi asli dari lokasi. Kondisi sebenarnya dapat berbeda."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
              className={`h-11 rounded-full px-5 text-sm uppercase tracking-wide transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-on-primary"
                  : "bg-base-alt text-fg-soft hover:bg-fg/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {items.length > 0 ? (
            <GalleryGrid items={items} onSelect={setLightboxIndex} />
          ) : (
            <p className="text-fg-soft">Belum ada foto di kategori ini.</p>
          )}
        </div>

        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={slides}
          render={{
            // Slide tanpa berkas gambar tampil sebagai placeholder; yang punya gambar memakai tampilan bawaan
            slide: ({ slide }) =>
              slide.src ? undefined : (
                <PlaceholderImage
                  label={slide.label}
                  category={slide.kategori}
                  className="w-[80vw] max-w-2xl h-[60vh] rounded-3xl"
                />
              ),
          }}
        />
      </section>

      <HomeCTA />
    </>
  )
}
