import { Link } from "react-router-dom"
import { faq } from "../../data/faq"
import { IconChevronDown } from "../common/icons"
import SectionHeading from "../common/SectionHeading"

/**
 * Tanya jawab dari fakta brosur. Memakai <details> bawaan browser: bisa dibuka dengan keyboard,
 * tidak butuh JavaScript, dan seluruh jawaban tetap ada di HTML untuk mesin pencari dan asisten AI.
 */
export default function FaqSection() {
  return (
    <div id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Pertanyaan yang sering diajukan"
        description="Jawaban singkat tentang DP, booking, biaya, lokasi, dan spesifikasi rumah."
      />

      <div className="mt-8 flex flex-col gap-3">
        {faq.map((item) => (
          <details key={item.id} className="group rounded-2xl bg-base-alt">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
              <span>{item.pertanyaan}</span>
              <IconChevronDown
                className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 pb-5 text-fg-soft">
              <p>{item.jawaban}</p>
              {item.tautan ? (
                <Link
                  to={item.tautan.ke}
                  className="mt-3 -mb-3 inline-block py-3 text-sm uppercase tracking-wide text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  {item.tautan.teks}
                </Link>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
