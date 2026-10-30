import { siteConfig } from "../data/siteConfig"
import { contact } from "../data/contact"

export default function KebijakanPrivasiPage() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-16">
      <div className="mb-10 rounded-2xl bg-base-alt px-5 py-4 text-sm text-fg-soft">
        Teks pada halaman ini masih placeholder dan belum ditinjau notaris atau legal. Wajib disesuaikan
        dengan Undang-Undang Pelindungan Data Pribadi (UU PDP) dan kebijakan internal {siteConfig.brandName}{" "}
        sebelum situs digunakan secara resmi.
      </div>

      <h1 className="text-3xl text-fg mb-6">Kebijakan Privasi</h1>

      <div className="flex flex-col gap-6 text-fg-soft leading-relaxed">
        <p>
          Kebijakan ini menjelaskan bagaimana {siteConfig.brandName} memperlakukan data pribadi yang
          diberikan pengunjung di situs ini.
        </p>

        <div>
          <h2 className="text-xl text-fg mb-2">1. Data yang Dikumpulkan</h2>
          <p>
            Situs ini dapat meminta data seperti nama pemesan saat pengunjung menggunakan simulasi
            dan pembuatan SPR. Seluruh perhitungan dan pembuatan dokumen berjalan langsung di perangkat
            pengunjung (browser), dan data yang diisi tidak dikirim atau disimpan ke server{" "}
            {siteConfig.brandName}.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">2. Penggunaan Data</h2>
          <p>
            Data yang dibagikan pengunjung lewat WhatsApp atau email di halaman Kontak digunakan
            semata-mata untuk layanan informasi dan proses pemesanan unit.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">3. Hak Pemilik Data</h2>
          <p>
            Pengunjung berhak meminta informasi tentang data pribadinya yang telah dibagikan kepada{" "}
            {siteConfig.brandName}, serta meminta data itu diperbarui atau dihapus sesuai ketentuan yang
            berlaku.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">4. Kontak</h2>
          <p>
            Pertanyaan tentang kebijakan ini dapat disampaikan lewat email{" "}
            {contact.email} atau telepon {contact.telepon}.
          </p>
        </div>
      </div>
    </section>
  )
}
