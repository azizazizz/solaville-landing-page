import { buildWaLink } from "../../data/siteConfig"
import { IconWhatsapp } from "../common/icons"

export default function FloatingWhatsapp() {
  return (
    <div className="group fixed bottom-5 right-5 z-40">
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-xl bg-night px-3 py-2 text-sm text-on-night opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
        Hubungi Kami
      </span>

      <a
        href={buildWaLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi kami melalui WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-night hover:bg-whatsapp-dark hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <IconWhatsapp className="w-7 h-7" />
      </a>
    </div>
  )
}
