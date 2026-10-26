import { company } from "../../data/company"
import { contact } from "../../data/contact"
import { siteConfig } from "../../data/siteConfig"
import { units } from "../../data/units"
import SectionHeading from "../common/SectionHeading"

/**
 * Ringkasan fakta dalam daftar definisi. Sengaja tanpa harga. Penulisan "Solaville" dan "Sola Ville"
 * dijelaskan sekali di sini supaya mesin pencari dan asisten AI menganggapnya satu tempat yang sama.
 */
export default function FaktaSingkat({ judul = "Solaville dalam satu tampilan" }) {
  const unit = units[0]
  const fakta = [
    ["Nama", `${siteConfig.brandName} (di Google Maps: Sola Ville)`],
    ["Produk", `Rumah Mezzanine Premium ${unit.nama}`],
    ["Ukuran", `Bangunan ${unit.luasBangunan} m², tanah ${unit.luasTanah} m²`],
    ["Isi rumah", `${unit.kamarTidur} kamar tidur, ${unit.kamarMandi} kamar mandi, mezzanine, carport`],
    ["Lokasi", contact.alamat],
    ["Dibangun", String(company.tahunPembangunan)],
    ["Penawaran", `DP ${company.promo.dp}, cukup booking ${siteConfig.bookingLabel}`],
    [
      "Terdekat",
      "Pintu Tol Sukaragam (Japek 2), kawasan industri, pasar tradisional, sekolah, rumah sakit",
    ],
  ]

  return (
    <div>
      <SectionHeading eyebrow="Fakta singkat" title={judul} />
      <dl className="mt-8 flex flex-col gap-4 rounded-3xl bg-base-alt p-6 md:p-8">
        {fakta.map(([nama, isi]) => (
          <div key={nama}>
            <dt className="text-sm text-fg-soft">{nama}</dt>
            <dd className="mt-0.5 text-fg">{isi}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
