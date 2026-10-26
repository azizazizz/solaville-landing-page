import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"
import { buildWaLink, siteConfig } from "../../data/siteConfig"
import { getImage } from "../../utils/images"
import ImageNote from "../common/ImageNote"
import Photo from "../common/Photo"
import Reveal from "../common/Reveal"
import { IconArea, IconBath, IconBed, IconClose } from "../common/icons"
import UnitCard from "./UnitCard"

export default function UnitList({ units, initialSelectedId }) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(initialSelectedId || null)
  const [denahOpen, setDenahOpen] = useState(false)

  const selectedUnit = units.find((unit) => unit.id === selectedId)
  const denah = selectedUnit?.denah
  const denahImage = denah ? getImage(`unit/${denah.id}`) : undefined

  useEffect(() => {
    if (!selectedUnit) return

    function handleKeyDown(event) {
      // Escape saat denah diperbesar hanya menutup denah, bukan seluruh detail unit
      if (event.key === "Escape" && !denahOpen) setSelectedId(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedUnit, denahOpen])

  function handleSimulasikan(unit) {
    navigate("/simulasi", { state: { unitId: unit.id } })
  }

  function handlePesan(unit) {
    navigate("/simulasi", { state: { unitId: unit.id } })
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

              <div>
                <p className="text-primary font-medium text-lg">
                  DP 0%, cukup booking {siteConfig.bookingLabel}
                </p>
                <p className="mt-1 text-sm text-fg-soft">
                  <a
                    href={buildWaLink(`Halo Solaville, saya ingin menanyakan harga ${selectedUnit.nama}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-3 inline-block py-3 text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                  >
                    Tanya harga lewat WhatsApp
                  </a>
                  , atau gunakan simulasi cicilan di bawah.
                </p>
              </div>

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
                <span>{selectedUnit.lantai}</span>
              </div>

              <p className="text-fg-soft">{selectedUnit.deskripsi}</p>

              {/* Denah di kiri dan spesifikasi di kanan pada layar lebar; menumpuk di ponsel */}
              <div
                className={`grid gap-6 md:items-start ${
                  denah && denahImage ? "md:grid-cols-[minmax(0,20rem)_1fr]" : ""
                }`}
              >
                {denah && denahImage ? (
                  <div>
                    <h4 className="text-fg font-medium mb-3">Denah Rumah</h4>
                    <button
                      type="button"
                      onClick={() => setDenahOpen(true)}
                      aria-label="Perbesar denah rumah"
                      className="block w-full max-w-xs md:max-w-none overflow-hidden rounded-xl bg-base-alt transition-opacity hover:opacity-90"
                      style={{ aspectRatio: denah.rasio }}
                    >
                      <Photo
                        name={`unit/${denah.id}`}
                        alt={denah.alt}
                        sizes="(min-width: 768px) 320px, 80vw"
                        className="h-full w-full object-contain"
                      />
                    </button>
                    <ImageNote className="mt-2">
                      Ketuk denah untuk memperbesar. Denah adalah ilustrasi desain, detail aktual dapat
                      menyesuaikan kondisi bangunan asli.
                    </ImageNote>
                  </div>
                ) : null}

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

      {/* Di luar overlay detail unit agar klik di dalam pembesaran denah tidak ikut menutup detail unit */}
      {denah && denahImage ? (
        <Lightbox
          open={denahOpen}
          close={() => setDenahOpen(false)}
          slides={[{ src: denahImage.largest, alt: denah.alt }]}
          plugins={[Zoom]}
          carousel={{ finite: true }}
          // Tanpa tutup lewat latar: ketukan yang sama bisa "tembus" ke lapisan detail unit di bawahnya dan menutupnya juga
          render={{ buttonPrev: () => null, buttonNext: () => null }}
        />
      ) : null}
    </>
  )
}
