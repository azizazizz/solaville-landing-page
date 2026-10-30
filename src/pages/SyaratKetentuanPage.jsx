import { siteConfig } from "../data/siteConfig"

export default function SyaratKetentuanPage() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-16">
      <div className="mb-10 rounded-2xl bg-base-alt px-5 py-4 text-sm text-fg-soft">
        Teks pada halaman ini masih placeholder dan belum ditinjau notaris atau legal. Wajib direview dan
        disesuaikan sebelum situs digunakan secara resmi.
      </div>

      <h1 className="text-3xl text-fg mb-6">Syarat dan Ketentuan</h1>

      <div className="flex flex-col gap-6 text-fg-soft leading-relaxed">
        <p>
          Ketentuan ini mengatur penggunaan situs {siteConfig.brandName} serta proses pemesanan unit
          rumah. Dengan mengakses situs, pengunjung dianggap telah membaca dan menyetujuinya.
        </p>

        <div>
          <h2 className="text-xl text-fg mb-2">1. Informasi Unit dan Program</h2>
          <p>
            Informasi tipe rumah, luas tanah, dan luas bangunan di situs ini bersifat indikatif dan
            dapat berubah sewaktu-waktu tanpa pemberitahuan, menyesuaikan ketersediaan unit, lokasi
            kavling, dan kebijakan pengembang. Program uang muka (DP) 0% serta gratis kanopi dan biaya
            notaris, AJB, BPHTB, balik nama, SHM, dan proses KPR berlaku dengan syarat dan ketentuan
            tertentu, termasuk persetujuan pembiayaan dari bank dan kelengkapan dokumen pemohon.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">2. Simulasi Cicilan</h2>
          <p>
            Simulasi cicilan hanya estimasi dan bukan penawaran resmi dari bank atau lembaga
            pembiayaan. Nilai cicilan, suku bunga, dan tenor sebenarnya ditentukan oleh bank penyedia
            KPR setelah verifikasi dan persetujuan kredit.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">3. Surat Pesanan Rumah (SPR)</h2>
          <p>
            SPR dari situs ini merupakan dokumen pemesanan awal dan tidak menggantikan Perjanjian
            Pengikatan Jual Beli (PPJB) atau Akta Jual Beli (AJB). Pemesanan baru mengikat setelah
            ditindaklanjuti dengan dokumen dan proses resmi sesuai mekanisme {siteConfig.brandName}.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">4. Pembatasan Tanggung Jawab</h2>
          <p>
            Pengembang tidak bertanggung jawab atas kerugian akibat penggunaan informasi di situs
            ini, termasuk hasil simulasi yang dijadikan dasar keputusan finansial tanpa verifikasi
            dengan pihak bank.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-fg mb-2">5. Perubahan Ketentuan</h2>
          <p>Pengembang berhak mengubah ketentuan ini sewaktu-waktu dan akan memberitahukannya melalui situs.</p>
        </div>
      </div>
    </section>
  )
}
