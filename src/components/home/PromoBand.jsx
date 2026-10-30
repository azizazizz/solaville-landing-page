import { Link } from "react-router-dom"
import { company } from "../../data/company"
import { siteConfig } from "../../data/siteConfig"
import { IconCctv, IconCheck, IconGate, IconRoad, IconSecurity } from "../common/icons"
import Reveal from "../common/Reveal"

// Kunci ikon di data/company.js dipetakan di sini; berkas data tidak boleh mengimpor React
const IKON_FASILITAS = {
  security: IconSecurity,
  cctv: IconCctv,
  gerbang: IconGate,
  jalan: IconRoad,
}

/**
 * Penawaran dari brosur (booking, DP 0%, gratis, fasilitas) sebagai satu blok:
 * panel gelap untuk angka yang jadi alasan orang menghubungi, panel tonal untuk rinciannya.
 */
export default function PromoBand() {
  const { promo } = company

  return (
    <section className="max-w-6xl mx-auto px-5 py-6 md:py-10" aria-labelledby="promo-judul">
      <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col justify-between gap-10 rounded-3xl bg-night p-7 text-on-night md:p-10">
          <div>
            <p className="text-sm uppercase tracking-wide text-gold">Penawaran saat ini</p>
            <h2 id="promo-judul" className="mt-3 font-display">
              <span className="block text-lg text-on-night/80">Cukup booking</span>
              <span className="block text-[2.75rem] leading-none text-gold sm:text-6xl">
                {siteConfig.bookingLabel}
              </span>
            </h2>
            <p className="mt-4 text-on-night/80">Langsung pilih unit impian Anda.</p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <span
              className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full bg-gold font-display text-night"
              aria-label={`DP ${promo.dp}`}
            >
              <span className="text-sm leading-none">DP</span>
              <span className="text-3xl leading-none">{promo.dp}</span>
            </span>
            <Link
              to="/simulasi"
              className="rounded-xl bg-gold px-6 py-3 text-night transition-colors hover:bg-gold-soft"
            >
              Hitung Cicilan
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-8 rounded-3xl bg-base-alt p-7 md:p-10">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-medium text-fg">Gratis</h3>
              <ul className="flex flex-col gap-2.5 text-fg-soft">
                {promo.gratis.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-medium text-fg">Fasilitas</h3>
              <ul className="flex flex-col gap-2.5 text-fg-soft">
                {promo.fasilitas.map((item) => {
                  const Ikon = IKON_FASILITAS[item.ikon] ?? IconCheck
                  return (
                    <li key={item.nama} className="flex items-start gap-3">
                      <Ikon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <span>{item.nama}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <p className="text-xs text-fg-soft">
            Syarat dan ketentuan berlaku.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
