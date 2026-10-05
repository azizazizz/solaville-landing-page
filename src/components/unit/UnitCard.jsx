import { formatRupiah } from "../../utils/currency"
import PlaceholderImage from "../common/PlaceholderImage"
import { IconArea, IconBath, IconBed } from "../common/icons"

export default function UnitCard({ unit, onPilih }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-base-alt">
      <PlaceholderImage label={unit.nama} category="eksterior" className="h-48 w-full" />

      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-xl text-fg">{unit.nama}</h3>
          <p className="text-primary font-medium mt-1">
            Mulai {formatRupiah(unit.hargaMulai)}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-fg-soft">
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
