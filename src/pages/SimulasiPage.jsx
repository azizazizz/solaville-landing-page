import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getUnitById, units } from "../data/units"
import { calculateInstallment } from "../utils/loan"
import { loadSimulation, saveSimulation } from "../utils/simulationStore"
import SectionHeading from "../components/common/SectionHeading"
import SimulatorForm from "../components/simulasi/SimulatorForm"
import SimulatorResult from "../components/simulasi/SimulatorResult"
import StepIndicator from "../components/simulasi/StepIndicator"

function buildInitialValues(unitIdFromState) {
  const base = loadSimulation() || {
    unitId: units[0].id,
    harga: units[0].hargaMulai,
    tenorBulan: 120,
    ratePercent: 8,
  }
  const unit = getUnitById(unitIdFromState)
  // Datang dari tombol "Simulasikan" di halaman Unit: pakai tipe & harga itu, tenor/bunga tetap
  return unit ? { ...base, unitId: unit.id, harga: unit.hargaMulai } : base
}

export default function SimulasiPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [values, setValues] = useState(() => buildInitialValues(location.state?.unitId))

  useEffect(() => {
    saveSimulation(values)
  }, [values])

  const result = useMemo(
    () => calculateInstallment(values.harga, values.tenorBulan, values.ratePercent),
    [values.harga, values.tenorBulan, values.ratePercent],
  )

  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeading
        eyebrow="Simulasi Pembelian"
        title="Hitung Estimasi Cicilan"
        description="Simulasi cicilan dihitung dari harga penuh unit tanpa uang muka. Setelah sesuai, lanjutkan membuat Surat Pesanan Rumah (SPR)."
      />

      <div className="mt-6">
        <StepIndicator current={1} />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <SimulatorForm values={values} onChange={setValues} />
        <SimulatorResult
          result={result}
          tenorBulan={values.tenorBulan}
          onContinue={() => navigate("/spr")}
        />
      </div>
    </section>
  )
}
