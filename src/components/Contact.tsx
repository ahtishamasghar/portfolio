import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { portfolio } from '../content/portfolio'
import { ExternalLink } from './Primitives'
import { Reveal } from './Reveal'

function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fallbackRef = useRef<HTMLInputElement>(null)
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )
  useEffect(() => {
    if (state === 'failed') {
      fallbackRef.current?.focus()
      fallbackRef.current?.select()
    }
  }, [state])
  const copy = async () => {
    if (timer.current) clearTimeout(timer.current)
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(portfolio.email)
      setState('copied')
      timer.current = setTimeout(() => setState('idle'), 4000)
    } catch {
      setState('failed')
    }
  }
  return (
    <div className="copy-email">
      <button type="button" className="copy-button" onClick={copy}>
        {state === 'copied' ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {state === 'copied' ? 'Copied!' : 'Copy email'}
      </button>
      <span role="status" className="sr-only">
        {state === 'copied'
          ? 'Email address copied to clipboard.'
          : state === 'failed'
            ? 'Clipboard unavailable. Select and copy the email address below.'
            : ''}
      </span>
      {state === 'failed' && (
        <div className="copy-fallback">
          <label htmlFor="email-to-copy">Select and copy this address:</label>
          <input
            ref={fallbackRef}
            id="email-to-copy"
            value={portfolio.email}
            readOnly
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      )}
    </div>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      className="section container contact-section"
      tabIndex={-1}
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <div className="contact-panel">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-content">
            <p className="eyebrow">
              <span>05</span>
              <span className="eyebrow-line" />
              LET’S CONNECT
            </p>
            <h2 id="contact-heading">
              Great conversations.
              <br />
              <span className="gradient-text">New possibilities.</span>
            </h2>
            <p>{portfolio.contact.introduction}</p>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${portfolio.email}`}>
                <Mail size={18} aria-hidden="true" />
                Say hello
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <CopyEmail />
            </div>
            <a className="email-address" href={`mailto:${portfolio.email}`}>
              {portfolio.email}
            </a>
          </div>
          <div className="contact-socials">
            <ExternalLink href={portfolio.github} className="social-card">
              <Github size={25} strokeWidth={1.5} aria-hidden="true" />
              <span>
                <strong>GitHub</strong>
                <span>@{portfolio.githubHandle}</span>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </ExternalLink>
            {portfolio.linkedin ? (
              <ExternalLink href={portfolio.linkedin} className="social-card">
                <Linkedin size={25} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <strong>LinkedIn</strong>
                  <span>Connect with me</span>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </ExternalLink>
            ) : (
              <div className="social-card social-placeholder">
                <Linkedin size={25} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <strong>LinkedIn</strong>
                  <span>{portfolio.contact.linkedinPlaceholder}</span>
                </span>
                <span className="placeholder-label">SOON</span>
              </div>
            )}
            <p className="social-footnote">
              <span aria-hidden="true" />A little curiosity can go a long way.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
