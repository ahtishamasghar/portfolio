import { ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

export function ExternalLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return <a {...props} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>
}

export function SectionHeading({ number, label, title, children }: { number: string; label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow"><span>{number}</span><span className="eyebrow-line" />{label}</p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-description">{children}</p>}
    </div>
  )
}

export function StatusBadge({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return <span className={`status-badge ${muted ? 'status-muted' : ''}`}><span aria-hidden="true" />{children}</span>
}

export function LinkArrow() {
  return <ArrowUpRight size={17} aria-hidden="true" />
}
