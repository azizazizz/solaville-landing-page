export const contact = {
  namaKantorPemasaran: "Kantor Pemasaran Solaville",
  alamat:
    "Sola Ville, Kp. Sampora, Jayasampurna, Kec. Serang Baru, Kabupaten Bekasi, Jawa Barat 17330",
  telepon: "021-8965432",
  email: "pemasaran@solaville-perumahan.id",
  jamOperasional: [
    { hari: "Senin - Jumat", jam: "08.00 - 17.00 WIB" },
    { hari: "Sabtu - Minggu", jam: "09.00 - 16.00 WIB" },
  ],
  // Koordinat titik Sola Ville di Google Maps; dipakai untuk tautan arah dan data terstruktur
  lat: -6.3874609,
  lng: 107.0823283,
  // Tautan resmi lokasi Sola Ville di Google Maps (tombol petunjuk arah dan data terstruktur)
  mapsUrl: "https://maps.app.goo.gl/DdEH26fcxArFzm6A7",
  // Telepon dan email di atas masih data contoh. Ubah menjadi true setelah diganti data asli:
  // hanya yang bernilai true yang boleh masuk ke JSON-LD dan llms.txt (mesin pencari menyimpannya sebagai fakta).
  diverifikasi: { telepon: false, email: false },
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.2534522077694!2d107.0823283!3d-6.3874609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6997a5ad4487f3%3A0x19eea359777fe49a!2sSola%20Ville!5e1!3m2!1sid!2sid!4v1792658565657!5m2!1sid!2sid",
}
