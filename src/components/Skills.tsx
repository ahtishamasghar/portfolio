import { Braces, Code2, Database, GitBranch, Network, Plus, ShieldCheck, Terminal } from 'lucide-react'
import { portfolio } from '../content/portfolio'
import { SectionHeading } from './Primitives'
import { Reveal } from './Reveal'

const icons = { terminal: Terminal, code: Code2, network: Network, braces: Braces, shield: ShieldCheck, database: Database, git: GitBranch }

export function Skills() {
  return (
    <section id="skills" className="section container" tabIndex={-1} aria-label="Technical skills">
      <Reveal><SectionHeading number="02" label="MY GROWING TOOLKIT" title={<>Foundations for<br /><span className="muted-title">what comes next.</span></>}>Technologies and areas I’m learning and working with. Select a card to explore my focus.</SectionHeading></Reveal>
      <Reveal><div className="skills-grid">
        {portfolio.skills.map((skill) => {
          const Icon = icons[skill.icon]
          return (
            <details key={skill.name} className={`skill-card ${skill.icon === 'shield' ? 'skill-featured' : ''}`}>
              <summary>
                <span className="skill-top"><span className="skill-icon"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></span><Plus size={17} className="skill-plus" aria-hidden="true" /></span>
                <span className="skill-category">{skill.category}</span>
                <h3>{skill.name}</h3>
              </summary>
              <p className="skill-description">{skill.description}</p>
            </details>
          )
        })}
      </div></Reveal>
      <p className="section-note"><span aria-hidden="true" />Always learning. No finish line.</p>
    </section>
  )
}
