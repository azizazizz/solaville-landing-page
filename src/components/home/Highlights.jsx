import { company } from "../../data/company"
import SectionHeading from "../common/SectionHeading"
import PlaceholderImage from "../common/PlaceholderImage"
import Reveal from "../common/Reveal"

export default function Highlights() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Mengapa Solaville"
          title="Pertimbangan yang lebih dari sekadar desain rumah"
          description="Berikut beberapa hal yang membedakan Solaville dengan kawasan hunian lain di sekitarnya."
        />
      </Reveal>

      {/* Baris dipisahkan oleh jarak, bukan garis pemisah */}
      <div className="mt-12 flex flex-col gap-14 md:gap-16">
        {company.keunggulan.map((item, index) => {
          const reversed = index % 2 === 1
          return (
            <Reveal
              key={item.judul}
              className={`grid md:grid-cols-2 gap-6 md:gap-12 items-center ${
                reversed ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <PlaceholderImage
                label={item.judul}
                category={index % 2 === 0 ? "lingkungan" : "fasilitas"}
                className="h-56 w-full rounded-2xl"
              />
              <div>
                <h3 className="text-2xl text-fg">{item.judul}</h3>
                <p className="mt-2 text-fg-soft">{item.deskripsi}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
