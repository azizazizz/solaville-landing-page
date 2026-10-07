import { useNavigate } from "react-router-dom"
import { getFeaturedUnits } from "../../data/units"
import SectionHeading from "../common/SectionHeading"
import Reveal from "../common/Reveal"
import UnitCard from "../unit/UnitCard"

export default function FeaturedUnits() {
  const navigate = useNavigate()
  const units = getFeaturedUnits()

  function handlePilih(unit) {
    navigate("/unit", { state: { unitId: unit.id } })
  }

  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Tipe Unit"
          title="Pilihan tipe rumah yang paling banyak diminati"
          description="Harga berikut adalah harga mulai, dapat berubah sesuai lokasi kavling dan masa pembangunan."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {units.map((unit, index) => (
          <Reveal key={unit.id} delay={(index % 2) * 80}>
            <UnitCard unit={unit} onPilih={handlePilih} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
