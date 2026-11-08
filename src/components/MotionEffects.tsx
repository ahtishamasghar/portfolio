import { m, useReducedMotion, useScroll, useSpring } from 'motion/react'

const themes = [
  'CYBERSECURITY',
  'TECHNOLOGY',
  'LINUX',
  'NETWORKS',
  'PYTHON',
  'BUILDING',
  'STAY CURIOUS',
]

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  })
  const reducedMotion = useReducedMotion()

  return (
    <m.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX: reducedMotion ? scrollYProgress : smoothProgress }}
    />
  )
}

export function MotionTicker() {
  return (
    <div className="motion-ticker" aria-hidden="true">
      <div className="motion-ticker-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="motion-ticker-set">
            {themes.map((theme) => (
              <span key={theme} className="motion-ticker-item">
                <span className="motion-ticker-spark">✳</span>
                {theme}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
