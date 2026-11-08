import { ArrowDown, ArrowDownRight, ArrowRight, Mail } from 'lucide-react'
import { Github } from './BrandIcons'
import { portfolio } from '../content/portfolio'
import { ExternalLink } from './Primitives'
import { Reveal } from './Reveal'

function SignalVisual() {
  return (
    <div className="signal-scene" aria-hidden="true">
      <div className="signal-scene-top">
        <span>SYSTEM MAP / 001</span>
        <span className="signal-live"><i /> EXPLORING</span>
      </div>
      <svg className="signal-diagram" viewBox="0 0 520 445" fill="none">
        <defs>
          <pattern id="signal-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" stroke="#8cae9e" strokeOpacity=".12" />
          </pattern>
          <linearGradient id="signal-line" x1="0" y1="0" x2="520" y2="445">
            <stop stopColor="#b8f36b" />
            <stop offset="1" stopColor="#87d1b2" />
          </linearGradient>
        </defs>
        <rect width="520" height="445" fill="url(#signal-grid)" />
        <circle cx="260" cy="222" r="159" stroke="#b8f36b" strokeOpacity=".2" strokeDasharray="3 10" />
        <circle cx="260" cy="222" r="113" stroke="#b8f36b" strokeOpacity=".24" />
        <circle cx="260" cy="222" r="66" stroke="#b8f36b" strokeOpacity=".26" />
        <path d="M80 110 183 182 260 222 364 121 443 178M70 323 170 280 260 222 364 320 450 288M183 182 170 280M364 121 364 320" stroke="url(#signal-line)" strokeWidth="1.6" strokeOpacity=".85" />
        <path d="m80 110 90 170-100 43M443 178l-79 142 86-32" stroke="#d1f1e0" strokeOpacity=".2" />
        {[
          [80,110],[183,182],[364,121],[443,178],[70,323],[170,280],[364,320],[450,288]
        ].map(([x,y],index) => (
          <g key={index}>
            <circle cx={x} cy={y} r="12" fill="#15231f" stroke="#8cbd98" strokeWidth="1" />
            <circle cx={x} cy={y} r="3.5" fill={index % 3 === 0 ? '#f5b75e' : '#b8f36b'} />
          </g>
        ))}
        <circle cx="260" cy="222" r="43" fill="#b8f36b" fillOpacity=".12" stroke="#b8f36b" strokeWidth="1.5" />
        <circle cx="260" cy="222" r="29" fill="#b8f36b" />
        <path d="m249 222 8 8 16-19" stroke="#101717" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="27" y="31" fill="#9cb8a8" fontSize="11" fontFamily="monospace">A: 001.23</text>
        <text x="365" y="421" fill="#9cb8a8" fontSize="11" fontFamily="monospace">NODES / 09</text>
        <path d="M260 0V54M260 391v54M0 222h56M464 222h56" stroke="#b8f36b" strokeOpacity=".25" strokeDasharray="5 8" />
      </svg>
      <div className="signal-scene-bottom">
        <div><span>01 / EXPLORE</span><strong>Systems</strong></div>
        <div><span>02 / UNDERSTAND</span><strong>Connections</strong></div>
        <div><span>03 / PROTECT</span><strong>Foundations</strong></div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero-section" id="home" tabIndex={-1} aria-labelledby="hero-title">
      <div className="container hero-layout">
        <Reveal className="hero-content">
          <p className="hero-eyebrow"><span /> SIGNAL / 01 — A PERSONAL SPACE FOR TECHNOLOGY</p>
          <h1 id="hero-title">
            <span className="hero-first-name">{portfolio.firstName}</span>{' '}
            <span className="gradient-text">{portfolio.displayName}</span>
          </h1>
          <p className="hero-headline">{portfolio.headline}</p>
          <p className="hero-introduction">{portfolio.hero.introduction}</p>
          <div className="hero-actions flex flex-wrap gap-3">
            <a href="#about" className="button button-primary">
              Explore my journey <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <ExternalLink href={portfolio.github} className="button button-secondary">
              <Github size={18} aria-hidden="true" /> GitHub <ArrowRight size={15} aria-hidden="true" />
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
        <Reveal className="hero-art-wrapper" delay={0.12}><SignalVisual /></Reveal>
      </div>
      <div className="container hero-bottom">
        <p><span className="small-cross" aria-hidden="true">+</span> LEARNING THE SYSTEMS. CONNECTING THE IDEAS.</p>
        <a href="#about">SCROLL TO EXPLORE <ArrowDown size={14} aria-hidden="true" /></a>
      </div>
    </section>
  )
}
