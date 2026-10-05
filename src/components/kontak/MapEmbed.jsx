import { contact } from "../../data/contact"

export default function MapEmbed() {
  return (
    <div className="h-80 md:h-full min-h-80 overflow-hidden rounded-2xl bg-base-alt">
      <iframe
        title="Lokasi Solaville"
        src={contact.mapsEmbedUrl}
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
