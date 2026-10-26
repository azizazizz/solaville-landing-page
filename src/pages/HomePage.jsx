import Hero from "../components/home/Hero"
import PromoBand from "../components/home/PromoBand"
import Highlights from "../components/home/Highlights"
import FeaturedUnits from "../components/home/FeaturedUnits"
import FaktaSingkat from "../components/home/FaktaSingkat"
import FaqSection from "../components/home/FaqSection"
import HomeCTA from "../components/home/HomeCTA"
import Reveal from "../components/common/Reveal"

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoBand />
      <Highlights />
      <FeaturedUnits />
      <section className="max-w-6xl mx-auto px-5 py-16 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
        <Reveal>
          <FaktaSingkat />
        </Reveal>
        <Reveal>
          <FaqSection />
        </Reveal>
      </section>
      <HomeCTA />
    </>
  )
}
