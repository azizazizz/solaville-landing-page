import { useLocation } from "react-router-dom"
import { units } from "../data/units"
import SectionHeading from "../components/common/SectionHeading"
import UnitList from "../components/unit/UnitList"
import HomeCTA from "../components/home/HomeCTA"

export default function UnitPage() {
  const location = useLocation()
  const initialSelectedId = location.state?.unitId

  return (
    <>
      <section className="max-w-6xl mx-auto px-5 py-16">
        <SectionHeading
          level={1}
          eyebrow="Tipe Unit"
          title="Rumah Mezzanine Tipe 36/72 di Solaville"
          description="Buka detail unit untuk melihat spesifikasi, denah, dan foto."
        />

        <div className="mt-10">
          <UnitList key={location.key} units={units} initialSelectedId={initialSelectedId} />
        </div>
      </section>

      <HomeCTA />
    </>
  )
}
