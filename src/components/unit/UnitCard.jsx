import { formatRupiah } from "../../utils/currency"
import PlaceholderImage from "../common/PlaceholderImage"
import { IconArea, IconBath, IconBed } from "../common/icons"

// horizontal: dipakai saat hanya ada satu tipe, supaya kartu tunggal tidak terlihat "kesepian"
// di grid dua kolom (foto di kiri, rincian di kanan pada layar lebar).
export default function UnitCard({ unit, onPilih, horizontal = false }) {
  return (
    <div
      className={`flex h-full overflow-hidden rounded-2xl bg-base-alt ${
        horizontal ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <PlaceholderImage
        label={unit.nama}
        category="eksterior"
        className={`h-48 w-full ${horizontal ? "md:h-auto md:min-h-72 md:w-1/2" : ""}`}
      />

      <div className={`flex flex-col gap-3 p-5 ${horizontal ? "justify-center md:w-1/2 md:p-10" : ""}`}>
        <div>
          <h3 className={`text-fg ${horizontal ? "text-2xl md:text-3xl" : "text-xl"}`}>{unit.nama}</h3>
          <p className="text-primary font-medium mt-1">
            Mulai {formatRupiah(unit.hargaMulai)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-soft">
          <span className="flex items-center gap-1">
            <IconBed className="w-4 h-4" /> {unit.kamarTidur}
          </span>
          <span className="flex items-center gap-1">
            <IconBath className="w-4 h-4" /> {unit.kamarMandi}
          </span>
          <span className="flex items-center gap-1">
            <IconArea className="w-4 h-4" /> LT {unit.luasTanah}/LB {unit.luasBangunan} m²
          </span>
        </div>

        {/* Padding + margin negatif memperluas area ketuk (44px) tanpa menggeser tata letak */}
        <button
          type="button"
          onClick={() => onPilih(unit)}
          className="-my-3 self-start py-3 text-left text-sm uppercase tracking-wide text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  )
}
