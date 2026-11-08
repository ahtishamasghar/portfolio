import { Compass, Fingerprint, Lightbulb, Shield } from 'lucide-react'
import { portfolio } from '../content/portfolio'
import { SectionHeading } from './Primitives'
import { Reveal } from './Reveal'

const principleIcons = [Lightbulb, Compass, Shield]

export function About() {
  return (
    <section id="about" className="section container" tabIndex={-1} aria-label="About me">
      <Reveal><SectionHeading number="01" label="A LITTLE ABOUT ME" title={<>Curiosity is my<br /><span className="muted-title">starting point.</span></>} /></Reveal>
      <div className="about-grid">
        <Reveal className="panel about-story">
          <Fingerprint className="fingerprint" strokeWidth={0.6} aria-hidden="true" />
          <span className="icon-box"><Fingerprint aria-hidden="true" size={23} /></span>
          <h3>Learning the systems.<br />Understanding the possibilities.</h3>
          <p>{portfolio.about.introduction}</p><p>{portfolio.about.description}</p>
          <div className="story-signature"><span className="signature-line" />{portfolio.displayName}<span className="mono">/ A WORK IN PROGRESS</span></div>
        </Reveal>
        <div className="principles">
          {portfolio.about.principles.map((principle, index) => {
            const Icon = principleIcons[index]
            return <Reveal key={principle.title} delay={index * 0.06} className="panel principle"><span className="principle-number">0{index + 1}</span><Icon size={21} aria-hidden="true" /><h3>{principle.title}</h3><p>{principle.description}</p></Reveal>
          })}
        </div>
      </div>
    </section>
  )
}
