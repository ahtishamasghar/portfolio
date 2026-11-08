import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Learning } from './components/Learning'
import { MotionTicker, ScrollProgress } from './components/MotionEffects'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { useInitialAnchor } from './useInitialAnchor'

export default function App() {
  useInitialAnchor()
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          <MotionTicker />
          <About />
          <Skills />
          <Learning />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
