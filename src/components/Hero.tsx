import { ArrowDown, ArrowUpRight, Code2, Globe2, Shield } from 'lucide-react'
import { portfolio } from '../content/portfolio'
import { Github } from './BrandIcons'
import { ExternalLink } from './Primitives'
import { Reveal } from './Reveal'
import { SecurityVisual } from './SecurityVisual'
import { MotionToggle } from './MotionToggle'

export function Hero() {
  return (
    <section className="hero-section" id="home" tabIndex={-1} aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-layout">
        <Reveal className="hero-content">
          <p className="hero-eyebrow">
            <span className="live-dot" />
            AN EXPLORATION OF TECHNOLOGY & SECURITY
          </p>
          <h1 id="hero-title">
            <span className="hero-first-name">{portfolio.firstName}</span>{' '}
            <span>{portfolio.displayName}</span>
            <span className="name-period" aria-hidden="true" />
          </h1>
          <p className="hero-headline">{portfolio.headline}</p>
          <p className="hero-introduction">{portfolio.hero.introduction}</p>
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">
              Let’s connect
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href="#about" className="button button-text">
              Explore my journey
              <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-caption">
            <span className="caption-line" />
            <span>
              Curious about systems.
              <br />
              Thoughtful about security.
            </span>
          </div>
        </Reveal>
        <div className="hero-art-wrapper">
          <div className="security-stage">
            <SecurityVisual />
            <span className="art-label art-label-top" aria-hidden="true">
              A MINDSET FOR SECURITY
            </span>
          </div>
          <div className="art-controls">
            <span>Explore. Understand. Build.</span>
            <MotionToggle />
          </div>
        </div>
      </div>
      <div className="container hero-foot">
        <div className="hero-disciplines">
          <span>
            <Shield size={17} aria-hidden="true" />
            Security
          </span>
          <span>
            <Globe2 size={17} aria-hidden="true" />
            Systems
          </span>
          <span>
            <Code2 size={18} aria-hidden="true" />
            Code
          </span>
        </div>
        <ExternalLink href={portfolio.github} className="hero-github">
          <Github size={16} aria-hidden="true" />
          Find me on GitHub
          <ArrowUpRight size={15} aria-hidden="true" />
        </ExternalLink>
      </div>
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              LEARN <i>✳</i> EXPLORE <i>✳</i> BUILD <i>✳</i> STAY CURIOUS <i>✳</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
