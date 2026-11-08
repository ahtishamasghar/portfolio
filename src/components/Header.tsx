import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation, portfolio } from '../content/portfolio'

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    )
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const media = window.matchMedia('(min-width: 768px)')
    const onResize = () => {
      if (media.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    media.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
      media.removeEventListener('change', onResize)
    }
  }, [open])

  const closeAt = (href: string) => {
    setOpen(false)
    document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true })
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label={`${portfolio.name}, home`}
          onClick={() => closeAt('#home')}
        >
          <span className="monogram">
            {portfolio.initials}
            <span>.</span>
          </span>
          <span className="wordmark-label">
            {portfolio.shortName.toUpperCase()}
            <span>PERSONAL PORTFOLIO</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          Let’s connect <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-nav container"
        hidden={!open}
      >
        {[...navigation, { label: 'Contact', href: '#contact' }].map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={active === item.href ? 'location' : undefined}
            onClick={() => closeAt(item.href)}
          >
            {item.label}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  )
}
