import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-24 text-center flex flex-col items-center gap-4">
      <span className="text-sm uppercase tracking-wide text-primary">404</span>
      <h1 className="text-3xl text-fg">Halaman Tidak Ditemukan</h1>
      <p className="text-fg-soft">
        Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        to="/"
        className="mt-4 rounded-xl bg-primary px-6 py-3 text-on-primary transition-colors hover:bg-primary-dark"
      >
        Kembali ke Beranda
      </Link>
    </section>
  )
}
