import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatRupiah } from "../../utils/currency"
import ImageNote from "../common/ImageNote"
import Photo from "../common/Photo"
import Reveal from "../common/Reveal"
import { IconArea, IconBath, IconBed, IconClose } from "../common/icons"
import UnitCard from "./UnitCard"

export default function UnitList({ units, initialSelectedId }) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(initialSelectedId || null)

  const selectedUnit = units.find((unit) => unit.id === selectedId)

  useEffect(() => {
    if (!selectedUnit) return

    function handleKeyDown(event) {
      if (event.key === "Escape") setSelectedId(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedUnit])

  function handleSimulasikan(unit) {
    navigate("/simulasi", { state: { unitId: unit.id } })
  }

  function handlePesan(unit) {
    navigate("/spr", { state: { unitId: unit.id } })
  }

  return (
    <>
      <div className={`grid gap-6 ${units.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {units.map((unit, index) => (
          <Reveal key={unit.id} delay={(index % 2) * 80}>
            <UnitCard
              unit={unit}
              onPilih={(u) => setSelectedId(u.id)}
              horizontal={units.length === 1}
            />
          </Reveal>
        ))}
      </div>
      <ImageNote className="mt-3" />

      {selectedUnit ? (
        <div
          className="animate-fade-in fixed inset-0 z-50 bg-night/60 flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="unit-detail-heading"
            className="animate-pop-in bg-base max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5 md:px-8">
              <h3 id="unit-detail-heading" className="text-2xl text-fg">{selectedUnit.nama}</h3>
              <button
                type="button"
                aria-label="Tutup detail unit"
                onClick={() => setSelectedId(null)}
                className="flex items-center justify-center w-11 h-11 -mr-2 rounded-full text-fg transition-colors hover:bg-fg/5 hover:text-primary"
              >
                <IconClose />
              </button>
            </div>

            <div className="p-6 pt-4 md:p-8 md:pt-4 flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-3">
                {selectedUnit.gambar.map((gambar) => (
                  <Photo
                    key={gambar.id}
                    name={`unit/${gambar.id}`}
                    sizes="(min-width: 768px) 227px, 33vw"
                    alt={gambar.alt}
                    label={gambar.alt}
                    category="eksterior"
                    className="h-28 w-full rounded-xl"
                  />
                ))}
              </div>
              <ImageNote className="-mt-3" />

              <p className="text-primary font-medium text-lg">
                Mulai {formatRupiah(selectedUnit.hargaMulai)}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl bg-base-alt px-5 py-4 text-sm text-fg-soft">
                <span className="flex items-center gap-2">
                  <IconBed className="w-4 h-4" /> {selectedUnit.kamarTidur} Kamar Tidur
                </span>
                <span className="flex items-center gap-2">
                  <IconBath className="w-4 h-4" /> {selectedUnit.kamarMandi} Kamar Mandi
                </span>
                <span className="flex items-center gap-2">
                  <IconArea className="w-4 h-4" /> LT {selectedUnit.luasTanah} m² / LB{" "}
                  {selectedUnit.luasBangunan} m²
                </span>
                <span>{selectedUnit.carport} Carport</span>
                <span>{selectedUnit.lantai} Lantai</span>
              </div>

              <p className="text-fg-soft">{selectedUnit.deskripsi}</p>

              <div>
                <h4 className="text-fg font-medium mb-2">Spesifikasi Bangunan</h4>
                <ul className="flex flex-col gap-1 text-fg-soft">
                  {selectedUnit.spesifikasi.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span>-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handlePesan(selectedUnit)}
                  className="rounded-xl bg-primary px-6 py-3 text-on-primary transition-colors hover:bg-primary-dark"
                >
                  Pesan Unit Ini
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulasikan(selectedUnit)}
                  className="rounded-xl bg-fg/5 px-6 py-3 text-fg transition-colors hover:bg-fg/10"
                >
                  Simulasikan Cicilan Tipe Ini
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
