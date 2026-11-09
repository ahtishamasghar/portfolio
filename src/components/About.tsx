import { ArrowUpRight, Compass, Lightbulb, Shield } from 'lucide-react'
import { portfolio } from '../content/portfolio'
import { SectionHeading } from './Primitives'
import { Reveal } from './Reveal'

const principleIcons = [Lightbulb, Compass, Shield]
export function About() {
  return (
    <section id="about" className="section container" tabIndex={-1} aria-label="About me">
      <Reveal>
        <SectionHeading
          number="01"
          label="ABOUT ME"
          title={
            <>
              A curious mind.
              <br />
              <span className="muted-title">A considered approach.</span>
            </>
          }
        />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-intro">
          <p>{portfolio.about.introduction}</p>
          <a href="#learning" className="text-link">
            My learning journey
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal delay={0.08} className="about-context">
          <p>{portfolio.about.description}</p>
          <div className="about-detail">
            <span className="detail-marker" />
            <div>
              <span className="mono">CURRENTLY PURSUING</span>
              <strong>{portfolio.education.degree}</strong>
              <span>{portfolio.education.institution}</span>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="principles">
        {portfolio.about.principles.map((principle, index) => {
          const Icon = principleIcons[index]
          return (
            <Reveal key={principle.title} delay={index * 0.07} className="principle">
              <span className="principle-number">0{index + 1}</span>
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
