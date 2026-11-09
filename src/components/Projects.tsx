import { ArrowUpRight, FolderCode, Layers3 } from 'lucide-react'
import { Github } from './BrandIcons'
import { portfolio, type Project } from '../content/portfolio'
import { ExternalLink, SectionHeading, StatusBadge } from './Primitives'
import { Reveal } from './Reveal'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="panel project-card">
      <div className="flex items-center justify-between gap-3">
        <FolderCode style={{ color: 'var(--cyan-core)' }} size={24} aria-hidden="true" />
        <StatusBadge>{project.status}</StatusBadge>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="technology-tags" aria-label="Project technologies">
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-5">
        {project.repositoryUrl && (
          <ExternalLink className="text-link" href={project.repositoryUrl}>
            <Github size={16} aria-hidden="true" />
            Source code
          </ExternalLink>
        )}
        {project.demoUrl && (
          <ExternalLink className="text-link" href={project.demoUrl}>
            Live project
            <ArrowUpRight size={16} aria-hidden="true" />
          </ExternalLink>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section container" tabIndex={-1} aria-label="Projects">
      <Reveal>
        <SectionHeading
          number="04"
          label="IDEAS INTO PRACTICE"
          title={
            <>
              Projects
              <br />
              <span className="muted-title">in progress.</span>
            </>
          }
        >
          {portfolio.projectsIntro}
        </SectionHeading>
      </Reveal>
      {portfolio.projects.length ? (
        <div className="projects-grid">
          {portfolio.projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="panel projects-empty">
            <div className="project-empty-art" aria-hidden="true">
              <span />
              <span />
              <span />
              <Layers3 strokeWidth={1.2} />
            </div>
            <div className="project-empty-copy">
              <StatusBadge>In the making</StatusBadge>
              <h3>
                From learning
                <br />
                to building.
              </h3>
              <p>
                I’m exploring, experimenting, and putting what I learn into practice. This space
                will grow with real projects and the stories behind them.
              </p>
              <ExternalLink href={portfolio.github} className="text-link">
                Follow my journey on GitHub
                <ArrowUpRight size={17} aria-hidden="true" />
              </ExternalLink>
            </div>
            <span className="empty-corner mono" aria-hidden="true">
              ROOM TO GROW ↗
            </span>
          </div>
        </Reveal>
      )}
    </section>
  )
}
