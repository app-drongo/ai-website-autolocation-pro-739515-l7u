import Hero from '@/components/sections/home/Hero'
import Flotte from '@/components/sections/home/Flotte'

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="flotte">
        <Flotte />
      </section>
    </>
  )
}