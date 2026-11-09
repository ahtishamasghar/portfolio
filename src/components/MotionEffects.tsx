import { m, useScroll, useSpring } from 'motion/react'
import { useMotionPreferences } from '../motion/preferences'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  })
  const { enabled } = useMotionPreferences()

  return (
    <m.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX: enabled ? smoothProgress : scrollYProgress }}
    />
  )
}
