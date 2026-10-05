export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="text-sm uppercase tracking-wide text-primary font-medium">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl md:text-4xl text-fg font-medium">{title}</h2>
      {description ? (
        <p className="text-fg-soft max-w-2xl">{description}</p>
      ) : null}
    </div>
  )
}
