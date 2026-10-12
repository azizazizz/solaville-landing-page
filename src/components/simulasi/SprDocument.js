import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { formatRupiah } from "../../utils/currency"
import { company } from "../../data/company"
import { siteConfig } from "../../data/siteConfig"
// ?inline: gambar ikut tertanam sebagai data URL supaya jsPDF bisa memakainya tanpa memuat berkas lagi
import logoMark from "../../assets/logo-mark-pdf.png?inline"

const HEADER_FILL = [15, 46, 32] // --color-night (#0f2e20)
// Rasio asli monogram 185x122, ditampilkan 12 mm tinggi supaya tidak melar
const LOGO_HEIGHT_MM = 12
const LOGO_WIDTH_MM = LOGO_HEIGHT_MM * (185 / 122)

export function buildSprNumber() {
  const now = new Date()
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(
    now.getMinutes(),
  ).padStart(2, "0")}`
  return `SPR/${siteConfig.brandName.toUpperCase()}/${stamp}`
}

// Pengaturan tabel yang sama untuk ketiga bagian: kolom label selebar sama supaya sejajar,
// dan cukup rapat agar seluruh dokumen (termasuk tanda tangan) muat dalam satu halaman A4.
function sectionTable(doc, startY, title, rows) {
  autoTable(doc, {
    startY,
    theme: "grid",
    head: [[{ content: title, colSpan: 2 }]],
    body: rows,
    styles: { fontSize: 9.5, cellPadding: { vertical: 1.6, horizontal: 3 } },
    headStyles: { fillColor: HEADER_FILL },
    columnStyles: { 0: { cellWidth: 60 } },
  })
  return doc.lastAutoTable.finalY
}

// sprNumber dan tanggal bisa diberikan agar unduh ulang menghasilkan dokumen yang sama persis
export function generateSprPdf({
  buyer,
  unitIdentity,
  unit,
  harga,
  tenorBulan,
  ratePercent,
  result,
  sprNumber = buildSprNumber(),
  tanggal = new Date().toISOString(),
}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" })
  const pageHeight = doc.internal.pageSize.getHeight()
  const today = new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  doc.addImage(logoMark, "PNG", 14, 10, LOGO_WIDTH_MM, LOGO_HEIGHT_MM)

  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  doc.text("SURAT PESANAN RUMAH (SPR)", 105, 18, { align: "center" })

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`No: ${sprNumber}`, 105, 25, { align: "center" })

  doc.setFontSize(10.5)
  doc.text(`${company.namaDeveloper}`, 14, 35)
  doc.text(`Perumahan ${company.namaPerumahan}`, 14, 41)
  doc.text(`Tanggal: ${today}`, 14, 47)

  let y = sectionTable(doc, 53, "Data Diri Pemesan", [
    ["Nama Lengkap", buyer.namaLengkap || "-"],
    ["NIK KTP", buyer.nikKtp || "-"],
    ["NPWP", buyer.npwp || "-"],
    ["Alamat", buyer.alamat || "-"],
    ["No. HP / WhatsApp", buyer.noHp || "-"],
    ["Email", buyer.email || "-"],
    ["Pekerjaan", buyer.pekerjaan || "-"],
  ])

  y = sectionTable(doc, y + 5, "Data Unit", [
    ["Blok", unitIdentity.blok || "-"],
    ["No. Unit", unitIdentity.noUnit || "-"],
    ["Tipe Unit", unit ? unit.nama : "-"],
    ["Luas Tanah", unit ? `${unit.luasTanah} m2` : "-"],
    ["Luas Bangunan", unit ? `${unit.luasBangunan} m2` : "-"],
    ["Harga Jual", formatRupiah(harga)],
    ["Booking Fee", formatRupiah(unitIdentity.bookingFee || 0)],
  ])

  y = sectionTable(doc, y + 5, "Simulasi Cicilan (Estimasi)", [
    ["Tenor", `${tenorBulan} bulan`],
    ["Suku Bunga", `${ratePercent}% per tahun`],
    ["Estimasi Cicilan per Bulan", formatRupiah(result.monthlyInstallment)],
    ["Total Pembayaran", formatRupiah(result.totalPayment)],
    ["Total Bunga", formatRupiah(result.totalInterest)],
  ])

  // Catatan + tanda tangan selalu satu blok; bila tidak muat di halaman ini (alamat sangat panjang),
  // seluruh blok pindah ke halaman berikutnya agar halaman tanda tangan tidak berdiri sendiri tanpa isi.
  const blockHeight = 50
  let top = y + 8
  if (top + blockHeight > pageHeight - 12) {
    doc.addPage()
    top = 20
  }

  doc.setFontSize(9)
  doc.text(
    "Dokumen ini merupakan surat pesanan awal dan bukan merupakan bukti pelunasan. Data diri, data unit,",
    14,
    top,
  )
  doc.text(
    "dan nilai cicilan di atas bersifat estimasi, dapat berubah sesuai hasil verifikasi dan kebijakan bank.",
    14,
    top + 5,
  )

  const signY = top + 16
  doc.text("Pemesan,", 45, signY, { align: "center" })
  doc.text("Pihak Developer,", 150, signY, { align: "center" })
  doc.text("(____________________)", 45, signY + 20, { align: "center" })
  doc.text("(____________________)", 150, signY + 20, { align: "center" })
  doc.text(doc.splitTextToSize(buyer.namaLengkap || "Nama Pemesan", 70), 45, signY + 25, {
    align: "center",
  })
  doc.text(doc.splitTextToSize(company.namaDeveloper, 70), 150, signY + 25, { align: "center" })

  doc.save(`${sprNumber.replaceAll("/", "-")}.pdf`)
}
