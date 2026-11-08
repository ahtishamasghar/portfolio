import { ArrowDown, ArrowDownRight, ArrowRight, Mail, ShieldCheck } from 'lucide-react'
import { Github } from './BrandIcons'
import { portfolio } from '../content/portfolio'
import { ExternalLink } from './Primitives'
import { Reveal } from './Reveal'

function SecurityVisual() {
  return (
    <div className="security-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-glow" />
      <svg className="orbital-art" viewBox="0 0 520 520" fill="none">
        <defs>
          <linearGradient id="orbit-gradient" x1="80" y1="50" x2="440" y2="460" gradientUnits="userSpaceOnUse"><stop stopColor="#b9a5ff" /><stop offset=".55" stopColor="#7875f5" /><stop offset="1" stopColor="#609de0" /></linearGradient>
          <linearGradient id="facet-gradient" x1="130" y1="130" x2="390" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#b5a0ff" stopOpacity=".2" /><stop offset="1" stopColor="#6998ee" stopOpacity=".025" /></linearGradient>
          <radialGradient id="center-gradient"><stop stopColor="#7e6cf3" stopOpacity=".3" /><stop offset="1" stopColor="#7e6cf3" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="260" cy="260" r="212" stroke="#66739c" strokeOpacity=".13" strokeDasharray="2 9" />
        <circle cx="260" cy="260" r="178" stroke="#7888b1" strokeOpacity=".15" />
        <circle cx="260" cy="260" r="142" fill="url(#center-gradient)" />
        <ellipse cx="260" cy="260" rx="223" ry="76" stroke="url(#orbit-gradient)" strokeOpacity=".4" transform="rotate(-35 260 260)" />
        <ellipse cx="260" cy="260" rx="223" ry="76" stroke="url(#orbit-gradient)" strokeOpacity=".2" transform="rotate(55 260 260)" />
        <path d="M260 106 389 182v153l-129 77-129-77V182Z" fill="url(#facet-gradient)" stroke="url(#orbit-gradient)" strokeOpacity=".65" />
        <path d="m131 182 129 77 129-77M260 259v153M260 106v153m-129 76 129-76 129 76" stroke="url(#orbit-gradient)" strokeOpacity=".33" />
        <path d="m260 148 92 54v111l-92 55-92-55V202Z" stroke="url(#orbit-gradient)" strokeOpacity=".17" />
        <circle cx="90" cy="376" r="5" fill="#b7a1ff" /><circle cx="430" cy="145" r="4" fill="#8aaeff" />
        <circle cx="260" cy="106" r="3" fill="#d5c7ff" /><circle cx="389" cy="335" r="3" fill="#96acfa" />
        <path d="M35 210h12m-6-6v12M433 400h12m-6-6v12" stroke="#7784aa" strokeOpacity=".65" />
      </svg>
      <div className="visual-core"><ShieldCheck strokeWidth={1.15} /></div>
      <div className="visual-label label-top"><span /> CURIOSITY IS THE STARTING POINT</div>
      <div className="visual-label label-bottom"><span className="label-index">01 / ∞</span> ALWAYS LEARNING</div>
      <div className="visual-coordinate coordinate-left">EXPLORE</div>
      <div className="visual-coordinate coordinate-right">UNDERSTAND</div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero-section" id="home" tabIndex={-1} aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="container hero-layout">
        <Reveal className="hero-content">
          <p className="hero-eyebrow"><span />{portfolio.hero.eyebrow}</p>
          <h1 id="hero-title"><span className="hero-first-name">{portfolio.firstName}</span><span className="gradient-text">{portfolio.displayName}</span></h1>
          <p className="hero-headline">{portfolio.headline}</p>
          <p className="hero-introduction">{portfolio.hero.introduction}</p>
          <div className="hero-actions flex flex-wrap gap-3">
            <a href="#about" className="button button-primary">{portfolio.hero.primaryAction}<ArrowDownRight size={18} aria-hidden="true" /></a>
            <ExternalLink href={portfolio.github} className="button button-secondary"><Github size={18} aria-hidden="true" />GitHub<ArrowRight size={15} aria-hidden="true" /></ExternalLink>
          </div>
          <div className="hero-socials">
            <span>FIND ME ONLINE</span><span className="social-divider" />
            <ExternalLink href={portfolio.github} aria-label="GitHub profile (opens in a new tab)"><Github size={18} aria-hidden="true" /></ExternalLink>
            <a href={`mailto:${portfolio.email}`} aria-label="Send me an email"><Mail size={18} aria-hidden="true" /></a>
          </div>
        </Reveal>
        <Reveal className="hero-art-wrapper" delay={0.12}><SecurityVisual /></Reveal>
      </div>
      <div className="container hero-bottom"><p><span className="small-cross" aria-hidden="true">+</span> A FOUNDATION IN PROGRESS. A MINDSET FOR LIFE.</p><a href="#about">SCROLL TO EXPLORE<ArrowDown size={14} aria-hidden="true" /></a></div>
    </section>
  )
}
