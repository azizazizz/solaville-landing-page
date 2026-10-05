import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { formatRupiah } from "../../utils/currency"
import { company } from "../../data/company"
import { siteConfig } from "../../data/siteConfig"

const HEADER_FILL = [5, 42, 64] // --color-night (#052a40)

function buildSprNumber() {
  const now = new Date()
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(
    now.getMinutes(),
  ).padStart(2, "0")}`
  return `SPR/${siteConfig.brandName.toUpperCase()}/${stamp}`
}

export function generateSprPdf({ buyer, unitIdentity, unit, harga, tenorBulan, ratePercent, result }) {
  const doc = new jsPDF({ unit: "mm", format: "a4" })
  const pageHeight = doc.internal.pageSize.getHeight()
  const sprNumber = buildSprNumber()
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  doc.text("SURAT PESANAN RUMAH (SPR)", 105, 20, { align: "center" })

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`No: ${sprNumber}`, 105, 27, { align: "center" })

  doc.setFontSize(11)
  doc.text(`${company.namaDeveloper}`, 14, 40)
  doc.text(`Perumahan ${company.namaPerumahan}`, 14, 46)
  doc.text(`Tanggal: ${today}`, 14, 52)

  autoTable(doc, {
    startY: 60,
    theme: "grid",
    head: [["Data Diri Pemesan", ""]],
    body: [
      ["Nama Lengkap", buyer.namaLengkap || "-"],
      ["NIK KTP", buyer.nikKtp || "-"],
      ["NPWP", buyer.npwp || "-"],
      ["Alamat", buyer.alamat || "-"],
      ["No. HP / WhatsApp", buyer.noHp || "-"],
      ["Email", buyer.email || "-"],
      ["Pekerjaan", buyer.pekerjaan || "-"],
    ],
    styles: { fontSize: 10 },
    headStyles: { fillColor: HEADER_FILL },
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 6,
    theme: "grid",
    head: [["Data Unit", ""]],
    body: [
      ["Blok", unitIdentity.blok || "-"],
      ["No. Unit", unitIdentity.noUnit || "-"],
      ["Tipe Unit", unit ? unit.nama : "Tidak dipilih"],
      ["Luas Tanah", unit ? `${unit.luasTanah} m2` : "-"],
      ["Luas Bangunan", unit ? `${unit.luasBangunan} m2` : "-"],
      ["Harga Jual", formatRupiah(harga)],
      ["Booking Fee", formatRupiah(unitIdentity.bookingFee || 0)],
    ],
    styles: { fontSize: 10 },
    headStyles: { fillColor: HEADER_FILL },
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 6,
    theme: "grid",
    head: [["Simulasi Cicilan (Estimasi)", ""]],
    body: [
      ["Tenor", `${tenorBulan} bulan`],
      ["Suku Bunga", `${ratePercent}% per tahun`],
      ["Estimasi Cicilan per Bulan", formatRupiah(result.monthlyInstallment)],
      ["Total Pembayaran", formatRupiah(result.totalPayment)],
      ["Total Bunga", formatRupiah(result.totalInterest)],
    ],
    styles: { fontSize: 10 },
    headStyles: { fillColor: HEADER_FILL },
  })

  let noteY = doc.lastAutoTable.finalY + 10
  if (noteY + 45 > pageHeight - 15) {
    doc.addPage()
    noteY = 20
  }

  doc.setFontSize(9)
  doc.text(
    "Dokumen ini merupakan surat pesanan awal dan bukan merupakan bukti pelunasan. Data diri, data unit,",
    14,
    noteY,
  )
  doc.text(
    "dan nilai cicilan di atas bersifat estimasi, dapat berubah sesuai hasil verifikasi dan kebijakan bank.",
    14,
    noteY + 5,
  )

  const signY = noteY + 25
  doc.text("Pemesan,", 30, signY, { align: "center" })
  doc.text("Pihak Developer,", 150, signY, { align: "center" })
  doc.text("(____________________)", 30, signY + 25, { align: "center" })
  doc.text("(____________________)", 150, signY + 25, { align: "center" })
  doc.text(buyer.namaLengkap || "Nama Pemesan", 30, signY + 30, { align: "center" })
  doc.text(company.namaDeveloper, 150, signY + 30, { align: "center" })

  doc.save(`${sprNumber.replaceAll("/", "-")}.pdf`)
}
