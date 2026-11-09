import { ArrowUpRight, BookOpen, GraduationCap, Network } from 'lucide-react'
import { portfolio, type Certification } from '../content/portfolio'
import { ExternalLink, SectionHeading, StatusBadge } from './Primitives'
import { Reveal } from './Reveal'

function Certificate({ certification, index }: { certification: Certification; index: number }) {
  const Icon = index === 0 ? BookOpen : Network
  return (
    <article className="panel certificate">
      <div className="certificate-top">
        <span className="icon-box">
          <Icon size={21} aria-hidden="true" />
        </span>
        <span className="mono">{certification.provider}</span>
      </div>
      <h4>{certification.name}</h4>
      <StatusBadge muted={certification.status === 'Completion status to be confirmed'}>
        {certification.status}
      </StatusBadge>
      <p>{certification.description}</p>
      {certification.verificationUrl && (
        <ExternalLink className="text-link" href={certification.verificationUrl}>
          View credential
          <ArrowUpRight size={16} aria-hidden="true" />
        </ExternalLink>
      )}
    </article>
  )
}

export function Learning() {
  return (
    <section
      id="learning"
      className="section container"
      tabIndex={-1}
      aria-label="Education and learning"
    >
      <Reveal>
        <SectionHeading
          number="03"
          label="EDUCATION & LEARNING"
          title={
            <>
              Building a solid
              <br />
              <span className="muted-title">foundation.</span>
            </>
          }
        >
          Building knowledge through formal education and continued exploration.
        </SectionHeading>
      </Reveal>
      <div className="learning-grid">
        <Reveal className="education-column">
          <h3 className="column-label">
            EDUCATION<span>01</span>
          </h3>
          <article className="panel education-card">
            <div className="education-art" aria-hidden="true">
              <div className="education-orbit" />
              <GraduationCap strokeWidth={0.9} />
            </div>
            <StatusBadge>{portfolio.education.status}</StatusBadge>
            <h4>{portfolio.education.degree}</h4>
            <p className="institution">{portfolio.education.institution}</p>
            <div className="education-divider" />
            <p className="education-description">{portfolio.education.description}</p>
            <span className="mono education-footnote">THE FOUNDATION OF MY JOURNEY</span>
          </article>
        </Reveal>
        <Reveal delay={0.08} className="certifications-column">
          <h3 className="column-label">
            CERTIFICATIONS & LEARNING<span>02</span>
          </h3>
          <div className="certificates">
            {portfolio.certifications.map((certification, index) => (
              <Certificate certification={certification} index={index} key={certification.name} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
