import { contact } from "../../data/contact"
import { buildWaLink } from "../../data/siteConfig"
import { IconDirections, IconEmail, IconLocation, IconPhone, IconWhatsapp } from "../common/icons"

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl text-fg mb-1">{contact.namaKantorPemasaran}</h3>
      </div>

      <div className="flex flex-col gap-3 text-fg-soft">
        <span className="flex items-start gap-3">
          <IconLocation className="w-5 h-5 mt-0.5 text-primary" />
          {contact.alamat}
        </span>
        <span className="flex items-center gap-3">
          <IconPhone className="w-5 h-5 text-primary" />
          {contact.telepon}
        </span>
        <span className="flex items-center gap-3">
          <IconEmail className="w-5 h-5 text-primary" />
          {contact.email}
        </span>
      </div>

      <div>
        <h4 className="text-fg font-medium mb-2">Jam Operasional</h4>
        <ul className="flex flex-col gap-1 text-fg-soft">
          {contact.jamOperasional.map((item) => (
            <li key={item.hari} className="flex gap-2">
              <span className="w-32">{item.hari}</span>
              <span>{item.jam}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-on-primary transition-colors hover:bg-primary-dark"
        >
          <IconDirections className="w-5 h-5" aria-hidden="true" />
          Petunjuk arah ke lokasi
        </a>
      </div>

      <a
        href={buildWaLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start flex items-center gap-2 rounded-xl bg-base-alt px-6 py-3 text-fg transition-colors hover:bg-whatsapp hover:text-night active:bg-whatsapp active:text-night"
      >
        <IconWhatsapp className="w-5 h-5" />
        Chat via WhatsApp
      </a>
    </div>
  )
}
