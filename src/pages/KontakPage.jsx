import SectionHeading from "../components/common/SectionHeading"
import ContactInfo from "../components/kontak/ContactInfo"
import MapEmbed from "../components/kontak/MapEmbed"

export default function KontakPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <SectionHeading
        eyebrow="Kontak"
        title="Hubungi Tim Pemasaran Kami"
        description="Datang langsung ke kantor pemasaran atau hubungi kami melalui WhatsApp dan email."
      />

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        <ContactInfo />
        <MapEmbed />
      </div>
    </section>
  )
}
