import { Link } from "react-router-dom"
import { siteConfig } from "../../data/siteConfig"
import { company } from "../../data/company"
import ImageNote from "../common/ImageNote"
import Photo from "../common/Photo"

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="flex flex-col gap-6 order-2 md:order-1">
        <span className="animate-rise-in [--rise:10px] text-sm uppercase tracking-wide text-primary font-medium">
          {company.lokasiSingkat}
        </span>
        <h1
          className="animate-rise-in text-4xl md:text-5xl leading-tight text-fg"
          style={{ animationDelay: "80ms" }}
        >
          {siteConfig.tagline}
        </h1>
        <p
          className="animate-rise-in text-fg-soft max-w-md"
          style={{ animationDelay: "160ms" }}
        >
          {company.namaPerumahan} menghadirkan hunian dengan struktur kokoh dan lingkungan
          yang tetap asri, dibangun bertahap sejak {company.tahunBerdiri} di{" "}
          {company.lokasiSingkat}.
        </p>
        <div
          className="animate-rise-in flex flex-wrap gap-3 pt-2"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            to="/unit"
            className="rounded-xl bg-primary px-6 py-3 text-on-primary transition-colors hover:bg-primary-dark"
          >
            Lihat Tipe Unit
          </Link>
          <Link
            to="/simulasi"
            className="rounded-xl bg-fg/5 px-6 py-3 text-fg transition-colors hover:bg-fg/10"
          >
            Simulasikan Cicilan
          </Link>
        </div>
      </div>

      <div className="order-1 md:order-2 animate-[fade-in_0.8s_ease-out_120ms_backwards]">
        <Photo
          name="hero/beranda"
          alt={`Pemandangan udara deretan rumah ${company.namaPerumahan} di antara area hijau`}
          label={`Foto Kawasan ${company.namaPerumahan}`}
          category="eksterior"
          priority
          className="h-72 md:h-112 w-full rounded-3xl"
        />
        <ImageNote className="mt-2" />
      </div>
    </section>
  )
}
