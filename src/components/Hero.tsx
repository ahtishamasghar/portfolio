import { ArrowDown, ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react'
import { Github } from './BrandIcons'
import { portfolio } from '../content/portfolio'
import { ExternalLink } from './Primitives'
import { Reveal } from './Reveal'

function EditorialArtwork() {
  return (
    <div className="editorial-art" aria-hidden="true">
      <div className="editorial-art-top">
        <span>FIELD NOTES — 001</span>
        <span>TECH / SYSTEMS / SECURITY</span>
      </div>
      <div className="editorial-art-canvas">
        <svg className="editorial-art-lines" viewBox="0 0 540 580" fill="none" preserveAspectRatio="xMidYMid meet">
          <circle cx="277" cy="286" r="190" stroke="white" strokeOpacity=".22" strokeWidth="1" />
          <circle cx="277" cy="286" r="138" stroke="white" strokeOpacity=".22" strokeDasharray="3 10" />
          <circle cx="277" cy="286" r="82" stroke="#E9FF93" strokeOpacity=".8" strokeWidth="1" />
          <path d="M277 0v580M0 286h540" stroke="white" strokeOpacity=".22" strokeDasharray="4 10" />
          <path d="M33 103 190 157 429 99M35 445l152-36 298 55" stroke="white" strokeOpacity=".34" strokeWidth="1" />
          <path d="M190 157 277 286 429 99M187 409l90-123 208 178" stroke="#E9FF93" strokeOpacity=".9" strokeWidth="1.4" />
          <g fill="#E9FF93">
            <circle cx="33" cy="103" r="5" /><circle cx="190" cy="157" r="5" />
            <circle cx="429" cy="99" r="5" /><circle cx="187" cy="409" r="5" />
            <circle cx="485" cy="464" r="5" />
          </g>
          <g fill="white" fillOpacity=".8"><circle cx="35" cy="445" r="4"/><circle cx="277" cy="286" r="5"/></g>
          <text x="26" y="29" fill="white" fontSize="12" fontFamily="monospace">50° 11' N</text>
          <text x="411" y="555" fill="white" fontSize="12" fontFamily="monospace">FRAME 01</text>
        </svg>
        <div className="art-sparks">
          {Array.from({ length: 8 }, (_, index) => (
            <span className={`art-spark art-spark-${index + 1}`} key={index} />
          ))}
        </div>
        <div className="editorial-art-monogram">A<span>.</span></div>
        <div className="editorial-art-sticker"><span>ALWAYS</span><strong>CURIOUS</strong><span>BY DESIGN ↗</span></div>
        <div className="editorial-art-index">01 / 03</div>
      </div>
      <div className="editorial-art-bottom">
        <span>EXPLORE THE SYSTEM</span>
        <span>KEEP ASKING WHY <ArrowUpRight size={16} /></span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero-section" id="home" tabIndex={-1} aria-labelledby="hero-title">
      <div className="container hero-masthead">
        <span>PERSONAL PORTFOLIO / 2026</span>
        <span>INDEPENDENTLY CURIOUS — ALWAYS LEARNING</span>
      </div>
      <div className="container hero-layout">
        <Reveal className="hero-content">
          <p className="hero-eyebrow"><span /> HELLO, I'M</p>
          <h1 id="hero-title">
            <span className="hero-first-name">{portfolio.firstName}</span>{' '}
            <span className="gradient-text">{portfolio.displayName}</span>
          </h1>
          <p className="hero-headline">{portfolio.headline}</p>
          <p className="hero-introduction">{portfolio.hero.introduction}</p>
          <div className="hero-actions flex flex-wrap gap-3">
            <a href="#about" className="button button-primary">
              Discover my work <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <ExternalLink href={portfolio.github} className="button button-secondary">
              <Github size={18} aria-hidden="true" /> Explore GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
          </div>
          <div className="hero-socials">
            <span>FIND ME ONLINE</span><span className="social-divider" />
            <ExternalLink href={portfolio.github} aria-label="GitHub profile (opens in a new tab)">
              <Github size={18} aria-hidden="true" />
            </ExternalLink>
            <a href={`mailto:${portfolio.email}`} aria-label="Send me an email">
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
        <Reveal className="hero-art-wrapper" delay={0.12}>
          <EditorialArtwork />
        </Reveal>
      </div>
      <div className="container hero-bottom">
        <p><span className="small-cross" aria-hidden="true">✳</span> AN ONGOING EXPLORATION OF TECHNOLOGY AND SECURITY.</p>
        <a href="#about">SCROLL TO EXPLORE <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
    </section>
  )
}
