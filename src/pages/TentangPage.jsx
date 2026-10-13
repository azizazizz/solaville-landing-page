import { company } from "../data/company"
import SectionHeading from "../components/common/SectionHeading"
import logoFull from "../assets/logo/logo-full.png"
import Reveal from "../components/common/Reveal"
import HomeCTA from "../components/home/HomeCTA"

export default function TentangPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-5 py-16">
        <SectionHeading
          level={1}
          eyebrow="Tentang Kami"
          title={`Mengenal ${company.namaPerumahan}`}
          description={`Dikembangkan oleh ${company.namaDeveloper} sejak tahun ${company.tahunBerdiri}.`}
        />

        <div className="mt-10 grid md:grid-cols-2 gap-10 items-start">
          {/* Panel gelap tetap (sama dengan footer) agar logo terbaca di mode terang maupun gelap */}
          <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-night">
            <img
              src={logoFull}
              alt={`Logo ${company.namaPerumahan}`}
              width="720"
              height="421"
              className="h-48 w-auto"
            />
          </div>
          <p className="text-fg-soft leading-relaxed">{company.tentang}</p>
        </div>
      </section>

      <Reveal as="section" className="max-w-6xl mx-auto px-5 py-8">
        <div className="grid gap-10 rounded-3xl bg-base-alt p-8 md:grid-cols-2 md:p-12">
          <div>
            <h3 className="text-2xl text-fg mb-3">Visi</h3>
            <p className="text-fg-soft leading-relaxed">{company.visi}</p>
          </div>
          <div>
            <h3 className="text-2xl text-fg mb-3">Misi</h3>
            <ul className="flex flex-col gap-2 text-fg-soft">
              {company.misi.map((item) => (
                <li key={item} className="flex gap-2">
                  <span>-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="max-w-6xl mx-auto px-5 py-16">
        <h3 className="text-2xl text-fg mb-4">Status Legalitas</h3>
        <ul className="flex flex-col gap-2 text-fg-soft max-w-2xl">
          {company.legalitas.map((item) => (
            <li key={item} className="flex gap-2">
              <span>-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <HomeCTA />
    </>
  )
}
