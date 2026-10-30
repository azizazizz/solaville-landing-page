import { Link } from "react-router-dom"
import { siteConfig } from "../../data/siteConfig"
import { company } from "../../data/company"
import { units } from "../../data/units"
import ImageNote from "../common/ImageNote"
import Photo from "../common/Photo"

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="flex flex-col gap-6 order-2 md:order-1">
        <span className="animate-rise-in [--rise:10px] text-sm uppercase tracking-wide text-primary font-medium">
          {siteConfig.tagline}
        </span>
        <h1
          className="animate-rise-in text-4xl md:text-5xl leading-tight text-fg"
          style={{ animationDelay: "80ms" }}
        >
          Rumah Mezzanine Premium di Serang Baru, Bekasi
        </h1>
        <p
          className="animate-rise-in text-fg-soft max-w-md"
          style={{ animationDelay: "160ms" }}
        >
          Eksklusif, modern, dan terjangkau.
        </p>
        <div
          className="animate-rise-in flex flex-wrap gap-3 pt-2"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            to="/unit"
            className="rounded-xl bg-primary px-6 py-3 text-on-primary transition-colors hover:bg-primary-dark"
          >
            Lihat {units[0].nama}
          </Link>
          <Link
            to="/simulasi"
            className="rounded-xl bg-fg/5 px-6 py-3 text-fg transition-colors hover:bg-fg/10"
          >
            Hitung Cicilan
          </Link>
        </div>
        <p
          className="animate-rise-in text-sm text-fg-soft"
          style={{ animationDelay: "320ms" }}
        >
          Dibangun {company.tahunPembangunan}.
        </p>
      </div>

      <div className="order-1 md:order-2 animate-[fade-in_0.8s_ease-out_120ms_backwards]">
        <Photo
          name="hero/beranda"
          alt={`Pemandangan udara klaster ${company.namaPerumahan} di antara area hijau`}
          label={`Foto Kawasan ${company.namaPerumahan}`}
          category="eksterior"
          priority
          sizes="(min-width: 768px) 560px, calc(100vw - 40px)"
          className="h-72 md:h-112 w-full rounded-3xl"
        />
        <ImageNote className="mt-2" />
      </div>
    </section>
  )
}
