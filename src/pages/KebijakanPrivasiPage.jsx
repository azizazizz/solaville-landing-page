import { siteConfig } from "../data/siteConfig"
import { contact } from "../data/contact"

export default function KebijakanPrivasiPage() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-16">
      <div className="mb-10 rounded-2xl bg-base-alt px-5 py-4 text-sm text-fg-soft">
        Teks pada halaman ini masih berupa placeholder dan belum ditinjau oleh notaris/legal.
        Wajib disesuaikan dengan Undang-Undang Pelindungan Data Pribadi (UU PDP) dan kebijakan
        internal {siteConfig.brandName} sebelum situs ini digunakan secara resmi.
      </div>

      <h1 className="text-3xl text-fg mb-6">Kebijakan Privasi</h1>

      <div className="flex flex-col gap-6 text-fg-soft leading-relaxed">
        <p>
          Kebijakan Privasi ini menjelaskan bagaimana {siteConfig.brandName} memperlakukan
          data pribadi yang diberikan pengunjung saat menggunakan situs ini, termasuk pada
          fitur simulasi cicilan dan pembuatan Surat Pesanan Rumah (SPR).
        </p>

        <div>
          <h2 className="text-xl text-fg mb-2">1. Data yang Dikumpulkan</h2>
          <p>
            Situs ini dapat meminta data seperti nama pemesan saat pengunjung menggunakan
            fitur simulasi dan generator SPR. Seluruh proses perhitungan dan pembuatan dokumen
            pada fitur tersebut dilakukan langsung di perangkat pengunjung (browser), dan data
            yang diisi tidak dikirim atau disimpan ke server {siteConfig.brandName}.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">2. Penggunaan Data</h2>
          <p>
            Apabila pengunjung menghubungi kami melalui WhatsApp atau email yang tercantum di
            halaman Kontak, data yang dibagikan melalui komunikasi tersebut akan digunakan
            semata-mata untuk keperluan layanan informasi dan proses pemesanan unit.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">3. Hak Pemilik Data</h2>
          <p>
            Pengunjung berhak meminta informasi mengenai data pribadi yang telah dibagikan
            kepada {siteConfig.brandName} melalui komunikasi langsung, serta meminta
            data tersebut diperbarui atau dihapus sesuai dengan ketentuan yang berlaku.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">4. Kontak</h2>
          <p>
            Pertanyaan terkait kebijakan privasi ini dapat disampaikan melalui email{" "}
            {contact.email} atau telepon {contact.telepon}.
          </p>
        </div>
      </div>
    </section>
  )
}
