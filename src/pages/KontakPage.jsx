import SectionHeading from "../components/common/SectionHeading"
import ContactInfo from "../components/kontak/ContactInfo"
import MapEmbed from "../components/kontak/MapEmbed"

export default function KontakPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeading
        level={1}
        eyebrow="Hubungi Kami"
        title="Lokasi dan Kontak Solaville"
        description="Datang ke lokasi, atau hubungi kami lewat WhatsApp dan email."
      />

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        <ContactInfo />
        <MapEmbed />
      </div>
    </section>
  )
}
