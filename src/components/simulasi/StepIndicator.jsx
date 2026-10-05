import { Link } from "react-router-dom"

const STEPS = [
  { id: 1, label: "Simulasi", to: "/simulasi" },
  { id: 2, label: "Data Pemesanan", to: "/spr" },
]

// Penanda posisi dalam alur pemesanan. Langkah lain bisa diklik, jadi pengunjung tidak terkunci urutan.
export default function StepIndicator({ current }) {
  return (
    <ol aria-label="Langkah pemesanan" className="flex flex-wrap items-center gap-x-6">
      {STEPS.map((step) => {
        const isCurrent = step.id === current
        const content = (
          <>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                isCurrent ? "bg-primary text-on-primary" : "bg-base-alt text-fg-soft"
              }`}
            >
              {step.id}
            </span>
            <span className={isCurrent ? "font-medium text-fg" : "text-fg-soft"}>{step.label}</span>
          </>
        )

        return (
          <li key={step.id} aria-current={isCurrent ? "step" : undefined}>
            {isCurrent ? (
              <span className="flex min-h-11 items-center gap-2 text-sm">{content}</span>
            ) : (
              <Link
                to={step.to}
                className="flex min-h-11 items-center gap-2 text-sm transition-colors hover:text-primary"
              >
                {content}
              </Link>
            )}
          </li>
        )
      })}
    </ol>
  )
}
