import { ArrowUp } from 'lucide-react'
import { portfolio } from '../content/portfolio'

export function Footer() {
  return (
    <footer className="container footer">
      <div className="footer-identity"><a className="monogram" href="#home" aria-label="Back to home">{portfolio.initials}<span>.</span></a><p>© {new Date().getFullYear()} {portfolio.name}<span>Built with curiosity. Always evolving.</span></p></div>
      <a href="#home" className="back-to-top" onClick={() => document.getElementById('home')?.focus({ preventScroll: true })}>Back to top<span><ArrowUp size={18} aria-hidden="true" /></span></a>
    </footer>
  )
}
