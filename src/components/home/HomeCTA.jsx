import { Link } from "react-router-dom"
import { buildWaLink } from "../../data/siteConfig"
import { IconWhatsapp } from "../common/icons"
import Reveal from "../common/Reveal"

export default function HomeCTA() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-12">
      <Reveal className="rounded-3xl bg-night px-6 py-10 text-on-night md:px-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display">Unit terbatas. Siap booking?</h2>
          <p className="mt-2 text-on-night/70 max-w-md">
            Hitung dulu cicilannya, atau tanya langsung tim pemasaran lewat WhatsApp.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/simulasi"
            className="rounded-xl bg-gold px-6 py-3 text-night transition-colors hover:bg-gold-soft"
          >
            Simulasi Pembelian
          </Link>
          <a
            href={buildWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-on-night/10 px-6 py-3 text-on-night transition-colors hover:bg-on-night/20"
          >
            <IconWhatsapp className="w-5 h-5" />
            Hubungi via WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  )
}
