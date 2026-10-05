import ImagePlaceholder from "../common/ImagePlaceholder"

export default function GalleryGrid({ items, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(index)}
          className="group block overflow-hidden rounded-2xl text-left"
        >
          {/* Zoom 5% hanya pada isi thumbnail: menandai bahwa seluruh kotak bisa diklik untuk dibuka besar */}
          <ImagePlaceholder
            label={item.label}
            category={item.kategori}
            className="h-40 w-full transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
            loadDelay={250 + (index % 4) * 150}
          />
        </button>
      ))}
    </div>
  )
}
