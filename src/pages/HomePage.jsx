import Hero from "../components/home/Hero"
import PromoBand from "../components/home/PromoBand"
import Highlights from "../components/home/Highlights"
import FeaturedUnits from "../components/home/FeaturedUnits"
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
      <section className="max-w-3xl mx-auto px-5 py-16">
        <Reveal>
          <FaqSection />
        </Reveal>
      </section>
      <HomeCTA />
    </>
  )
}
