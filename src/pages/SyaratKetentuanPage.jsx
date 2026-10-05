import { siteConfig } from "../data/siteConfig"

export default function SyaratKetentuanPage() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-16">
      <div className="mb-10 rounded-2xl bg-base-alt px-5 py-4 text-sm text-fg-soft">
        Teks pada halaman ini masih berupa placeholder dan belum ditinjau oleh notaris/legal.
        Wajib direview dan disesuaikan sebelum situs ini digunakan secara resmi.
      </div>

      <h1 className="text-3xl text-fg mb-6">Syarat dan Ketentuan</h1>

      <div className="flex flex-col gap-6 text-fg-soft leading-relaxed">
        <p>
          Syarat dan Ketentuan ini mengatur penggunaan situs {siteConfig.brandName} serta
          proses pemesanan unit rumah melalui situs ini. Dengan mengakses dan menggunakan
          situs, pengunjung dianggap telah membaca dan menyetujui ketentuan di bawah ini.
        </p>

        <div>
          <h2 className="text-xl text-fg mb-2">1. Informasi Unit dan Harga</h2>
          <p>
            Informasi tipe rumah, harga, luas tanah, dan luas bangunan yang ditampilkan di
            situs ini bersifat indikatif dan dapat berubah sewaktu-waktu tanpa pemberitahuan
            terlebih dahulu, menyesuaikan dengan ketersediaan unit, lokasi kavling, dan
            kebijakan pengembang.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">2. Simulasi Cicilan</h2>
          <p>
            Fitur simulasi cicilan pada halaman Simulasi hanya bersifat estimasi dan bukan
            merupakan penawaran resmi dari bank maupun lembaga pembiayaan. Nilai cicilan,
            suku bunga, dan tenor sebenarnya ditentukan oleh bank penyedia KPR setelah proses
            verifikasi dan persetujuan kredit.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">3. Surat Pesanan Rumah (SPR)</h2>
          <p>
            Dokumen SPR yang dihasilkan melalui situs ini merupakan dokumen pemesanan awal
            dan tidak menggantikan Perjanjian Pengikatan Jual Beli (PPJB) atau Akta Jual Beli
            (AJB). Pemesanan baru dianggap mengikat setelah ditindaklanjuti dengan proses dan
            dokumen resmi sesuai mekanisme yang berlaku di {siteConfig.brandName}.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">4. Pembatasan Tanggung Jawab</h2>
          <p>
            Pengembang tidak bertanggung jawab atas kerugian yang timbul akibat kesalahan
            penggunaan informasi pada situs ini, termasuk namun tidak terbatas pada hasil
            simulasi yang digunakan sebagai dasar keputusan finansial tanpa verifikasi lebih
            lanjut dengan pihak bank.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">5. Perubahan Ketentuan</h2>
          <p>
            Pengembang berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan
            diberitahukan melalui situs ini.
          </p>
        </div>
      </div>
    </section>
  )
}
